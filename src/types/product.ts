/** App product — DummyJSON fields we need; category mapped to assessment values. */
export interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  rating: number
  stock: number
  image: string
}

export type ProductCategory = 'All' | 'Electronics' | 'Clothing' | 'Books' | 'Home'

export type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc'
