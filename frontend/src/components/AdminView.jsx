import { useState, useRef } from 'react';
import { API_BASE } from '../config';

const API_URL = `${API_BASE}/api/products`;

export default function AdminView({ onProductAdded, onClose }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Dresses');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [sizes, setSizes] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [message, setMessage] = useState(null);
  const fileRef = useRef();

  function toggleSize(size) {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  }

  function handleImages(e) {
    const files = Array.from(e.target.files);
    setUploadedImages([]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setUploadedImages(prev => [...prev, ev.target.result]);
      reader.readAsDataURL(file);
    });
  }

  function showMsg(text, type) {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const imgList = uploadedImages.length > 0 ? uploadedImages : ['https://via.placeholder.com/300x350/8b4513/ffffff?text=No+Image'];
    const product = {
      name, category,
      price: parseInt(price),
      stock: parseInt(stock),
      sizes: sizes.join(','),
      images: JSON.stringify(imgList),
      imageUrl: imgList[0],
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error();
      showMsg('Product added successfully!', 'success');
    } catch {
      product.id = Date.now();
      showMsg('Product added successfully! (Demo mode)', 'success');
    }

    onProductAdded(product);
    setName(''); setPrice(''); setStock(''); setSizes([]); setUploadedImages([]);
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="admin-form">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>🛠️ Admin Panel - Add New Product</h2>
        <button type="button" onClick={onClose} style={{ background: 'transparent', color: '#333', border: 'none', padding: 5, cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}>×</button>
      </div>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <input type="text" placeholder="Product Name (e.g., Summer Floral Dress)" required value={name} onChange={e => setName(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Dresses">👗 Dresses</option>
          <option value="Sarees">🥻 Sarees</option>
          <option value="Jewelry">💎 Jewellery</option>
          <option value="Bags">👜 Bags</option>
          <option value="Rental">🎭 Rental</option>
        </select>
        <input type="number" min="0" placeholder="Price in INR (e.g., 2999)" required value={price} onChange={e => setPrice(e.target.value)} />
        <div>
          <label>Available Sizes:</label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
            {['S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map(size => (
              <label key={size}>
                <input type="checkbox" checked={sizes.includes(size)} onChange={() => toggleSize(size)} /> {size}
              </label>
            ))}
          </div>
        </div>
        <input type="number" min="0" placeholder="Stock Quantity (e.g., 50)" required value={stock} onChange={e => setStock(e.target.value)} />
        <div>
          <label>Product Images (Multiple):</label>
          <input type="file" accept="image/*" multiple onChange={handleImages} ref={fileRef} />
          <p style={{ fontSize: '0.85rem', color: '#888', marginTop: 5 }}>Upload multiple images for different views</p>
        </div>
        {uploadedImages.length > 0 && (
          <div id="image-preview">
            {uploadedImages.map((src, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <img src={src} alt={`preview ${idx + 1}`} />
                <span>{idx + 1}</span>
              </div>
            ))}
          </div>
        )}
        <button type="submit">➕ Add Product</button>
      </form>
    </div>
  );
}
