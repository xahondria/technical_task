export function formatNumber(number: number): string {
  return number.toLocaleString("en-US").replace(/,/g, "\u00A0");
}
