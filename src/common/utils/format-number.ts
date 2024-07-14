export function formatNumber(number: number | undefined): string {
  if (number == null) {
    return '';
  }

  return number.toLocaleString('en-US').replace(/,/g, '\u00A0');
}
