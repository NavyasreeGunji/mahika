import { useState } from 'react';
import { API_BASE } from '../config';

export default function PaymentView({ cart, total, onPaymentSuccess, onClose, onUpdateProfile }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('');
  const [upiId, setUpiId] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!method) return;

    onUpdateProfile({ name, email });

    const orderData = {
      customerName: name,
      customerEmail: email,
      paymentMethod: method.toUpperCase(),
      upiId: method === 'cod' ? '' : upiId,
      totalAmount: total,
      items: (cart || []).map(item => ({
        productName: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
    } catch {
      console.log('Backend not available, order saved locally');
    }

    onPaymentSuccess(method, upiId);
  }

  return (
    <div className="admin-form">
      <h2>💳 Payment</h2>
      <button type="button" onClick={onClose} style={{ background: 'white', color: 'black', border: '2px solid black', padding: '10px 20px', cursor: 'pointer', fontSize: '1rem', borderRadius: 5, fontWeight: 'bold', marginBottom: 20, display: 'block' }}>
        CLOSE
      </button>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
        <div style={{ display: 'flex', gap: 10, margin: '15px 0', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setMethod('phonepe')}
            style={{ flex: 1, minWidth: 100, padding: 15, background: method === 'phonepe' ? '#5f259f' : '#ccc', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          >
            📱 PhonePe
          </button>
          <button
            type="button"
            onClick={() => setMethod('googlepay')}
            style={{ flex: 1, minWidth: 100, padding: 15, background: method === 'googlepay' ? '#4285f4' : '#ccc', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          >
            🌐 Google Pay
          </button>
          <button
            type="button"
            onClick={() => setMethod('cod')}
            style={{ flex: 1, minWidth: 100, padding: 15, background: method === 'cod' ? '#e67e22' : '#ccc', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          >
            💵 Cash on Delivery
          </button>
        </div>

        {method === 'cod' && (
          <>
            <div style={{ background: '#fff8e1', border: '1px solid #f0c040', borderRadius: 8, padding: 15, margin: '10px 0', color: '#7a5c00' }}>
              Pay in cash when your order arrives. Our team will contact you on <strong>{email}</strong> to confirm delivery details.
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '15px 0' }}>Total Amount: ₹{total}</div>
            <button type="submit" style={{ width: '100%', padding: 15, background: '#e67e22', color: 'white', border: 'none', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer' }}>
              Place COD Order
            </button>
          </>
        )}

        {(method === 'phonepe' || method === 'googlepay') && (
          <>
            <input type="text" placeholder="Enter UPI ID (e.g., user@phonepe)" required value={upiId} onChange={e => setUpiId(e.target.value)} />
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '15px 0' }}>Total Amount: ₹{total}</div>
            <button type="submit" style={{ width: '100%', padding: 15, background: '#28a745', color: 'white', border: 'none', borderRadius: 8, fontSize: '1.1rem', cursor: 'pointer' }}>
              Pay with UPI
            </button>
          </>
        )}
      </form>
    </div>
  );
}
