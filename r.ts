MotionMart/
├─ package.json
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
├─ public/                # স্ট্যাটিক অ্যাসেট (images, favicon, etc.)
│  ├─ logo.svg
│  └─ banner.jpg
├─ src/
│  ├─ assets/             # 🎨 Custom SVGs, icons, fonts
│  │  ├─ icons/
│  │  └─ fonts/
│  ├─ styles/             # 🎯 Global styles, Tailwind config extensions
│  │  ├─ index.css
│  │  └─ tailwind.css
│  ├─ main.tsx            # 🔥 Entry point
│  ├─ App.tsx             # 🧩 Root component
│  ├─ routes/             # 🗺️ Route definitions (React Router)
│  │  └─ AppRoutes.tsx
│  ├─ context/            # 🧠 Global state (Cart, Auth, Theme)
│  │  └─ CartContext.tsx
│  ├─ hooks/              # 🪝 Custom hooks (useCart, useProductFetch)
│  │  └─ useCart.ts
│  ├─ components/         # 🧱 Reusable UI components
│  │  ├─ layout/
│  │  │  ├─ Nav.tsx
│  │  │  └─ CartDrawer.tsx
│  │  ├─ ui/
│  │  │  ├─ Button.tsx
│  │  │  └─ Loader.tsx
│  │  └─ product/
│  │     └─ ProductCard.tsx
│  ├─ pages/              # 📄 Route-based views
│  │  ├─ Home.tsx
│  │  ├─ Products.tsx
│  │  ├─ ProductDetail.tsx
│  │  └─ CartPage.tsx
│  ├─ data/               # 📦 Static data or mock APIs
│  │  └─ products.ts
│  └─ utils/              # 🛠️ Helper functions (formatPrice, slugify)
│     └─ formatPrice.ts
