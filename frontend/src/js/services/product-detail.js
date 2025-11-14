// Product Detail Service Module
let currentDetailProduct = null;

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentDetailProduct = product;
    let images = Array.isArray(product.images) ? product.images : (product.images ? [product.images] : [product.imageUrl]);
    images = images.map(img => typeof img === 'string' ? img.replace(/^\.\.\//, '') : img);
    
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    document.getElementById('products-view').classList.add('hidden');
    document.getElementById('filter-section').style.display = 'none';
    document.getElementById('product-detail-view').classList.remove('hidden');
    
    document.getElementById('detail-main-image').src = images[0];
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-category').textContent = getCategoryEmoji(product.category) + ' ' + product.category;
    document.getElementById('detail-price').textContent = '₹' + product.price;
    document.getElementById('detail-stock').textContent = product.stock > 0 ? `In Stock: ${product.stock} units` : 'Out of Stock';
    
    const sizes = product.sizes || [];
    if (sizes.length > 0) {
        document.getElementById('detail-sizes').innerHTML = `
            <p style="margin-bottom: 10px; font-weight: 500;">Available Sizes:</p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${sizes.map(size => `<span style="padding: 8px 16px; border: 1px solid #4a90e2; border-radius: 4px; color: #4a90e2;">${size}</span>`).join('')}
            </div>
        `;
    } else {
        document.getElementById('detail-sizes').innerHTML = '';
    }
    
    document.getElementById('detail-wishlist-btn').innerHTML = isInWishlist ? '♥ Remove from Wishlist' : '♡ Add to Wishlist';
    document.getElementById('detail-cart-btn').disabled = product.stock === 0;
    document.getElementById('detail-cart-btn').style.background = product.stock === 0 ? '#ccc' : '#4a90e2';
    document.getElementById('detail-cart-btn').style.cursor = product.stock === 0 ? 'not-allowed' : 'pointer';
    
    if (images.length > 1) {
        document.getElementById('detail-thumbnails').innerHTML = images.map((img, idx) => 
            `<img src="${img}" onclick="changeDetailImage(${idx})" style="width: 80px; height: 80px; object-fit: cover; cursor: pointer; border: 2px solid ${idx === 0 ? '#4a90e2' : '#1e3a5f'};" id="thumb-${idx}">`
        ).join('');
    } else {
        document.getElementById('detail-thumbnails').innerHTML = '';
    }
}

function changeDetailImage(index) {
    let images = Array.isArray(currentDetailProduct.images) ? currentDetailProduct.images : [currentDetailProduct.imageUrl];
    images = images.map(img => img.replace(/^\.\.\//, ''));
    document.getElementById('detail-main-image').src = images[index];
    images.forEach((_, idx) => {
        const thumb = document.getElementById(`thumb-${idx}`);
        if (thumb) thumb.style.border = idx === index ? '2px solid #4a90e2' : '2px solid #1e3a5f';
    });
}

function closeProductDetail() {
    document.getElementById('product-detail-view').classList.add('hidden');
    document.getElementById('products-view').classList.remove('hidden');
    document.getElementById('filter-section').style.display = 'flex';
}

function toggleWishlistFromDetail() {
    if (!currentDetailProduct) return;
    toggleWishlist(currentDetailProduct.id);
    const isInWishlist = wishlist.some(item => item.id === currentDetailProduct.id);
    document.getElementById('detail-wishlist-btn').innerHTML = isInWishlist ? '♥ Remove from Wishlist' : '♡ Add to Wishlist';
}

function addToCartFromDetail() {
    if (!currentDetailProduct || currentDetailProduct.stock === 0) return;
    addToCart(currentDetailProduct.id);
}
