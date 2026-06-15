import { useState } from 'react';
import { getCategoryEmoji } from '../data/products';

export default function ProductDetailView({ product, isInWishlist, onToggleWishlist, onAddToCart, onClose }) {
  const images = (Array.isArray(product.images) ? product.images : [product.imageUrl]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="product-detail-outer">
      <div className="product-detail-inner">
        <button className="back-btn" onClick={onClose}>← Back to Products</button>
        <div className="product-detail-grid">
          <div>
            <img
              className="product-detail-main-img"
              src={images[activeIndex]}
              alt={product.name}
            />
            {images.length > 1 && (
              <div className="product-detail-thumbnails">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      width: 80, height: 80, objectFit: 'cover', cursor: 'pointer',
                      border: `2px solid ${idx === activeIndex ? '#4a90e2' : '#1e3a5f'}`,
                    }}
                    alt={`${product.name} view ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-category">{getCategoryEmoji(product.category)} {product.category}</p>
            <p className="product-detail-price">₹{product.price}</p>
            {product.sizes && product.sizes.length > 0 && (
              <div className="product-detail-sizes">
                <p>Available Sizes:</p>
                <div className="product-detail-sizes-list">
                  {product.sizes.map(size => (
                    <span key={size} className="size-badge">{size}</span>
                  ))}
                </div>
              </div>
            )}
            <p className="product-detail-stock">
              {product.stock > 0 ? `In Stock: ${product.stock} units` : 'Out of Stock'}
            </p>
            <div className="product-detail-actions">
              <button
                onClick={() => onToggleWishlist(product.id)}
                style={{ flex: 1, padding: 15, background: 'rgba(74,144,226,0.2)', color: '#4a90e2', border: '1px solid #4a90e2', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer' }}
              >
                {isInWishlist ? '♥ Remove from Wishlist' : '♡ Add to Wishlist'}
              </button>
              <button
                onClick={() => onAddToCart(product.id)}
                disabled={product.stock === 0}
                style={{ flex: 2, padding: 15, background: product.stock === 0 ? '#ccc' : '#4a90e2', color: 'white', border: 'none', borderRadius: 8, fontSize: '1.1rem', cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
