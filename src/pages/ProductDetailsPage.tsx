import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import RatingStars from '../components/RatingStars'
import { useProduct } from '../hooks/useProduct'
import { GROCERY_CATEGORY } from '../types/product'
import { formatCategory, formatPrice } from '../utils/format'

function ProductDetailsPage() {
  const { id: rawId } = useParams<{ id: string }>()
  const parsedId = rawId ? Number(rawId) : Number.NaN
  const id = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null
  const { product, loading, error, notFound } = useProduct(id)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (loading) return <main className="content-width detail-page page-enter"><LoadingState /></main>
  if (error) return <main className="content-width detail-page page-enter"><ErrorState message={error} onRetry={() => window.location.reload()} /></main>
  if (notFound || !product || product.category !== GROCERY_CATEGORY) return <main className="content-width page-enter"><section className="state-panel"><span className="state-emoji" aria-hidden="true">🍽️</span><h1 className="font-display state-title">Product not found</h1><p className="state-copy">That item isn't in our grocery collection. Let's find something else.</p><Link className="primary-button" to="/products"><ArrowLeft size={16} /> Back to Products</Link></section></main>

  const images = product.images.length ? product.images : [product.thumbnail]
  const activeImage = selectedImage && images.includes(selectedImage) ? selectedImage : images[0]
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <main className="content-width detail-page page-enter">
      <Link className="back-link" to="/products"><ArrowLeft size={17} /> Back to Products</Link>
      <div className="detail-layout">
        <section aria-label={`${product.title} images`}>
          <div className="detail-main-image"><img src={activeImage} alt={product.title} />{product.discountPercentage > 0 && <span className="discount-ribbon">Save {product.discountPercentage.toFixed(0)}%</span>}</div>
          {images.length > 1 && <div className="gallery-row" aria-label="Product image gallery">{images.map((image, index) => <button className={`gallery-thumb${activeImage === image ? ' selected' : ''}`} type="button" key={`${image}-${index}`} onClick={() => setSelectedImage(image)} aria-label={`Show product image ${index + 1}`} aria-pressed={activeImage === image}><img src={image} alt={`${product.title}, view ${index + 1}`} /></button>)}</div>}
        </section>
        <section className="detail-info"><span className="detail-category">{formatCategory(product.category)}</span><h1 className="font-display detail-title">{product.title}</h1><RatingStars className="detail-rating" rating={product.rating} /><div className="detail-price-row"><span className="detail-price">{formatPrice(discountedPrice)}</span>{product.discountPercentage > 0 && <span className="old-price">{formatPrice(product.price)}</span>}</div><p className="detail-description">{product.description}</p>
          <div className="detail-facts"><div className="fact"><span className="fact-label">Brand</span><span className="fact-value">{product.brand || 'Independent maker'}</span></div><div className="fact"><span className="fact-label">Availability</span><span className="fact-value">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span></div><div className="fact"><span className="fact-label">Category</span><span className="fact-value">{formatCategory(product.category)}</span></div><div className="fact"><span className="fact-label">Discount</span><span className="fact-value">{product.discountPercentage.toFixed(1)}%</span></div></div>
        </section>
      </div>
    </main>
  )
}

export default ProductDetailsPage