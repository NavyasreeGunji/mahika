import React from 'react';

function ProductList({ products }) {
  const getCategoryEmoji = (category) => {
    switch(category) {
      case 'Dresses': return '👗';
      case 'Jewelry': return '💎';
      case 'Shoes': return '👠';
      case 'Bags': return '👜';
      default: return '🛍️';
    }
  };

  return (
    <div className="products">
      {products.length === 0 ? (
        <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666'}}>
          <h3>No products found in this category</h3>
        </div>
      ) : (
        products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl || 'https://via.placeholder.com/280x200/667eea/ffffff?text=' + getCategoryEmoji(product.category)} alt={product.name} />
            <h3>{product.name}</h3>
            <p style={{fontSize: '1.1rem', color: '#888'}}>{getCategoryEmoji(product.category)} {product.category}</p>
            <p style={{fontSize: '1.4rem', fontWeight: 'bold', color: '#667eea'}}>${product.price}</p>
            <p style={{color: product.stock > 0 ? '#28a745' : '#dc3545'}}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
