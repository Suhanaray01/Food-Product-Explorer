import { Link } from 'react-router-dom'

interface EmptyStateProps {
  onReset: () => void
}

function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <section className="state-panel">
      <span className="state-emoji" aria-hidden="true">🥕</span>
      <h2 className="font-display state-title">No products found</h2>
      <p className="state-copy">Nothing on the shelf matches that search. Try another name or clear your filters.</p>
      <button className="primary-button" type="button" onClick={onReset}>Show all products</button>
      <Link className="mt-4 text-sm font-semibold text-brand-sage underline underline-offset-4" to="/about">About this collection</Link>
    </section>
  )
}

export default EmptyState