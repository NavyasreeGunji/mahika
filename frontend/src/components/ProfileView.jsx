import { useEffect, useState } from 'react';

export default function ProfileView({ userProfile, onClose }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`http://localhost:8080/api/orders/email/${encodeURIComponent(userProfile.email)}`);
        setOrders(await res.json());
      } catch {
        setOrders([]);
      }
    }
    fetchOrders();
  }, [userProfile.email]);

  return (
    <div className="admin-form">
      <h2>👤 My Profile</h2>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ width: 80, height: 80, background: '#667eea', borderRadius: '50%', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white' }}>👤</div>
        <h3>{userProfile.name}</h3>
        <p>{userProfile.email}</p>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h3>📋 Previous Orders</h3>
        {orders === null && <p style={{ textAlign: 'center', color: '#666' }}>Loading orders...</p>}
        {orders !== null && orders.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: 20 }}>No previous orders</p>
        )}
        {orders !== null && orders.length > 0 && orders.map(order => (
          <div key={order.id} style={{ background: '#f8f9fa', padding: 15, margin: '10px 0', borderRadius: 8, borderLeft: '4px solid #8b4513' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <strong>Order #{order.id}</strong>
              <span style={{ color: '#28a745', fontWeight: 'bold' }}>{order.status}</span>
            </div>
            <p style={{ margin: '5px 0', color: '#666' }}>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p style={{ margin: '5px 0', color: '#666' }}>Items: {order.items.length} products</p>
            <p style={{ margin: '5px 0', color: '#666' }}>Payment: {order.paymentMethod} ({order.upiId})</p>
            <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#8b4513' }}>Total: ₹{order.totalAmount}</p>
            <details style={{ marginTop: 10 }}>
              <summary style={{ cursor: 'pointer', color: '#8b4513' }}>View Items</summary>
              <div style={{ marginTop: 10 }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
                    <span>{item.productName} x{item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
