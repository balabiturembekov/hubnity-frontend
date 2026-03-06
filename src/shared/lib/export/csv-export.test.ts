import { downloadCSV, escapeCSV, exportToCSV, generateCSV } from "./csv-export";

describe("escapeCSV", () => {
  it("returns empty string for null/undefined", () => {
    expect(escapeCSV(null)).toBe("");
    expect(escapeCSV(undefined)).toBe("");
  });

  it("return string representation for numbers", () => {
    expect(escapeCSV(123)).toBe("123");
    expect(escapeCSV(0)).toBe("0");
  });

  it("returns regular string without quotes", () => {
    expect(escapeCSV("hello world")).toBe("hello world");
  });

  it("wraps string in quotes if it contains a comma", () => {
    expect(escapeCSV("hello, world")).toBe('"hello, world"');
  });

  it("escapes internal quotes by doubling them and wraps in quotes", () => {
    expect(escapeCSV('hello "world"')).toBe('"hello ""world"""');
  });

  it("wraps string in quotes if it contains newlines", () => {
    expect(escapeCSV("hello\nworld")).toBe('"hello\nworld"');
  });
});

describe("generateCSV", () => {
  it("generates correct CSV string from headers and rows", () => {
    const headers = ["Name", "Age", "City"];
    const rows = [
      ["Alice", "25", "New York"],
      ["Bob, Jr.", "30", "London"],
    ];
    const expected =
      "Name,Age,City\n" + "Alice,25,New York\n" + '"Bob, Jr.",30,London';

    expect(generateCSV(headers, rows)).toBe(expected);
  });
});

describe("DOM functions (downloadCSV & exportToCSV)", () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => "mock-url");
    URL.revokeObjectURL = vi.fn();

    vi.spyOn(document, "createElement");
    vi.spyOn(document.body, "appendChild");
    vi.spyOn(document.body, "removeChild");
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;

    vi.restoreAllMocks();
  });

  describe("downloadCSV", () => {
    it("creates temporary link and triggers download", () => {
      downloadCSV("content", "test.csv");

      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(document.createElement).toHaveBeenCalledWith("a");
      expect(document.body.appendChild).toHaveBeenCalled();
      expect(document.body.removeChild).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith("mock-url");
    });
  });

  describe("exportToCSV", () => {
    it("handles empty data gracefully", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      exportToCSV([], "test.csv");

      expect(consoleSpy).toHaveBeenCalledWith("No data to export");
      expect(URL.createObjectURL).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("exports array of objects to CSV file", () => {
      const data = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob\nSmith" },
      ];

      exportToCSV(data, "users.csv");
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(document.body.appendChild).toHaveBeenCalled();
    });
  });
});
