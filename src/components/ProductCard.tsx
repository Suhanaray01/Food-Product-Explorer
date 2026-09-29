import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { formatCategory, formatPrice } from '../utils/format'
import RatingStars from './RatingStars'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} aria-label={`View ${product.title} details`} className="block focus-visible:outline-offset-[-4px]">
        <div className="product-image-wrap">
          <img className="product-image" src={product.thumbnail} alt={product.title} loading="lazy" />
          <span className="category-pill">{formatCategory(product.category)}</span>
        </div>
      </Link>
      <div className="product-card-body">
        <h2 className="product-title">{product.title}</h2>
        <div className="card-meta">
          <span className="price">{formatPrice(product.price)}</span>
          <RatingStars rating={product.rating} />
        </div>
        <Link className="primary-button card-button" to={`/products/${product.id}`}>
          View Details <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default ProductCard