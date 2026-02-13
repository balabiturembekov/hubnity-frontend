export const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

// biome-ignore lint/suspicious/noExplicitAny: <We don't know what value will be passed>
export const escapeCSV = (value: any): string => {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

export const generateCSV = (headers: string[], rows: string[][]): string => {
  const headerRow = headers.map(escapeCSV).join(",");
  const dataRows = rows.map((row) => row.map(escapeCSV).join(",")).join("\n");
  return `${headerRow}\n${dataRows}`;
};

export const exportToCSV = (
  // biome-ignore lint/suspicious/noExplicitAny: <We don't know what value will be passed>
  data: Record<string, any>[],
  filename: string = "export.csv",
): void => {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <We don't know what value will be passed>
  const escapeCSV = (value: any): string => {
    if (value === null || value === undefined) {
      return "";
    }
    const stringValue = String(value);
    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const headers = Object.keys(data[0]);

  const rows = data.map((row) => {
    try {
      return headers.map((header) => escapeCSV(row[header]));
    } catch (error) {
      console.error("Error formatting CSV row:", error);
      return headers.map(() => "Error");
    }
  });

  const csvContent = [
    headers.map((h) => escapeCSV(h)).join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  try {
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    if (link.parentNode) {
      document.body.removeChild(link);
    }
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
};
