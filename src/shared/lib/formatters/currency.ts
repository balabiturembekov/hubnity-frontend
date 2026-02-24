/**
 * Formats a number into a currency string
 * @param amount - Number to format
 * @returns Formatted currency string
 * @example
 * formatCurrency(1000) // => "$1,000.00"
 * formatCurrency(12345.67) // => "$12,345.67"
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
