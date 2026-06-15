export default function Header({ cartCount, wishlistCount, searchQuery, onSearch, onShowCart, onShowWishlist, onShowProfile, onShowAdmin }) {
  return (
    <div className="header">
      <div>
        <img src="/images/1.png" alt="Mahika Icon" className="logo-left" />
      </div>
      <div className="logo-container">
        <img src="/images/2.png" alt="Mahika Designer Studio" className="logo-center" />
        <img src="/images/3.png" alt="Mahika" className="logo-right" />
        <img src="/images/4.png" alt="Mahika" className="logo-extra" />
      </div>
      <div className="header-icons">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
        />
        <button onClick={onShowWishlist} title="Wishlist">
          ♡ <span style={{ fontSize: '0.7rem' }}>{wishlistCount}</span>
        </button>
        <button onClick={onShowCart} title="Cart">
          🛒 <span style={{ fontSize: '0.7rem' }}>{cartCount}</span>
        </button>
        <button onClick={onShowProfile} title="Profile">👤</button>
        <button onClick={onShowAdmin} title="Admin">⚙</button>
      </div>
    </div>
  );
}
