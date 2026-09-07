import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative min-w-0 flex-1">
      <label htmlFor="product-search" className="sr-only">
        Search
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <input
        id="product-search"
        type="search"
        placeholder="Search for products…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded border border-slate-300 bg-white py-2 pr-3 pl-9 text-sm outline-none ring-[#2874f0] focus:ring-2"
      />
    </div>
  )
}
