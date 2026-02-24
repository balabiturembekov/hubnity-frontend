import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subWeeks,
} from "date-fns";

export const getPeriods = (baseDate = new Date()) => {
  const formatStr = "yyyy-MM-dd";
  const startW = (date: Date) =>
    format(startOfWeek(date, { weekStartsOn: 1 }), formatStr);
  const endW = (date: Date) =>
    format(endOfWeek(date, { weekStartsOn: 1 }), formatStr);

  return {
    thisWeek: {
      start: startW(baseDate),
      end: endW(baseDate),
    },

    thisMonth: {
      start: format(startOfMonth(baseDate), formatStr),
      end: format(endOfMonth(baseDate), formatStr),
    },

    prev1Week: {
      start: startW(subWeeks(baseDate, 1)),
      end: endW(subWeeks(baseDate, 1)),
    },

    prev2Week: {
      start: startW(subWeeks(baseDate, 2)),
      end: endW(subWeeks(baseDate, 2)),
    },

    prev3Week: {
      start: startW(subWeeks(baseDate, 3)),
      end: endW(subWeeks(baseDate, 3)),
    },
  };
};
