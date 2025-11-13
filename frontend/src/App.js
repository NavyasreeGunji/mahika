import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import { getAllProducts, getByCategory } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('all');

  const loadProducts = async (category = null) => {
    const res = category ? await getByCategory(category) : await getAllProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setView(category);
    loadProducts(category === 'all' ? null : category);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Shopping Store</h1>
      </div>
      
      <div className="nav">
        <button onClick={() => handleCategoryClick('all')}>All Products</button>
        <button onClick={() => handleCategoryClick('Dresses')}>Dresses</button>
        <button onClick={() => handleCategoryClick('Jewelry')}>Jewelry</button>
        <button onClick={() => handleCategoryClick('Shoes')}>Shoes</button>
        <button onClick={() => handleCategoryClick('Bags')}>Bags</button>
        <button onClick={() => setView('admin')}>Admin Panel</button>
      </div>

      {view === 'admin' ? (
        <AdminPanel onProductAdded={() => loadProducts()} />
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}

export default App;
