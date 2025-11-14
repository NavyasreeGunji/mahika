// Profile Service
let userProfile = {
    name: 'Guest User',
    email: 'guest@mahika.com'
};

function showProfile() {
    document.getElementById('products-view').classList.add('hidden');
    document.getElementById('filter-section').style.display = 'none';
    document.getElementById('cart-view').classList.add('hidden');
    document.getElementById('payment-view').classList.add('hidden');
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('wishlist-view').classList.add('hidden');
    document.getElementById('profile-view').classList.remove('hidden');
    
    displayProfile();
}

async function displayProfile() {
    document.getElementById('profile-name').textContent = userProfile.name;
    document.getElementById('profile-email').textContent = userProfile.email;
    
    const orderContainer = document.getElementById('order-history');
    orderContainer.innerHTML = '<p style="text-align: center; color: #666;">Loading orders...</p>';
    
    try {
        const response = await fetch(`http://localhost:8080/api/orders/email/${encodeURIComponent(userProfile.email)}`);
        const orders = await response.json();
        
        if (orders.length === 0) {
            orderContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No previous orders</p>';
            return;
        }
        
        orderContainer.innerHTML = orders.map(order => `
            <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #8b4513;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <strong>Order #${order.id}</strong>
                    <span style="color: #28a745; font-weight: bold;">${order.status}</span>
                </div>
                <p style="margin: 5px 0; color: #666;">Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                <p style="margin: 5px 0; color: #666;">Items: ${order.items.length} products</p>
                <p style="margin: 5px 0; color: #666;">Payment: ${order.paymentMethod} (${order.upiId})</p>
                <p style="margin: 5px 0; font-weight: bold; color: #8b4513;">Total: ₹${order.totalAmount}</p>
                <details style="margin-top: 10px;">
                    <summary style="cursor: pointer; color: #8b4513;">View Items</summary>
                    <div style="margin-top: 10px;">
                        ${order.items.map(item => `
                            <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee;">
                                <span>${item.productName} x${item.quantity}</span>
                                <span>₹${item.price * item.quantity}</span>
                            </div>
                        `).join('')}
                    </div>
                </details>
            </div>
        `).join('');
    } catch (error) {
        orderContainer.innerHTML = '<p style="text-align: center; color: #dc3545; padding: 20px;">Unable to load orders. Please ensure backend is running.</p>';
    }
}
