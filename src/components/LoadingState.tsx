function LoadingState() {
  return (
    <div className="product-grid" aria-label="Loading products" aria-busy="true">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="skeleton-card animate-pulse" key={index} aria-hidden="true">
          <div className="skeleton-image" />
          <div className="skeleton-copy"><div className="skeleton-line" /><div className="skeleton-line short" /><div className="skeleton-button" /></div>
        </div>
      ))}
    </div>
  )
}

export default LoadingState