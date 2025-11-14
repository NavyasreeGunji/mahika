// Products Display Service Module

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    if (query === '') {
        products = [...allProducts];
    } else {
        products = allProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
    }
    displayProducts();
}

function sortProducts(sortBy) {
    if (sortBy === 'price-low') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    }
    displayProducts();
}

function displayProducts() {
    const container = document.getElementById('products-container');
    const filteredProducts = currentView === 'all' ? products : products.filter(p => p.category === currentView);
    
    document.getElementById('product-count').textContent = filteredProducts.length;
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;"><h3>No products found</h3></div>';
        return;
    }

    container.innerHTML = filteredProducts.map(product => {
        const images = Array.isArray(product.images) ? product.images : (product.images ? [product.images] : [product.imageUrl]);
        const mainImage = images[0];
        const sizes = product.sizes || [];
        const isInWishlist = wishlist.some(item => item.id === product.id);
        return `
        <div class="product-card">
            <div style="position: relative;">
                <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist(${product.id})" id="wish-${product.id}">${isInWishlist ? '♥' : '♡'}</button>
                <img src="${mainImage || 'https://via.placeholder.com/300x400/f5f5f5/333?text=' + product.name}" alt="${product.name}" id="img-${product.id}" onclick="showProductDetail(${product.id})" style="cursor: pointer;">
                ${images.length > 1 ? `
                <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
                    ${images.map((_, idx) => `<span id="dot-${product.id}-${idx}" onclick="changeImage(${product.id}, ${idx})" style="width: 10px; height: 10px; border-radius: 50%; background: ${idx === 0 ? '#4a90e2' : 'rgba(255,255,255,0.5)'}; cursor: pointer; border: 1px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></span>`).join('')}
                </div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
                ${Array.isArray(sizes) && sizes.length > 0 ? `<p style="font-size: 0.8rem; color: #888;">Sizes: ${sizes.join(', ')}</p>` : ''}
                ${product.stock > 0 ? `<button onclick="addToCart(${product.id})" class="add-to-cart-btn">Add to Cart</button>` : '<button disabled class="add-to-cart-btn" style="background: #ccc; cursor: not-allowed;">Out of Stock</button>'}
            </div>
        </div>
    `}).join('');
}

function showProducts(category) {
    currentView = category;
    document.getElementById('products-view').classList.remove('hidden');
    document.getElementById('filter-section').style.display = 'flex';
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('cart-view').classList.add('hidden');
    document.getElementById('payment-view').classList.add('hidden');
    document.getElementById('profile-view').classList.add('hidden');
    document.getElementById('wishlist-view').classList.add('hidden');
    document.getElementById('product-detail-view').classList.add('hidden');
    
    document.querySelectorAll('.nav button').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    
    displayProducts();
}

function changeImage(productId, imageIndex) {
    const product = products.find(p => p.id === productId);
    if (product && product.images) {
        const images = Array.isArray(product.images) ? product.images : [product.images];
        document.getElementById(`img-${productId}`).src = images[imageIndex];
        
        images.forEach((_, idx) => {
            const dot = document.getElementById(`dot-${productId}-${idx}`);
            if (dot) dot.style.background = idx === imageIndex ? '#4a90e2' : 'rgba(255,255,255,0.5)';
        });
    }
}
