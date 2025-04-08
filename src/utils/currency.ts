export function formatCurrency(value: number) {
  return new Intl.NumberFormat("mn-MN").format(value) + " ₮";
}

export function formatPercent(value: number) {
  return new Intl.NumberFormat("mn-MN").format(value) + " %";
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("mn-MN").format(value) + " ш";
}
