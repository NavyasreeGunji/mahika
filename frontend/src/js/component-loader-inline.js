// Inline Component Loader - No server required
const components = {
    announcement: `<div class="announcement-bar">FREE SHIPPING ON ORDERS OVER ₹2000 | USE CODE: WELCOME10 FOR 10% OFF</div>`,
    
    header: `<div class="header">
        <div><img src="images/1.png" alt="Mahika Icon" class="logo-left"></div>
        <div class="logo-container">
            <img src="images/2.png" alt="Mahika Designer Studio" class="logo-center">
            <img src="images/3.png" alt="Mahika" class="logo-right">
            <img src="images/4.png" alt="Mahika" class="logo-extra">
        </div>
        <div class="header-icons">
            <input type="text" class="search-bar" placeholder="Search products..." id="search-input" onkeyup="searchProducts()">
            <button onclick="window.location.href='pages/wishlist.html'" title="Wishlist">♡ <span id="wishlist-count" style="font-size: 0.7rem;">0</span></button>
            <button onclick="window.location.href='pages/cart.html'" title="Cart">🛒 <span id="cart-count" style="font-size: 0.7rem;">0</span></button>
            <button onclick="window.location.href='pages/profile.html'" title="Profile">👤</button>
            <button onclick="window.location.href='pages/admin.html'" title="Admin">⚙</button>
        </div>
    </div>`,
    
    nav: `<div class="nav">
        <a href="index.html" class="active">All</a>
        <a href="pages/sarees.html">Sarees</a>
        <a href="pages/dresses.html">Dresses</a>
        <a href="pages/jewelry.html">Jewellery</a>
        <a href="pages/bags.html">Bags</a>
        <a href="pages/rental.html">Rental</a>
    </div>`,
    
    filter: `<div class="filter-section" id="filter-section">
        <div><span id="product-count">0</span> Products</div>
        <select onchange="sortProducts(this.value)">
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
        </select>
    </div>`
};

function loadAllComponents(basePath = '', isCategory = false) {
    document.getElementById('announcement-container').innerHTML = components.announcement;
    document.getElementById('header-container').innerHTML = components.header;
    document.getElementById('nav-container').innerHTML = components.nav;
    document.getElementById('filter-container').innerHTML = components.filter;
    
    if (isCategory) {
        // Fix nav links
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === 'index.html') {
                link.setAttribute('href', '../index.html');
            } else if (href.startsWith('pages/')) {
                link.setAttribute('href', href.replace('pages/', ''));
            }
        });
        
        // Fix header image paths
        const headerImages = document.querySelectorAll('.header img');
        headerImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('../')) {
                img.setAttribute('src', '../' + src);
            }
        });
        
        // Fix header button links
        const headerButtons = document.querySelectorAll('.header-icons button');
        headerButtons.forEach(btn => {
            const onclick = btn.getAttribute('onclick');
            if (onclick && onclick.includes("'pages/")) {
                btn.setAttribute('onclick', onclick.replace(/pages\//g, ''));
            }
        });
    }
    
    return Promise.resolve();
}
