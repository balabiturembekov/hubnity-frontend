import axios from "axios";
import Cookies from "js-cookie";
import { api } from "./api";
import { apiUrl } from "./env";

vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

vi.mock("axios", async (importOriginal) => {
  const actual = await importOriginal<typeof import("axios")>();
  return {
    ...actual,
    default: {
      ...actual.default,
      post: vi.fn(),
      create: actual.default.create,
    },
  };
});

describe("API Interceptors", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    api.defaults.adapter = async (config) => {
      if (config.url === "/test-success") {
        return {
          data: "ok",
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        };
      }

      if (config.url === "/test-401") {
        const error = Object.assign(
          new Error("Request failed with status code 401"),
          {
            config,
            response: { status: 401, data: "Unauthorized" },
            isAxiosError: true,
          },
        );
        throw error;
      }

      return {
        data: null,
        status: 404,
        statusText: "Not Found",
        headers: {},
        config,
      };
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Request Interceptor", () => {
    it("should add Authorization header if token exists in cookies", async () => {
      vi.mocked(
        Cookies.get as (name: string) => string | undefined,
      ).mockImplementation((key) => {
        if (key === "access_token") return "mock-access-token";

        return undefined;
      });

      const response = await api.get("/test-success");

      expect(response.config.headers?.Authorization).toBe(
        "Bearer mock-access-token",
      );
      expect(Cookies.get).toHaveBeenCalledWith("access_token");
    });

    it("should NOT add header if token does not exist", async () => {
      vi.mocked(
        Cookies.get as (name: string) => string | undefined,
      ).mockReturnValue(undefined);

      const response = await api.get("/test-success");

      expect(response.config.headers?.Authorization).toBeUndefined();
    });
  });

  describe("Response Interceptor (Refresh Token Logic)", () => {
    it("should reject non-401 errors without attempting to refresh", async () => {
      api.defaults.adapter = async (config) => {
        const error = Object.assign(new Error("Server Error"), {
          config,
          response: { status: 500 },
        });
        throw error;
      };

      await expect(api.get("/some-url")).rejects.toThrow("Server Error");

      expect(axios.post).not.toHaveBeenCalled();
    });

    it("should successfully refresh the token on 401 and retry the original request", async () => {
      vi.mocked(
        Cookies.get as (name: string) => string | undefined,
      ).mockImplementation((key) => {
        if (key === "refresh_token") return "mock-refresh-token";

        return undefined;
      });

      vi.mocked(axios.post).mockResolvedValueOnce({
        data: {
          access_token: "new-access-token",
          refresh_token: "new-refresh-token",
        },
      });

      api.defaults.adapter = async (config) => {
        if (config.headers?.Authorization === "Bearer new-access-token") {
          return {
            data: "retry-success",
            status: 200,
            statusText: "OK",
            headers: {},
            config,
          };
        }

        const error = Object.assign(new Error("401"), {
          config,
          response: { status: 401 },
        });
        throw error;
      };

      const response = await api.get("/test-401");

      expect(response.data).toBe("retry-success");
      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrl}/api/auth/refresh`,
        { refreshToken: "mock-refresh-token" },
        { withCredentials: true },
      );
      expect(Cookies.set).toHaveBeenCalledWith(
        "access_token",
        "new-access-token",
        expect.any(Object),
      );
      expect(Cookies.set).toHaveBeenCalledWith(
        "refresh_token",
        "new-refresh-token",
        expect.any(Object),
      );
    });

    it("should log out the user if token refresh fails", async () => {
      vi.mocked(
        Cookies.get as (name: string) => string | undefined,
      ).mockReturnValue("invalid-refresh-token");

      vi.mocked(axios.post).mockRejectedValueOnce(new Error("Refresh failed"));

      await expect(api.get("/test-401")).rejects.toThrow("Refresh failed");

      expect(Cookies.remove).toHaveBeenCalledWith("access_token");
      expect(Cookies.remove).toHaveBeenCalledWith("refresh_token");
    });

    it("should handle concurrent 401 errors and make only one refresh request", async () => {
      vi.mocked(
        Cookies.get as (name: string) => string | undefined,
      ).mockImplementation((key) => {
        if (key === "refresh_token") return "mock-refresh-token";
        return undefined;
      });

      vi.mocked(axios.post).mockImplementationOnce(async () => {
        return new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              data: {
                access_token: "new-access-token",
                refresh_token: "new-refresh-token",
              },
            });
          }, 50),
        );
      });

      api.defaults.adapter = async (config) => {
        if (config.headers?.Authorization === "Bearer new-access-token") {
          return {
            data: "retry-success",
            status: 200,
            statusText: "OK",
            headers: {},
            config,
          };
        }

        const error = Object.assign(new Error("401"), {
          config,
          response: { status: 401 },
        });
        throw error;
      };

      const [res1, res2, res3] = await Promise.all([
        api.get("/test-401-1"),
        api.get("/test-401-2"),
        api.get("/test-401-3"),
      ]);

      expect(res1.data).toBe("retry-success");
      expect(res2.data).toBe("retry-success");
      expect(res3.data).toBe("retry-success");
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });
});
