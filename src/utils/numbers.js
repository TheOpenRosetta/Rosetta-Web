export function priceFormat (price) {
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price)
}
