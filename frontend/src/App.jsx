import { useState, useEffect, useMemo } from 'react';
import { sampleProducts } from './data/products';
import { API_BASE } from './config';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Nav from './components/Nav';
import FilterSection from './components/FilterSection';
import ProductsView from './components/ProductsView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import WishlistView from './components/WishlistView';
import PaymentView from './components/PaymentView';
import ProfileView from './components/ProfileView';
import AdminView from './components/AdminView';
import Toast from './components/Toast';

const API_URL = `${API_BASE}/api/products`;
const ADMIN_PASSWORD = 'admin123';

function normalizeProduct(p) {
  return {
    ...p,
    sizes: typeof p.sizes === 'string' ? (p.sizes ? p.sizes.split(',') : []) : (p.sizes || []),
    images: typeof p.images === 'string'
      ? (p.images.startsWith('[') ? JSON.parse(p.images) : (p.images ? p.images.split(',') : [p.imageUrl]))
      : (p.images || [p.imageUrl]),
  };
}

export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const [currentView, setCurrentView] = useState('products');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentDetailProduct, setCurrentDetailProduct] = useState(null);
  const [userProfile, setUserProfile] = useState({ name: 'Guest User', email: 'guest@mahika.com' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  useEffect(() => {
    async function load() {
      let loaded = sampleProducts;
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          const raw = await res.json();
          // Backend stores sizes/images as comma-separated strings — normalize to arrays
          loaded = raw.length > 0 ? raw.map(normalizeProduct) : sampleProducts;
        }
      } catch {
        // use sampleProducts
      }
      const custom = JSON.parse(localStorage.getItem('customProducts')) || [];
      setAllProducts([...loaded, ...custom]);
    }
    load();
  }, []);

  function showMessage(text, type) {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  }

  const filteredProducts = useMemo(() => {
    let list = currentCategory === 'all' ? [...allProducts] : allProducts.filter(p => p.category === currentCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [allProducts, currentCategory, searchQuery, sortBy]);

  function toggleWishlist(productId) {
    const product = allProducts.find(p => p.id === productId);
    setWishlist(prev => {
      if (prev.some(item => item.id === productId)) {
        showMessage('Removed from wishlist', 'success');
        return prev.filter(item => item.id !== productId);
      }
      showMessage('Added to wishlist!', 'success');
      return [...prev, product];
    });
  }

  function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    showMessage('Added to cart!', 'success');
  }

  function showProductDetail(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    setCurrentDetailProduct(product);
    setCurrentView('product-detail');
  }

  function handleShowAdmin() {
    if (!isAdminLoggedIn) {
      const pwd = window.prompt('🔒 Admin Access Required\n\nEnter admin password:');
      if (pwd === ADMIN_PASSWORD) {
        setIsAdminLoggedIn(true);
        showMessage('Admin access granted!', 'success');
      } else if (pwd !== null) {
        showMessage('Incorrect password! Access denied.', 'error');
        return;
      } else {
        return;
      }
    }
    setCurrentView('admin');
  }

  function handleProductAdded(product) {
    if (!product.id) product.id = Date.now();
    const normalized = normalizeProduct(product);
    setAllProducts(prev => {
      const custom = JSON.parse(localStorage.getItem('customProducts')) || [];
      localStorage.setItem('customProducts', JSON.stringify([...custom, product]));
      return [...prev, normalized];
    });
    setCurrentView('products');
  }

  function handlePaymentSuccess(method, upiId) {
    showMessage(`Payment successful via ${method.toUpperCase()}! UPI ID: ${upiId}. Thank you for shopping with Mahika!`, 'success');
    setCart([]);
    setTimeout(() => setCurrentView('products'), 3000);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const showFilter = currentView === 'products';

  return (
    <div className="app">
      <AnnouncementBar />
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        onSearch={q => { setSearchQuery(q); setCurrentView('products'); }}
        onShowCart={() => setCurrentView('cart')}
        onShowWishlist={() => setCurrentView('wishlist')}
        onShowProfile={() => setCurrentView('profile')}
        onShowAdmin={handleShowAdmin}
      />
      <Nav
        currentCategory={currentCategory}
        onCategoryChange={cat => { setCurrentCategory(cat); setCurrentView('products'); setSearchQuery(''); setSortBy('default'); }}
      />

      {showFilter && (
        <FilterSection
          productCount={filteredProducts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      {currentView === 'products' && (
        <ProductsView
          products={filteredProducts}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onShowDetail={showProductDetail}
        />
      )}

      {currentView === 'product-detail' && currentDetailProduct && (
        <ProductDetailView
          product={currentDetailProduct}
          isInWishlist={wishlist.some(item => item.id === currentDetailProduct.id)}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onClose={() => setCurrentView('products')}
        />
      )}

      {currentView === 'cart' && (
        <CartView
          cart={cart}
          onIncrease={id => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))}
          onDecrease={id => setCart(prev => prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))}
          onRemove={id => setCart(prev => prev.filter(item => item.id !== id))}
          onCheckout={() => setCurrentView('payment')}
          onClose={() => setCurrentView('products')}
          onShowDetail={showProductDetail}
        />
      )}

      {currentView === 'wishlist' && (
        <WishlistView
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
          onClose={() => setCurrentView('products')}
          onShowDetail={showProductDetail}
        />
      )}

      {currentView === 'payment' && (
        <PaymentView
          cart={cart}
          total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={() => setCurrentView('products')}
          onUpdateProfile={({ name, email }) => setUserProfile({ name, email })}
        />
      )}

      {currentView === 'profile' && (
        <ProfileView
          userProfile={userProfile}
          onClose={() => setCurrentView('products')}
        />
      )}

      {currentView === 'admin' && (
        <AdminView
          onProductAdded={handleProductAdded}
          onClose={() => setCurrentView('products')}
        />
      )}

      <Toast message={message} />
    </div>
  );
}
