import { Link } from 'react-router-dom'

function NotFoundPage() {
  return <main className="content-width page-enter"><section className="state-panel"><span className="state-emoji" aria-hidden="true">🥣</span><h1 className="font-display state-title">This page isn't on the menu</h1><p className="state-copy">We couldn't find that page. Head back to the product shelf and keep exploring.</p><Link className="primary-button" to="/products">Browse products</Link></section></main>
}

export default NotFoundPage