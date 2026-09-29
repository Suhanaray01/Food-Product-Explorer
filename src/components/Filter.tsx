interface FilterProps {
  categories: string[]
  value: string
  onChange: (value: string) => void
}

function Filter({ categories, value, onChange }: FilterProps) {
  return (
    <label>
      <span className="sr-only">Filter by category</span>
      <select className="select-control capitalize" value={value} onChange={(event) => onChange(event.target.value)} aria-label="Filter by category">
        <option value="">All categories</option>
        {categories.map((category) => <option className="capitalize" key={category} value={category}>{category.replaceAll('-', ' ')}</option>)}
      </select>
    </label>
  )
}

export default Filter