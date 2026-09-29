import { ExternalLink, Heart, Layers3 } from 'lucide-react'

function AboutPage() {
  return (
    <main className="content-width about-page page-enter">
      <section className="about-intro"><span className="eyebrow"><Heart size={14} /> A small project with a big appetite</span><h1 className="font-display about-title">Good food<br />starts with curiosity.</h1><p className="about-copy">Food Product Explorer is a simple way to browse a colorful catalog of products, discover new favorites, and learn a little more about what's on the shelf. No checkout, just inspiration.</p></section>
      <section className="about-grid" aria-label="About the project">
        <article className="about-item"><span className="about-item-icon"><Layers3 size={20} /></span><h2>Built for exploring</h2><p>Search by product name, filter by category, and sort the collection to find exactly the right kind of delicious.</p></article>
        <article className="about-item"><span className="about-item-icon"><Heart size={20} /></span><h2>Made with care</h2><p>A responsive React and TypeScript experience with accessible controls, useful details, and a warm, inviting look.</p></article>
        <article className="about-item"><span className="about-item-icon"><ExternalLink size={20} /></span><h2>Powered by DummyJSON</h2><p>Product information is fetched live from the public DummyJSON API. <a href="https://dummyjson.com" target="_blank" rel="noreferrer">Visit DummyJSON <ExternalLink size={12} className="inline" /></a></p></article>
      </section>
    </main>
  )
}

export default AboutPage