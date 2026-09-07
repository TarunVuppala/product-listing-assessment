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
    <div className="flex min-w-[160px] flex-col gap-1">
      <label htmlFor="sort-control" className="sr-only">
        Sort
      </label>
      <select
        id="sort-control"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="h-10 rounded border border-slate-300 bg-white px-3 text-sm outline-none ring-[#2874f0] focus:ring-2"
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
