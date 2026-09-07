import type { Product, ProductCategory, SortOption } from '../../types/product'

export function filterAndSortProducts(
  products: Product[],
  search: string,
  category: ProductCategory,
  sort: SortOption,
): Product[] {
  const q = search.trim().toLowerCase()

  let list = products.filter((p) => {
    const matchesSearch = !q || p.title.toLowerCase().includes(q)
    const matchesCategory = category === 'All' || p.category === category
    return matchesSearch && matchesCategory
  })

  if (sort === 'price-asc') {
    list = [...list].sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    list = [...list].sort((a, b) => b.price - a.price)
  } else if (sort === 'rating-desc') {
    list = [...list].sort((a, b) => b.rating - a.rating)
  } else if (sort === 'name-asc') {
    list = [...list].sort((a, b) => a.title.localeCompare(b.title))
  }

  return list
}
