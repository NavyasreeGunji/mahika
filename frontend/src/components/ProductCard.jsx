import { useState } from 'react';

export default function ProductCard({ product, isInWishlist, onToggleWishlist, onAddToCart, onShowDetail }) {
  const images = Array.isArray(product.images) ? product.images : (product.images ? [product.images] : [product.imageUrl]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="product-card">
      <div style={{ position: 'relative' }}>
        <button
          className="wishlist-btn"
          onClick={e => { e.stopPropagation(); onToggleWishlist(product.id); }}
        >
          {isInWishlist ? '♥' : '♡'}
        </button>
        <img
          src={images[activeIndex] || `https://via.placeholder.com/300x400/f5f5f5/333?text=${product.name}`}
          alt={product.name}
          onClick={() => onShowDetail(product.id)}
          style={{ cursor: 'pointer' }}
        />
        {images.length > 1 && (
          <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
            {images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: idx === activeIndex ? '#4a90e2' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', border: '1px solid #fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        {product.sizes && product.sizes.length > 0 && (
          <p style={{ fontSize: '0.8rem', color: '#888' }}>Sizes: {product.sizes.join(', ')}</p>
        )}
        {product.stock > 0 ? (
          <button onClick={() => onAddToCart(product.id)} className="add-to-cart-btn">Add to Cart</button>
        ) : (
          <button disabled className="add-to-cart-btn" style={{ background: '#ccc', cursor: 'not-allowed' }}>Out of Stock</button>
        )}
      </div>
    </div>
  );
}
