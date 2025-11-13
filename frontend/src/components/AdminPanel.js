import React, { useState } from 'react';
import { addProduct } from '../services/api';

function AdminPanel({ onProductAdded }) {
  const [form, setForm] = useState({
    name: '',
    category: 'Dresses',
    price: '',
    stock: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await addProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock)
      });
      setForm({ name: '', category: 'Dresses', price: '', stock: '', imageUrl: '' });
      setMessage('Product added successfully!');
      onProductAdded();
    } catch (error) {
      setMessage('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form">
      <h2>🛠️ Admin Panel - Add New Product</h2>
      {message && (
        <div style={{
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
          backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
          color: message.includes('Error') ? '#721c24' : '#155724',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product Name (e.g., Summer Floral Dress)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="Dresses">👗 Dresses</option>
          <option value="Jewelry">💎 Jewelry</option>
          <option value="Shoes">👠 Shoes</option>
          <option value="Bags">👜 Bags</option>
        </select>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Price (e.g., 29.99)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="number"
          min="0"
          placeholder="Stock Quantity (e.g., 50)"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <input
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Product...' : '➕ Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;
