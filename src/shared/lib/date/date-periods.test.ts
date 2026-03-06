import { getPeriods } from "./date-periods";

describe("getPeriods", () => {
  it("should return correct periods", () => {
    const periods = getPeriods(new Date("2022-01-01"));

    expect(periods).toEqual({
      thisWeek: { start: "2021-12-27", end: "2022-01-02" },
      thisMonth: { start: "2022-01-01", end: "2022-01-31" },
      prev1Week: { start: "2021-12-20", end: "2021-12-26" },
      prev2Week: { start: "2021-12-13", end: "2021-12-19" },
      prev3Week: { start: "2021-12-06", end: "2021-12-12" },
    });
  });

  it("should handle start of week correctly when date is Sunday (week starts on Monday)", () => {
    const periods = getPeriods(new Date("2022-01-02T12:00:00Z"));

    expect(periods.thisWeek).toEqual({
      start: "2021-12-27",
      end: "2022-01-02",
    });
  });

  it("should handle leap years correctly (Feb 2024)", () => {
    const periods = getPeriods(new Date("2024-02-15"));

    expect(periods.thisMonth).toEqual({
      start: "2024-02-01",
      end: "2024-02-29",
    });
  });

  it("should ignore the time of day and use the local date", () => {
    const periods1 = getPeriods(new Date("2023-10-15T00:00:01"));
    const periods2 = getPeriods(new Date("2023-10-15T23:59:59"));

    expect(periods1).toEqual(periods2);
  });

  it("should handle year boundaries correctly (Dec 31 -> Jan 1)", () => {
    const periods = getPeriods(new Date("2023-12-31"));

    expect(periods.thisWeek).toEqual({
      start: "2023-12-25",
      end: "2023-12-31",
    });
    expect(periods.thisMonth).toEqual({
      start: "2023-12-01",
      end: "2023-12-31",
    });
    expect(periods.prev1Week).toEqual({
      start: "2023-12-18",
      end: "2023-12-24",
    });
  });
});
