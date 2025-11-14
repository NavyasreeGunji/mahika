// Component Loader - Loads HTML components dynamically
async function loadComponent(componentName, targetId, basePath = '') {
    try {
        const response = await fetch(`${basePath}components/${componentName}.html`);
        let html = await response.text();
        document.getElementById(targetId).innerHTML = html;
    } catch (error) {
        console.error(`Failed to load component: ${componentName}`, error);
    }
}

async function loadAllComponents(basePath = '', isCategory = false) {
    await Promise.all([
        loadComponent('announcement', 'announcement-container', basePath),
        loadComponent('header', 'header-container', basePath),
        loadComponent('nav', 'nav-container', basePath),
        loadComponent('filter', 'filter-container', basePath)
    ]);
    
    // Adjust paths for category pages
    if (isCategory) {
        // Fix nav links
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href.startsWith('../') && !href.startsWith('http')) {
                if (href === 'index.html') {
                    link.setAttribute('href', '../index.html');
                } else if (href.startsWith('pages/')) {
                    link.setAttribute('href', href.replace('pages/', ''));
                }
            }
        });
        
        // Fix header image paths
        const headerImages = document.querySelectorAll('.header img');
        headerImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('../') && !src.startsWith('http')) {
                img.setAttribute('src', '../' + src);
            }
        });
        
        // Fix header button links
        const headerButtons = document.querySelectorAll('.header-icons button');
        headerButtons.forEach(btn => {
            const onclick = btn.getAttribute('onclick');
            if (onclick && onclick.includes("'pages/")) {
                btn.setAttribute('onclick', onclick.replace(/pages\//g, ''));
            } else if (onclick && onclick.includes("'pages/")) {
                btn.setAttribute('onclick', onclick.replace(/pages\//g, ''));
            }
        });
    }
}
