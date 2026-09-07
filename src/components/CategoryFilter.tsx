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
    <div className="flex flex-col gap-1">
      <label htmlFor="category-filter" className="text-sm font-medium text-slate-700">
        Category
      </label>
      <select
        id="category-filter"
        value={value}
        onChange={(e) => onChange(e.target.value as ProductCategory)}
        className="rounded border border-slate-300 bg-white px-3 py-2"
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
