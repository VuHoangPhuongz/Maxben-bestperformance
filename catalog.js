// File: catalog.js

document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('catalog-sidebar');
    const gridContainer = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('catalog-search-input');
    const catalogTitle = document.getElementById('catalog-title');
    const paginationContainer = document.getElementById('catalog-pagination');

    if (!sidebarContainer) return; // Thoát nếu không phải trang có catalog

    let currentPage = 1;
    const productsPerPage = 9;
    let currentFullProductList = [];

    const categoryIcons = {"Đèn LED Âm Trần": "fa-lightbulb", "Đèn LED Bulb": "fa-sun", "Đèn Tuýp LED": "fa-ruler-horizontal", "Đèn LED Ốp Trần": "fa-record-vinyl", "Đèn Pha LED": "fa-broadcast-tower", "Dây LED": "fa-wave-square", "Quạt Trần Đèn": "fa-fan", "Đèn Năng Lượng Mặt Trời": "fa-solar-panel", "Đèn Ống Bơ": "fa-circle", "Đèn Pin": "fa-flashlight", "default": "fa-star" };

    function renderProductGrid(products) {
        gridContainer.innerHTML = '';
        if (!products || products.length === 0) {
            gridContainer.innerHTML = `<p class="col-span-full text-center text-gray-400 py-10">Không tìm thấy sản phẩm.</p>`;
            return;
        }
        products.forEach(product => {
            const card = document.createElement('a');
            card.href = `product-detail.html?id=${product.id}`;
            // Thay đổi màu chữ cho phù hợp nền tối
            card.className = 'product-card-new'; 
            card.innerHTML = `
                <div class="product-image-wrapper p-4 bg-gray-800/50 aspect-square flex items-center justify-center">
                    <img src="${product.image}" alt="${product.displayName}" class="max-w-full max-h-full object-contain">
                </div>
                <div class="p-4 border-t border-gray-700 flex-grow flex flex-col">
                    <h4 class="font-bold text-md text-white flex-grow">${product.displayName}</h4>
                    <p class="text-sm text-gray-400 mt-1">${product.category}</p>
                    <div class="flex justify-between items-center mt-4">
                        <span class="font-bold text-lg text-blue-400">${product.price}</span>
                        <span class="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">
                            <i class="fas fa-plus"></i>
                        </span>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    function renderPagination(totalProducts) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        if (totalPages <= 1) return;
        const createButton = (text, page, isDisabled = false, isActive = false) => {
            const button = document.createElement('button');
            button.innerHTML = text;
            button.className = `pagination-btn ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`;
            button.onclick = () => { if (!isDisabled) { currentPage = page; displayPaginatedProducts(); } };
            return button;
        };
        paginationContainer.appendChild(createButton('<i class="fas fa-chevron-left"></i>', currentPage - 1, currentPage === 1));
        for (let i = 1; i <= totalPages; i++) { paginationContainer.appendChild(createButton(i, i, false, i === currentPage)); }
        paginationContainer.appendChild(createButton('<i class="fas fa-chevron-right"></i>', currentPage + 1, currentPage === totalPages));
    }

    function displayPaginatedProducts() {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = currentFullProductList.slice(startIndex, endIndex);
        renderProductGrid(paginatedProducts);
        renderPagination(currentFullProductList.length);
        const catalogElement = document.getElementById('new-product-catalog');
        if (catalogElement) { catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }

    function createCategoryButton(name, icon, count, filterValue) {
        const button = document.createElement('a');
        button.href = '#';
        button.className = 'category-link';
        button.dataset.filter = filterValue;
        button.innerHTML = `<i class="fas ${icon} category-icon"></i><span>${name}</span><span class="category-count">${count}</span>`;
        button.addEventListener('click', (e) => { e.preventDefault(); filterByCategory(button); });
        return button;
    }

    function renderCategorySidebar() {
        const categoryCounts = {};
        const productLines = new Set(Object.values(allProducts).map(p => p.name));
        productLines.forEach(name => {
            const representativeProduct = Object.values(allProducts).find(p => p.name === name);
            if (representativeProduct) { categoryCounts[representativeProduct.category] = (categoryCounts[representativeProduct.category] || 0) + 1; }
        });
        sidebarContainer.innerHTML = '';
        const allButton = createCategoryButton('Tất cả sản phẩm', 'fa-border-all', productLines.size, 'Tất cả');
        allButton.classList.add('active');
        sidebarContainer.appendChild(allButton);
        Object.keys(categoryCounts).sort().forEach(category => {
            const button = createCategoryButton(category, categoryIcons[category] || categoryIcons.default, categoryCounts[category], category);
            sidebarContainer.appendChild(button);
        });
    }

    function filterByCategory(clickedButton) {
        if (!clickedButton) return;
        currentPage = 1;
        const filter = clickedButton.dataset.filter;
        catalogTitle.textContent = filter;
        catalogTitle.className = "text-2xl font-bold text-white mb-4"; // Đổi màu chữ tiêu đề
        searchInput.value = '';
        document.querySelectorAll('.category-link').forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        const uniqueProductNames = new Set();
        if (filter === 'Tất cả') {
            Object.values(allProducts).forEach(p => uniqueProductNames.add(p.name));
        } else {
            Object.values(allProducts).filter(p => p.category === filter).forEach(p => uniqueProductNames.add(p.name));
        }
        currentFullProductList = Array.from(uniqueProductNames).map(name => Object.values(allProducts).find(p => p.name === name));
        displayPaginatedProducts();
    }

    searchInput.addEventListener('input', (e) => {
        currentPage = 1;
        const searchTerm = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.category-link').forEach(btn => btn.classList.remove('active'));
        
        if (searchTerm.length > 1) {
            catalogTitle.textContent = `Kết quả cho "${searchTerm}"`;
            const uniqueProductNames = new Set();
            Object.values(allProducts).filter(p => p.displayName.toLowerCase().includes(searchTerm) || (p['Mã Quản Lý'] && p['Mã Quản Lý'].toLowerCase().includes(searchTerm))).forEach(p => uniqueProductNames.add(p.name));
            currentFullProductList = Array.from(uniqueProductNames).map(name => Object.values(allProducts).find(p => p.name === name));
        } else if (searchTerm.length === 0) {
            const allButton = document.querySelector('.category-link[data-filter="Tất cả"]');
            if (allButton) filterByCategory(allButton);
            return; // Tránh chạy displayPaginatedProducts 2 lần
        } else {
            currentFullProductList = [];
        }
        displayPaginatedProducts();
    });

    // KHỞI TẠO
    renderCategorySidebar();
    filterByCategory(document.querySelector('.category-link[data-filter="Tất cả"]'));
});