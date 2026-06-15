export default function WishlistView({ wishlist, onToggleWishlist, onAddToCart, onClose, onShowDetail }) {
  return (
    <div className="admin-form">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>♡ My Wishlist</h2>
        <button type="button" onClick={onClose} style={{ background: 'transparent', color: '#333', border: 'none', padding: 5, cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}>×</button>
      </div>

      {wishlist.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: 40 }}>Your wishlist is empty</p>
      ) : (
        wishlist.map(item => {
          const images = Array.isArray(item.images) ? item.images : (item.images ? [item.images] : [item.imageUrl]);
          return (
            <div key={item.id} style={{ display: 'flex', gap: 15, padding: 15, borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <img src={images[0]} onClick={() => onShowDetail(item.id)} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, cursor: 'pointer' }} alt={item.name} />
              <div style={{ flex: 1 }}>
                <h4 onClick={() => onShowDetail(item.id)} style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1rem', cursor: 'pointer' }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: 600 }}>₹{item.price}</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => onAddToCart(item.id)} style={{ padding: '8px 15px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', whiteSpace: 'nowrap' }}>Add to Cart</button>
                <button onClick={() => onToggleWishlist(item.id)} style={{ padding: '8px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Remove</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
