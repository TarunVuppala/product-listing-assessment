export function LoadingState({ message = 'Loading products…' }: { message?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6" role="status" aria-live="polite">
      <p>{message}</p>
    </div>
  )
}
