import ProductCard from './ProductCard';

export default function ProductsView({ products, wishlist, onToggleWishlist, onAddToCart, onShowDetail }) {
  if (products.length === 0) {
    return (
      <div className="products">
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
          <h3>No products found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="products" id="products-container">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isInWishlist={wishlist.some(item => item.id === product.id)}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
          onShowDetail={onShowDetail}
        />
      ))}
    </div>
  );
}
