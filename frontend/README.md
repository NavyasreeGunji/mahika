# Shopping App Frontend

## 🚀 Quick Start

### ❌ No Server Required
Just double-click `src/index.html` - works directly in browser!

```
frontend/src/index.html (double-click to open)
```

## 📁 Modular Structure

```
frontend/src/
├── index.html                          # Main SPA (all views in one file)
├── pages/                              # Standalone category pages
│   ├── sarees.html
│   ├── dresses.html
│   ├── jewelry.html
│   ├── bags.html
│   └── rental.html
├── components/                         # 4 reusable components
│   ├── announcement.html               # Promo banner
│   ├── header.html                     # Logo + cart/wishlist icons
│   ├── nav.html                        # Navigation menu
│   └── filter.html                     # Search + sort
├── js/
│   ├── services/                       # 7 modular services
│   │   ├── products.js                 # Display, filter, sort
│   │   ├── cart.js                     # Cart management
│   │   ├── wishlist.js                 # Wishlist management
│   │   ├── product-detail.js           # Detail view
│   │   ├── payment.js                  # Payment processing
│   │   ├── profile.js                  # User profile
│   │   └── admin.js                    # Admin panel
│   ├── data/
│   │   └── products.js                 # 22 sample products
│   ├── component-loader-inline.js      # ✅ Active (no server)
│   └── component-loader.js             # Alternative (needs server)
├── css/                                # 7 stylesheets
│   ├── common.css
│   ├── products.css
│   ├── cart.css
│   ├── wishlist.css
│   ├── admin.css
│   ├── payment.css
│   └── product-detail.css
└── images/                             # All product images
```

## 🧩 Components (4 Reusable)

**Current Setup:** `component-loader-inline.js` (no server needed)

All pages load 4 components:
1. **announcement.html** - Promo banner
2. **header.html** - Logo + icons
3. **nav.html** - Navigation
4. **filter.html** - Search + sort

## 📦 Service Modules

### products.js
- `displayProducts()` - Renders product grid
- `showProducts(category)` - Filters by category
- `searchProducts()` - Search functionality
- `sortProducts()` - Sort by price/name
- `changeImage(productId, imageSrc)` - Image hover effect

### cart.js
- `addToCart(productId)` - Add item to cart
- `showCart()` - Display cart view
- `updateCartCount()` - Update cart badge
- `increaseQuantity(productId)` - Increase item quantity
- `decreaseQuantity(productId)` - Decrease item quantity
- `removeFromCart(productId)` - Remove item

### wishlist.js
- `toggleWishlist(productId)` - Add/remove from wishlist
- `showWishlist()` - Display wishlist view
- `updateWishlistCount()` - Update wishlist badge
- `displayWishlist()` - Render wishlist items

### product-detail.js
- `showProductDetail(productId)` - Show detailed product view
- `closeProductDetail()` - Return to products
- `changeDetailImage(imageSrc)` - Change main image
- `toggleWishlistFromDetail()` - Wishlist from detail view
- `addToCartFromDetail()` - Add to cart from detail view

### payment.js
- `showPayment()` - Display payment form
- `selectPayment(method)` - Select PhonePe/Google Pay
- `processPayment(event)` - Process UPI payment

### profile.js
- `showProfile()` - Display user profile
- `displayProfile()` - Render profile with order history

### admin.js
- `showAdmin()` - Display admin panel
- `addProduct(event)` - Add new product
- `handleMultipleImages(event)` - Handle image uploads

## 🎨 Styling

**Theme Colors:**
- Primary: `#4a90e2` (Blue)
- Background: `#000` (Black)
- Secondary Background: `#0a0a0a` (Dark Gray)
- Border: `#1e3a5f` (Dark Blue)
- Text: `#e0e0e0` (Light Gray)

**Responsive Design:**
- Mobile-first approach
- Breakpoint: 768px
- Grid adjusts from 4 columns to 2 on mobile

## 🔌 Backend Integration

**Current State:**
- Frontend works standalone with sample data
- Backend API URL: `http://localhost:8080/api/products`
- Falls back to `sampleProducts` if backend unavailable

**To Connect Backend:**
1. Start Spring Boot backend on port 8080
2. Frontend automatically tries to fetch from API
3. Falls back to sample data if connection fails

**API Endpoints Expected:**
```
GET  /api/products          # Get all products
POST /api/products          # Add new product
GET  /api/orders            # Get user orders
POST /api/orders            # Create new order
```

## 💾 Data Storage

**LocalStorage Keys:**
- `cart` - Shopping cart items
- `wishlist` - Wishlist items
- `customProducts` - Admin-added products
- `viewProductId` - Temporary product detail navigation

## 🛠️ Development Workflow

### Adding a New Service Module

1. Create file in `js/services/your-service.js`
2. Add script tag in `index.html`:
   ```html
   <script src="js/services/your-service.js"></script>
   ```
3. Implement functions and export globally

### Adding a New Component

**Option 1: No Server (Inline)**
Edit `js/component-loader-inline.js`:
```javascript
components.yourComponent = `<div>Your HTML</div>`;
```

**Option 2: With Server (File-based)**
1. Create `components/your-component.html`
2. Component auto-loads via `component-loader.js`

### Adding a New Page

1. Create `pages/your-page.html`
2. Copy structure from existing page
3. Include component loader and service scripts
4. Add navigation link in `components/nav.html`

## ✅ Current Status

- ✅ Modular JavaScript (7 service modules)
- ✅ Component system (4 reusable components)
- ✅ No server required (inline components)
- ✅ Sample data externalized (22 products)
- ✅ Responsive design
- ✅ Dark theme
- ✅ LocalStorage persistence
- ⏳ Backend integration (ready, not connected)

## 🎯 Next Steps

1. **Frontend Polish** (if needed)
   - Add loading states
   - Improve error handling
   - Add animations

2. **Backend Integration**
   - Connect to Spring Boot API
   - Replace localStorage with API calls
   - Add authentication

3. **Testing**
   - Test all user flows
   - Cross-browser testing
   - Mobile responsiveness

## 📝 Notes

- **No Build Process Required** - Pure HTML/CSS/JS
- **No Dependencies** - No npm, no webpack, no frameworks
- **Browser Compatibility** - Modern browsers (ES6+)
- **CORS** - Not an issue with inline components
- **Images** - All stored locally in `images/` folder
