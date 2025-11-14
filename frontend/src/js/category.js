const API_URL = 'http://localhost:8080/api/products';
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let customProducts = JSON.parse(localStorage.getItem('customProducts')) || [];

const sampleProducts = [
    {
        id: 1,
        name: "Traditional Silk Saree",
        category: "Sarees",
        price: 3499,
        stock: 10,
        images: ["../images/saree1.jpeg", "../images/saree2.jpeg"],
        imageUrl: "../images/saree1.jpeg",
        sizes: ["Free Size"]
    },
    {
        id: 2,
        name: "Designer Saree Collection",
        category: "Sarees",
        price: 4299,
        stock: 8,
        images: ["../images/saree2.jpeg", "../images/saree3.jpeg"],
        imageUrl: "../images/saree2.jpeg",
        sizes: ["Free Size"]
    },
    {
        id: 3,
        name: "Elegant Saree",
        category: "Sarees",
        price: 3999,
        stock: 12,
        images: ["../images/saree3.jpeg", "../images/saree4.jpeg"],
        imageUrl: "../images/saree3.jpeg",
        sizes: ["Free Size"]
    },
    {
        id: 4,
        name: "Party Wear Saree",
        category: "Sarees",
        price: 4599,
        stock: 6,
        images: ["../images/saree4.jpeg", "../images/saree1.jpeg"],
        imageUrl: "../images/saree4.jpeg",
        sizes: ["Free Size"]
    },
    {
        id: 5,
        name: "Designer Frock",
        category: "Dresses",
        price: 2499,
        stock: 15,
        images: ["../images/f1.jpeg", "../images/f2.jpeg"],
        imageUrl: "../images/f1.jpeg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 6,
        name: "Stylish Frock",
        category: "Dresses",
        price: 2799,
        stock: 10,
        images: ["../images/f2.jpeg", "../images/frock.jpeg"],
        imageUrl: "../images/f2.jpeg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 7,
        name: "Party Frock",
        category: "Dresses",
        price: 2999,
        stock: 8,
        images: ["../images/frock.jpeg", "../images/frock1.jpeg"],
        imageUrl: "../images/frock.jpeg",
        sizes: ["M", "L", "XL"]
    },
    {
        id: 8,
        name: "Elegant Frock",
        category: "Dresses",
        price: 2599,
        stock: 12,
        images: ["../images/frock1.jpeg", "../images/f1.jpeg"],
        imageUrl: "../images/frock1.jpeg",
        sizes: ["S", "M", "L"]
    },
    {
        id: 9,
        name: "Gold Plated Necklace",
        category: "Jewelry",
        price: 1299,
        stock: 20,
        images: ["../images/j1.jpeg", "../images/j2.jpeg"],
        imageUrl: "../images/j1.jpeg",
        sizes: []
    },
    {
        id: 10,
        name: "Silver Earrings Set",
        category: "Jewelry",
        price: 899,
        stock: 25,
        images: ["../images/j2.jpeg", "../images/j3.jpeg"],
        imageUrl: "../images/j2.jpeg",
        sizes: []
    },
    {
        id: 11,
        name: "Designer Bangles",
        category: "Jewelry",
        price: 1599,
        stock: 15,
        images: ["../images/j3.jpeg", "../images/j4.jpeg"],
        imageUrl: "../images/j3.jpeg",
        sizes: []
    },
    {
        id: 12,
        name: "Pearl Necklace",
        category: "Jewelry",
        price: 2299,
        stock: 10,
        images: ["../images/j4.jpeg", "../images/j5.jpeg"],
        imageUrl: "../images/j4.jpeg",
        sizes: []
    },
    {
        id: 13,
        name: "Traditional Jhumka",
        category: "Jewelry",
        price: 799,
        stock: 30,
        images: ["../images/j5.jpeg", "../images/j6.jpeg"],
        imageUrl: "../images/j5.jpeg",
        sizes: []
    },
    {
        id: 14,
        name: "Kundan Jewelry Set",
        category: "Jewelry",
        price: 3499,
        stock: 8,
        images: ["../images/j6.jpeg", "../images/j7.jpeg"],
        imageUrl: "../images/j6.jpeg",
        sizes: []
    },
    {
        id: 15,
        name: "Oxidized Jewelry",
        category: "Jewelry",
        price: 1099,
        stock: 18,
        images: ["../images/j7.jpeg", "../images/j8.jpeg"],
        imageUrl: "../images/j7.jpeg",
        sizes: []
    },
    {
        id: 16,
        name: "Temple Jewelry",
        category: "Jewelry",
        price: 2799,
        stock: 12,
        images: ["../images/j8.jpeg", "../images/j9.jpeg"],
        imageUrl: "../images/j8.jpeg",
        sizes: []
    },
    {
        id: 17,
        name: "Bridal Jewelry Set",
        category: "Jewelry",
        price: 4999,
        stock: 5,
        images: ["../images/j9.jpeg", "../images/j10.jpeg"],
        imageUrl: "../images/j9.jpeg",
        sizes: []
    },
    {
        id: 18,
        name: "Antique Jewelry",
        category: "Jewelry",
        price: 3299,
        stock: 10,
        images: ["../images/j10.jpeg", "../images/j11.jpeg"],
        imageUrl: "../images/j10.jpeg",
        sizes: []
    },
    {
        id: 19,
        name: "Stone Jewelry",
        category: "Jewelry",
        price: 1899,
        stock: 15,
        images: ["../images/j11.jpeg", "../images/j12.jpeg"],
        imageUrl: "../images/j11.jpeg",
        sizes: []
    },
    {
        id: 20,
        name: "Fashion Jewelry",
        category: "Jewelry",
        price: 999,
        stock: 25,
        images: ["../images/j12.jpeg", "../images/j13.jpeg"],
        imageUrl: "../images/j12.jpeg",
        sizes: []
    },
    {
        id: 21,
        name: "Party Wear Jewelry",
        category: "Jewelry",
        price: 2499,
        stock: 12,
        images: ["../images/j13.jpeg", "../images/j14.jpeg"],
        imageUrl: "../images/j13.jpeg",
        sizes: []
    },
    {
        id: 22,
        name: "Elegant Jewelry Set",
        category: "Jewelry",
        price: 3799,
        stock: 8,
        images: ["../images/j14.jpeg", "../images/j1.jpeg"],
        imageUrl: "../images/j14.jpeg",
        sizes: []
    }
];

