// Wishlist Service
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showMessage('Removed from wishlist', 'success');
    } else {
        wishlist.push(product);
        showMessage('Added to wishlist!', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    displayProducts();
}

function updateWishlistCount() {
    document.getElementById('wishlist-count').textContent = wishlist.length;
}

function showWishlist() {
    document.getElementById('products-view').classList.add('hidden');
    document.getElementById('filter-section').style.display = 'none';
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('cart-view').classList.add('hidden');
    document.getElementById('payment-view').classList.add('hidden');
    document.getElementById('profile-view').classList.add('hidden');
    document.getElementById('wishlist-view').classList.remove('hidden');
    
    displayWishlist();
}

function displayWishlist() {
    const container = document.getElementById('wishlist-items');
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Your wishlist is empty</p>';
        return;
    }
    
    container.innerHTML = wishlist.map(item => {
        const images = Array.isArray(item.images) ? item.images : (item.images ? [item.images] : [item.imageUrl]);
        const mainImage = images[0];
        return `
        <div style="display: flex; gap: 15px; padding: 15px; border-bottom: 1px solid #eee; align-items: center;">
            <img src="${mainImage}" onclick="showProductDetail(${item.id})" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; cursor: pointer;">
            <div style="flex: 1;">
                <h4 onclick="showProductDetail(${item.id})" style="margin: 0 0 8px 0; color: #333; font-size: 1rem; cursor: pointer;">${item.name}</h4>
                <p style="margin: 0; color: #666; font-size: 0.95rem; font-weight: 600;">₹${item.price}</p>
            </div>
            <div style="display: flex; gap: 8px;">
                <button onclick="addToCart(${item.id})" style="padding: 8px 15px; background: #4a90e2; color: white; border: none; border-radius: 4px; cursor: pointer; white-space: nowrap;">Add to Cart</button>
                <button onclick="toggleWishlist(${item.id}); showWishlist();" style="padding: 8px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Remove</button>
            </div>
        </div>
    `}).join('');
}

function toggleWishlistFromDetail() {
    if (!currentDetailProduct) return;
    toggleWishlist(currentDetailProduct.id);
    const isInWishlist = wishlist.some(item => item.id === currentDetailProduct.id);
    document.getElementById('detail-wishlist-btn').innerHTML = isInWishlist ? '♥ Remove from Wishlist' : '♡ Add to Wishlist';
}
