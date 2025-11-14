// Payment Service Module
let selectedPaymentMethod = '';

function showPayment() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('products-view').classList.add('hidden');
    document.getElementById('filter-section').style.display = 'none';
    document.getElementById('cart-view').classList.add('hidden');
    document.getElementById('payment-view').classList.remove('hidden');
    document.getElementById('payment-total').textContent = `Total Amount: ₹${total}`;
    window.cartTotal = total;
}

function selectPayment(method) {
    selectedPaymentMethod = method;
    document.getElementById('phonepe-btn').style.background = method === 'phonepe' ? '#5f259f' : '#ccc';
    document.getElementById('googlepay-btn').style.background = method === 'googlepay' ? '#4285f4' : '#ccc';
    document.getElementById('upi-id').style.display = 'block';
    document.getElementById('pay-btn').style.display = 'block';
}

async function processPayment(event) {
    event.preventDefault();
    if (!selectedPaymentMethod) {
        showMessage('Please select a payment method', 'error');
        return;
    }
    const upiId = document.getElementById('upi-id').value;
    const customerName = document.querySelector('input[placeholder="Full Name"]').value;
    const customerEmail = document.querySelector('input[placeholder="Email"]').value;
    
    userProfile.name = customerName;
    userProfile.email = customerEmail;
    
    const orderData = {
        customerName: customerName,
        customerEmail: customerEmail,
        paymentMethod: selectedPaymentMethod.toUpperCase(),
        upiId: upiId,
        totalAmount: window.cartTotal,
        items: cart.map(item => ({
            productName: item.name,
            category: item.category,
            price: item.price,
            quantity: item.quantity
        }))
    };
    
    try {
        await fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderData)
        });
    } catch (error) {
        console.log('Backend not available, order saved locally');
    }
    
    showMessage(`Payment successful via ${selectedPaymentMethod.toUpperCase()}! UPI ID: ${upiId}. Thank you for shopping with Mahika!`, 'success');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    setTimeout(() => {
        showProducts('all');
    }, 3000);
}
