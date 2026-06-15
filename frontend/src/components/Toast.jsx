export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 9999,
      padding: '12px 20px', borderRadius: 8,
      background: message.type === 'success' ? 'rgba(40,167,69,0.95)' : 'rgba(220,53,69,0.95)',
      color: 'white', fontWeight: 600, fontSize: '0.95rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      animation: 'fadeIn 0.3s ease',
    }}>
      {message.text}
    </div>
  );
}
