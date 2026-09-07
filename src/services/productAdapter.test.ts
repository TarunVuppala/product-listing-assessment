import { describe, expect, it } from 'vitest'
import { mapCategory, toProduct } from './productAdapter'

describe('mapCategory', () => {
  it('maps DummyJSON categories to assessment categories', () => {
    expect(mapCategory('smartphones')).toBe('Electronics')
    expect(mapCategory('laptops')).toBe('Electronics')
    expect(mapCategory('mens-shirts')).toBe('Clothing')
    expect(mapCategory('womens-dresses')).toBe('Clothing')
    expect(mapCategory('furniture')).toBe('Home')
    expect(mapCategory('beauty')).toBe('Home')
  })
})

describe('toProduct', () => {
  it('maps category and keeps other DummyJSON fields', () => {
    const product = toProduct({
      id: 1,
      title: 'Essence Mascara Lash Princess',
      description: 'Volumizing mascara',
      category: 'beauty',
      price: 9.99,
      rating: 2.56,
      stock: 99,
      thumbnail: 'https://cdn.dummyjson.com/thumb.webp',
    })

    expect(product).toEqual({
      id: 1,
      title: 'Essence Mascara Lash Princess',
      price: 9.99,
      category: 'Home',
      description: 'Volumizing mascara',
      rating: 2.56,
      stock: 99,
      image: 'https://cdn.dummyjson.com/thumb.webp',
    })
  })
})
