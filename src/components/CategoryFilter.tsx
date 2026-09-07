import type { ProductCategory } from '../types/product'

const CATEGORIES: ProductCategory[] = [
  'All',
  'Electronics',
  'Clothing',
  'Books',
  'Home',
]

interface CategoryFilterProps {
  value: ProductCategory
  onChange: (value: ProductCategory) => void
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="flex min-w-[140px] flex-col gap-1">
      <label htmlFor="category-filter" className="sr-only">
        Category
      </label>
      <select
        id="category-filter"
        value={value}
        onChange={(e) => onChange(e.target.value as ProductCategory)}
        className="h-10 rounded border border-slate-300 bg-white px-3 text-sm outline-none ring-[#2874f0] focus:ring-2"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}
