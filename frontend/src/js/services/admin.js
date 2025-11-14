// Admin Service
let isAdminLoggedIn = false;
const ADMIN_PASSWORD = 'admin123';
let uploadedImages = [];

function showAdmin() {
    if (!isAdminLoggedIn) {
        const password = prompt('🔒 Admin Access Required\n\nEnter admin password:');
        if (password === ADMIN_PASSWORD) {
            isAdminLoggedIn = true;
            showMessage('Admin access granted!', 'success');
        } else if (password !== null) {
            showMessage('Incorrect password! Access denied.', 'error');
            return;
        } else {
            return;
        }
    }
    
    document.getElementById('products-view').classList.add('hidden');
    document.getElementById('filter-section').style.display = 'none';
    document.getElementById('cart-view').classList.add('hidden');
    document.getElementById('payment-view').classList.add('hidden');
    document.getElementById('profile-view').classList.add('hidden');
    document.getElementById('wishlist-view').classList.add('hidden');
    document.getElementById('product-detail-view').classList.add('hidden');
    document.getElementById('admin-view').classList.remove('hidden');
}

async function addProduct(event) {
    event.preventDefault();
    
    const selectedSizes = Array.from(document.querySelectorAll('input[name="sizes"]:checked')).map(cb => cb.value);
    
    const product = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        price: parseInt(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        sizes: selectedSizes,
        images: uploadedImages.length > 0 ? uploadedImages : ['https://via.placeholder.com/300x350/8b4513/ffffff?text=No+Image'],
        imageUrl: uploadedImages[0] || 'https://via.placeholder.com/300x350/8b4513/ffffff?text=No+Image'
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            showMessage('Product added successfully!', 'success');
            clearAdminForm();
            loadProducts();
        } else {
            throw new Error('Failed to add product');
        }
    } catch (error) {
        product.id = Date.now();
        products.push(product);
        allProducts = [...products];
        showMessage('Product added successfully! (Demo mode)', 'success');
        clearAdminForm();
        displayProducts();
    }
}

function clearAdminForm() {
    document.getElementById('admin-form').reset();
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('imageFiles').value = '';
    uploadedImages = [];
    document.querySelectorAll('input[name="sizes"]:checked').forEach(cb => cb.checked = false);
}

function handleMultipleImages(event) {
    const files = event.target.files;
    uploadedImages = [];
    document.getElementById('image-preview').innerHTML = '';
    
    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImages.push(e.target.result);
            const imgDiv = document.createElement('div');
            imgDiv.style.cssText = 'position: relative;';
            imgDiv.innerHTML = `
                <img src="${e.target.result}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px; border: 2px solid #8b4513;">
                <span style="position: absolute; top: -5px; right: -5px; background: #8b4513; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">${index + 1}</span>
            `;
            document.getElementById('image-preview').appendChild(imgDiv);
        };
        reader.readAsDataURL(file);
    });
}
