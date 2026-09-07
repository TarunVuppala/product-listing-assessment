export function EmptyState({ message = 'No products found' }: { message?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6" role="status">
      <p>{message}</p>
    </div>
  )
}
