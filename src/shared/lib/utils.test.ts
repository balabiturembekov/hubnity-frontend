import { AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  capitalize,
  cn,
  formatDate,
  formatDurationFull,
  formatHours,
  greeting,
  handleError,
} from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("merges class names with objects", () => {
    expect(cn("text-red-500", { "text-blue-500": true })).toBe("text-blue-500");
  });

  it("merges class names with conditions", () => {
    expect(cn("text-red-500", true && "text-blue-500")).toBe("text-blue-500");
  });

  it("handles false/null/undefined gracefully", () => {
    expect(cn("px-4", false && "hidden", null, undefined)).toBe("px-4");
  });

  it("returns empty string with no arguments", () => {
    expect(cn()).toBe("");
  });
});

describe("handleError", () => {
  it("returns response.data.message from AxiosError", () => {
    const error = new AxiosError("Request failed");
    error.response = {
      data: { message: "Email already taken" },
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    expect(handleError(error)).toBe("Email already taken");
  });

  it("returns error.message when AxiosError has no response", () => {
    const error = new AxiosError("Network Error");

    expect(handleError(error)).toBe("Network Error");
  });

  it("returns message from a generic Error", () => {
    const error = new Error("Something went wrong");

    expect(handleError(error)).toBe("Something went wrong");
  });

  it("returns fallbackMessage for unknown error types", () => {
    expect(handleError("Random string", "Fallback message")).toBe(
      "Fallback message",
    );
  });

  it('returns "undefined" string when no fallback is provided', () => {
    expect(handleError(42)).toBe("undefined");
  });
});

describe("formatDurationFull", () => {
  it("3661 seconds should be 1:01:01", () => {
    expect(formatDurationFull(3661)).toBe("1:01:01");
  });

  it("7200 seconds should be 2:00:00", () => {
    expect(formatDurationFull(7200)).toBe("2:00:00");
  });

  it("0 seconds should be 0:00:00", () => {
    expect(formatDurationFull(0)).toBe("0:00:00");
  });

  it("fractional seconds should be rounded to nearest second", () => {
    expect(formatDurationFull(10.5)).toBe("0:00:11");
  });

  it("NaN seconds should be 0:00:00", () => {
    expect(formatDurationFull(NaN)).toBe("0:00:00");
  });

  it("negative seconds should be 0:00:00", () => {
    expect(formatDurationFull(-10)).toBe("0:00:00");
  });

  it("infinity seconds should be 0:00:00", () => {
    expect(formatDurationFull(Infinity)).toBe("0:00:00");
  });

  it("59 seconds should be 0:00:59", () => {
    expect(formatDurationFull(59)).toBe("0:00:59");
  });
});

describe("greeting", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns Good morning for hours 00:00", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 0, 0, 0));

    expect(greeting()).toBe("Good morning");
  });

  it("returns Good morning for hours 11:59:59", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 11, 59, 59));

    expect(greeting()).toBe("Good morning");
  });

  it("returns Good afternoon for hours 12:00:00", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 12, 0, 0));

    expect(greeting()).toBe("Good afternoon");
  });

  it("returns Good afternoon for hours 17:59:59", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 17, 59, 59));

    expect(greeting()).toBe("Good afternoon");
  });

  it("returns Good evening for hours 18:00:00", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 18, 0, 0));

    expect(greeting()).toBe("Good evening");
  });

  it("returns Good evening for hours 23:59:59", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 23, 59, 59));

    expect(greeting()).toBe("Good evening");
  });
});

describe("capitalize", () => {
  it("hELLO should be Hello", () => {
    expect(capitalize("hELLO")).toBe("Hello");
  });

  it("WORLD should be World", () => {
    expect(capitalize("WORLD")).toBe("World");
  });

  it('single character "a" should be "A"', () => {
    expect(capitalize("a")).toBe("A");
  });

  it('already capitalized "Hello" should be "Hello"', () => {
    expect(capitalize("Hello")).toBe("Hello");
  });
});

describe("formatHours", () => {
  it("3600 seconds should be 1.00", () => {
    expect(formatHours(3600)).toBe("1.00");
  });

  it("0 seconds should be 0.00", () => {
    expect(formatHours(0)).toBe("0.00");
  });

  it("3421 seconds should be 0.95", () => {
    expect(formatHours(3421)).toBe("0.95");
  });

  it("infinity seconds should be 0.00", () => {
    expect(formatHours(Infinity)).toBe("0.00");
  });

  it("undefined seconds should be 0.00", () => {
    expect(formatHours(undefined)).toBe("0.00");
  });

  it("NaN seconds should be 0.00", () => {
    expect(formatHours(NaN)).toBe("0.00");
  });

  it("negative seconds should be negative hours", () => {
    expect(formatHours(-3600)).toBe("-1.00");
  });
});

describe("formatDate", () => {
  it("formats Date object correctly", () => {
    const date = new Date(2026, 0, 1, 9, 59, 0);

    expect(formatDate(date)).toBe("Thu, Jan 1, 2026 09:59AM");
  });

  it("formats ISO string correctly", () => {
    expect(formatDate("2026-06-15T14:30:00")).toBe("Mon, Jun 15, 2026 02:30PM");
  });

  it("formats timestamp (ms) correctly", () => {
    const ts = new Date(2026, 5, 15, 14, 30).getTime();

    expect(formatDate(ts)).toBe("Mon, Jun 15, 2026 02:30PM");
  });

  it("monday should be Invalid date", () => {
    expect(formatDate("monday")).toBe("Invalid date");
  });
});
