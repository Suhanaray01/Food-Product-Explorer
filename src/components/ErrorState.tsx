import { RotateCw } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section className="state-panel" role="alert">
      <span className="state-emoji" aria-hidden="true">⚠️</span>
      <h2 className="font-display state-title">The pantry door is stuck</h2>
      <p className="state-copy">{message}</p>
      <button className="primary-button" onClick={onRetry} type="button"><RotateCw size={16} /> Try again</button>
    </section>
  )
}

export default ErrorState