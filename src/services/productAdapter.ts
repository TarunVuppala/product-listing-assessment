import type { Product } from '../types/product'

/** Raw item from https://dummyjson.com/products */
export interface DummyJsonProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  thumbnail: string
  images?: string[]
}

export interface DummyJsonProductsResponse {
  products: DummyJsonProduct[]
  total: number
  skip: number
  limit: number
}

/**
 * Map DummyJSON categories → assessment dropdown values:
 * Electronics / Clothing / Books / Home
 * (DummyJSON has no Books — that filter will be empty.)
 */
export function mapCategory(rawCategory: string): string {
  switch (rawCategory) {
    case 'smartphones':
    case 'laptops':
    case 'tablets':
    case 'mobile-accessories':
    case 'vehicle':
    case 'motorcycle':
      return 'Electronics'
    case 'mens-shirts':
    case 'mens-shoes':
    case 'mens-watches':
    case 'tops':
    case 'womens-dresses':
    case 'womens-shoes':
    case 'womens-bags':
    case 'womens-watches':
    case 'sunglasses':
    case 'sports-accessories':
      return 'Clothing'
    case 'furniture':
    case 'home-decoration':
    case 'kitchen-accessories':
    case 'groceries':
    case 'beauty':
    case 'fragrances':
    case 'skin-care':
    case 'womens-jewellery':
      return 'Home'
    default:
      return 'Home'
  }
}

/**
 * Keep DummyJSON values for price/rating/stock/etc.
 * Only category is mapped to assessment categories; thumbnail → image.
 */
export function toProduct(raw: DummyJsonProduct): Product {
  return {
    id: raw.id,
    title: raw.title,
    price: raw.price,
    category: mapCategory(raw.category),
    description: raw.description,
    rating: raw.rating,
    stock: raw.stock,
    image: raw.thumbnail,
  }
}

export function toProducts(rawItems: DummyJsonProduct[]): Product[] {
  return rawItems.map(toProduct)
}
