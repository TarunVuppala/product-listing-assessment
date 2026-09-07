interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="product-search" className="text-sm font-medium text-slate-700">
        Search
      </label>
      <input
        id="product-search"
        type="search"
        placeholder="Search by title…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-slate-300 bg-white px-3 py-2"
      />
    </div>
  )
}