async function loadCategoryProducts(...categories) {
    try {
        const response = await fetch(API_URL);
        products = await response.json();
    } catch (error) {
        products = sampleProducts;
    }
    
    // Merge custom products from admin
    products = [...products, ...customProducts];
    
    const filtered = products.filter(p => categories.includes(p.category));
    displayProducts(filtered);
    updateCounts();
}

function displayProducts(filteredProducts) {
    const container = document.getElementById('products-container');
    document.getElementById('product-count').textContent = filteredProducts.length;
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;"><h3>No products found</h3></div>';
        return;
    }

    container.innerHTML = filteredProducts.map(product => {
        const images = Array.isArray(product.images) ? product.images : [product.imageUrl];
        const mainImage = images[0];
        const sizes = product.sizes || [];
        const isInWishlist = wishlist.some(item => item.id === product.id);
        return `
        <div class="product-card">
            <div style="position: relative;">
                <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist(${product.id})" id="wish-${product.id}">${isInWishlist ? '♥' : '♡'}</button>
                <img src="${mainImage}" alt="${product.name}" id="img-${product.id}" style="cursor: pointer;">
                ${images.length > 1 ? `
                <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
                    ${images.map((_, idx) => `<span id="dot-${product.id}-${idx}" onclick="changeImage(${product.id}, ${idx})" style="width: 10px; height: 10px; border-radius: 50%; background: ${idx === 0 ? '#4a90e2' : 'rgba(255,255,255,0.5)'}; cursor: pointer; border: 1px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></span>`).join('')}
                </div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
                ${sizes.length > 0 ? `<p style="font-size: 0.8rem; color: #888;">Sizes: ${sizes.join(', ')}</p>` : ''}
                ${product.stock > 0 ? `<button onclick="addToCart(${product.id})" class="add-to-cart-btn">Add to Cart</button>` : '<button disabled class="add-to-cart-btn" style="background: #ccc; cursor: not-allowed;">Out of Stock</button>'}
            </div>
        </div>
    `}).join('');
}

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const category = document.querySelector('.nav a.active').textContent.trim();
    let filtered = products.filter(p => p.category === category);
    
    if (query) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
    }
    displayProducts(filtered);
}

function sortProducts(sortBy) {
    const category = document.querySelector('.nav a.active').textContent.trim();
    let filtered = products.filter(p => p.category === category);
    
    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    displayProducts(filtered);
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
    } else {
        wishlist.push(product);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounts();
    
    const category = document.querySelector('.nav a.active').textContent.trim();
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    alert('Added to cart!');
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

function updateCounts() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('wishlist-count').textContent = wishlist.length;
}
