// Cart Service
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showMessage('Added to cart!', 'success');
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function showCart() {
    document.getElementById('products-view').classList.add('hidden');
    document.getElementById('filter-section').style.display = 'none';
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('payment-view').classList.add('hidden');
    document.getElementById('profile-view').classList.add('hidden');
    document.getElementById('wishlist-view').classList.add('hidden');
    document.getElementById('cart-view').classList.remove('hidden');
    
    displayCart();
}

function displayCart() {
    const container = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        document.getElementById('cart-total').textContent = '';
        document.getElementById('checkout-btn').style.display = 'none';
        return;
    }
    
    cartTotal = 0;
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;
        const images = Array.isArray(item.images) ? item.images : (item.images ? [item.images] : [item.imageUrl]);
        const mainImage = images[0];
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #eee; gap: 15px;">
                <img src="${mainImage}" onclick="showProductDetail(${item.id})" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; cursor: pointer;">
                <div style="flex: 1;">
                    <h4 onclick="showProductDetail(${item.id})" style="margin: 0 0 8px 0; color: #333; font-size: 1rem; cursor: pointer;">${item.name}</h4>
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">₹${item.price} × ${item.quantity} = ₹${itemTotal}</p>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <div style="display: flex; gap: 5px; align-items: center;">
                        <button onclick="decreaseQuantity(${item.id})" style="background: #6c757d; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 1rem;">-</button>
                        <span style="padding: 5px 10px; min-width: 30px; text-align: center; font-weight: bold; color: #333;">${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 1rem;">+</button>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('cart-total').textContent = `Total: ₹${cartTotal}`;
    document.getElementById('checkout-btn').style.display = 'block';
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function showPayment() {
    document.getElementById('cart-view').classList.add('hidden');
    document.getElementById('payment-view').classList.remove('hidden');
    document.getElementById('payment-total').textContent = `Total: ₹${cartTotal}`;
}

function addToCartFromDetail() {
    if (!currentDetailProduct || currentDetailProduct.stock === 0) return;
    addToCart(currentDetailProduct.id);
}
