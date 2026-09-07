import type { SortOption } from '../types/product'

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default / Unsorted' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

interface SortControlProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortControl({ value, onChange }: SortControlProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="sort-control" className="text-sm font-medium text-slate-700">
        Sort
      </label>
      <select
        id="sort-control"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded border border-slate-300 bg-white px-3 py-2"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
