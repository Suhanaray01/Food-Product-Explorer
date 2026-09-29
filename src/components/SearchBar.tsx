import { useState } from 'react'
import { Search, X } from 'lucide-react'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/format'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  suggestions: Product[]
}

function SearchBar({ value, onChange, suggestions }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const showSuggestions = isOpen && value.trim().length > 0

  return (
    <div className="search-wrap" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false)
    }}>
      <Search className="search-icon" size={18} aria-hidden="true" />
      <input
        className="search-input"
        type="search"
        value={value}
        onChange={(event) => { onChange(event.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => { if (event.key === 'Escape') setIsOpen(false) }}
        placeholder="Search pantry favorites..."
        aria-label="Search grocery products by title"
        aria-expanded={showSuggestions}
        aria-controls="grocery-search-suggestions"
      />
      {value && <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700" onClick={() => { onChange(''); setIsOpen(false) }} aria-label="Clear search"><X size={17} /></button>}
      {showSuggestions && (
        <div className="search-suggestions" id="grocery-search-suggestions" role="listbox" aria-label="Matching grocery products">
          {suggestions.length > 0 ? suggestions.map((product) => (
            <button
              className="search-suggestion"
              key={product.id}
              type="button"
              role="option"
              aria-selected="false"
              onClick={() => { onChange(product.title); setIsOpen(false) }}
            >
              <img src={product.thumbnail} alt="" />
              <span className="suggestion-title">{product.title}</span>
              <span className="suggestion-price">{formatPrice(product.price)}</span>
            </button>
          )) : <p className="suggestion-empty">No matching groceries yet</p>}
        </div>
      )}
    </div>
  )
}

export default SearchBar