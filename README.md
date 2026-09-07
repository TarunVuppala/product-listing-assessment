# E‑Commerce Store Assessment

A small product‑listing and shopping‑cart application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.  The code follows the **Google Front‑End Intern Assessment** specification.

## Features
- Product list with **search (case‑insensitive)**, **category filter**, and **sorting** (price, rating, name).
- Combined search + filter + sort works together.
- Product detail page (`/product/:id`).
- Shopping cart with add, increment, decrement, remove, **stock constraints**, and **derived totals** (item count & subtotal).
- **LocalStorage persistence** – cart survives a page refresh, safely handling missing or malformed data.
- **Caching** – product data is cached for 5 minutes to avoid redundant API calls (`CACHE_TTL_MS`).
- **Performance** – `React.memo` on `ProductCard` and `useMemo` for filtered list.
- **Unit tests** (`vitest`) covering the filter/sort logic.
- Loading, error, empty‑state UI components.

## Setup
```bash
npm install          # install dependencies
npm run dev          # start Vite dev server (http://localhost:5173)
```

## Testing
```bash
# unit tests
npm run test
```

---

*App runs at `http://localhost:5173`.*
