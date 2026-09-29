export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function formatCategory(category: string): string {
  return category.replaceAll('-', ' ')
}