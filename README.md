# Food Product Explorer

## 1. Project overview

Food Product Explorer is a responsive single-page catalog for browsing grocery products. Visitors can search by title, filter by category, sort results, and open a detailed product page. API products come from DummyJSON, with a small local catalog supplement for requested grocery items that the API does not provide. There is no backend.

## 2. Technologies used

- React 19 with functional components and hooks
- TypeScript in strict mode
- Vite for development and production builds
- React Router v6 for client-side routes
- Fetch API for HTTP requests
- Tailwind CSS 3 with custom responsive CSS
- Lucide React icons

## 3. Installation instructions

Install Node.js 20.19+ or 22.12+, then install dependencies:

```sh
npm install
```

## 4. How to run the application

```sh
npm install
npm run dev
```

Run `npm run build` to type-check and create the production bundle. Run `npm run preview` to serve the bundle locally.

## 5. API details

The app requests data from `https://dummyjson.com`:

- `GET /products?limit=100` loads the catalog.
- `GET /products/{id}` loads a product for the details route.

The collection response is typed as `{ products: Product[]; total: number; skip: number; limit: number }`. The app keeps products from DummyJSON's `groceries` category and adds local grocery entries for requested items missing from the API. Both sources use the same product card, search, and detail views; non-grocery API products are excluded, including on direct detail URLs. Displayed prices use Indian rupees (INR). API errors are shown with a retry action.

The local catalog in `src/services/featuredGroceries.ts` adds: Bread Loaf, Maaza Mango Drink, Apple Juice, Pizza Bread, Tomato Ketchup, Maggi Masala Noodles, Yuppie Fruit Drink, Cup Noodles, Lay's Potato Chips, Tea Biscuits, Chicken Masala, Pizza Sauce, Fresh Carrots, Fresh Tomatoes, and Fresh Spinach. Eggs and other available grocery products continue to come from DummyJSON.

## 6. Project structure

```text
src/
  components/  Reusable navigation, cards, filters, ratings, and request states
  hooks/       Typed product loading hooks
  pages/       Products, details, About, and 404 pages
  routes/      React Router route definitions
  services/    DummyJSON fetch functions and local featured groceries
  types/       API and product interfaces
  utils/       Price, rating, and category formatting
  App.tsx      Theme state, navigation, and app shell
  index.css    Tailwind directives and responsive visual system
  main.tsx     React entry point
```

Vite, Tailwind, TypeScript, PostCSS, and package configuration are at the repository root.

## 7. Design decisions

- **Search:** Product titles are filtered in the browser after the catalog request. This keeps typing responsive, avoids repeated network requests, and supports combined title/category filtering. Search and category values sync to `?search=` and `?category=` so state survives refresh and can be shared. Search updates are debounced by 300 ms, and a suggestion popup shows matching grocery items as the user types.
- **Catalog additions:** The requested staples absent from DummyJSON are supplied as local demo products in `src/services/featuredGroceries.ts`. They share the API products' cards, search, and detail routes; their prices, stock counts, and descriptions are illustrative, not live retail offers.
- **Currency:** Prices use `Intl.NumberFormat` with the `en-IN` locale and `INR` currency, so product cards, suggestions, and detail pages display rupees.
- **State management:** Focused hooks and local React state are sufficient for this single-catalog experience; a global state library would add overhead without shared mutation needs.
- **UI:** A fruit photograph with a warm color overlay gives the page its colorful produce-inspired background. Solid product surfaces preserve contrast. The cream, orange, and sage palette is paired with a responsive card grid, skeleton placeholders, accessible controls, reduced-motion support, a mobile navigation menu, and a persisted light/dark theme. Sorting and incremental loading keep the catalog manageable.
- **Routing:** Vite's development server falls back to `index.html` for deep routes. Production hosting must also rewrite unknown paths to `index.html` (for example, a `/*` rewrite on Netlify or equivalent SPA fallback), otherwise refreshing `/products/{id}` may return a host-level 404.

## 8. Known limitations

- DummyJSON provides sample catalog content; availability, prices, and descriptions are not live merchant inventory.
- The catalog is loaded as one request (up to 100 products), then filtered and progressively displayed in the browser.
- Locally added products use illustrative prices, stock counts, descriptions, and external imagery; they are not verified brand listings or live inventory.
- DummyJSON images, local-entry images, the fruit background photo, and Google Fonts require network access.
- This is a browsing experience only; it has no cart, checkout, or account features.

## 9. Bonus features implemented

- 300 ms debounced URL-synced title search and category filter
- Live search suggestions with product thumbnails and INR prices
- INR price formatting throughout the catalog
- Fruit-inspired background and local grocery additions
- Skeleton loading cards and retryable error states
- Sorting by featured order, price, and rating
- Incremental “Load more” product display
- Dark mode persisted in `localStorage`
- Accessible labels, focus rings, image descriptions, and reduced-motion handling
- Custom 404 and friendly product-not-found state
- Responsive image gallery and discount ribbon on product details