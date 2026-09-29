import { Star } from 'lucide-react'
import { formatRating } from '../utils/format'

interface RatingStarsProps {
  rating: number
  className?: string
}

function RatingStars({ rating, className = '' }: RatingStarsProps) {
  const roundedRating = Math.round(rating)
  return (
    <span className={`rating ${className}`} aria-label={`Rated ${formatRating(rating)} out of 5 stars`}>
      <span aria-hidden="true" className="inline-flex gap-0.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} size={13} className={index < roundedRating ? 'rating-star' : 'text-stone-300'} />
        ))}
      </span>
      <span>{formatRating(rating)}</span>
    </span>
  )
}

export default RatingStars