export default function CartView({ cart, onIncrease, onDecrease, onRemove, onCheckout, onClose, onShowDetail }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="admin-form">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>🛒 Shopping Cart</h2>
        <button type="button" onClick={onClose} style={{ background: 'transparent', color: '#333', border: 'none', padding: 5, cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}>×</button>
      </div>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => {
            const images = Array.isArray(item.images) ? item.images : (item.images ? [item.images] : [item.imageUrl]);
            return (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottom: '1px solid #eee', gap: 15 }}>
                <img src={images[0]} onClick={() => onShowDetail(item.id)} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, cursor: 'pointer' }} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <h4 onClick={() => onShowDetail(item.id)} style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1rem', cursor: 'pointer' }}>{item.name}</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <button onClick={() => onDecrease(item.id)} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: 3, cursor: 'pointer', fontSize: '1rem' }}>-</button>
                    <span style={{ padding: '5px 10px', minWidth: 30, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>{item.quantity}</span>
                    <button onClick={() => onIncrease(item.id)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: 3, cursor: 'pointer', fontSize: '1rem' }}>+</button>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: 3, cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            );
          })}
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '20px 0' }}>Total: ₹{total}</div>
          <button onClick={onCheckout} style={{ width: '100%', padding: 15, background: '#28a745', color: 'white', border: 'none', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer' }}>
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}
