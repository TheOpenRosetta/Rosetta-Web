export function priceFormat (price) {
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price)
}

export function percentFormat (price) {
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)
}



