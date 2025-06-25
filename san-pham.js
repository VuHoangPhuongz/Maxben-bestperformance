// File: san-pham.js (Upgraded with Advanced Modal)

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS (Không thay đổi) ---
    const searchInput = document.getElementById('search-input');
    const categoryContainer = document.getElementById('category-filter-container');
    const powerSlider = document.getElementById('power-slider');
    const powerValue = document.getElementById('power-value');
    const criContainer = document.getElementById('cri-filter-container');
    const featureContainer = document.getElementById('feature-filter-container');
    const sortBySelect = document.getElementById('sort-by');
    const productGrid = document.getElementById('product-grid');
    const productCount = document.getElementById('product-count');
    const paginationContainer = document.getElementById('pagination-container');
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    const mobileFilterBtn = document.getElementById('mobile-filter-btn');
    const closeFilterBtn = document.getElementById('close-filter-btn');
    const filterSidebar = document.getElementById('filter-sidebar');
    const mobileFilterOverlay = document.getElementById('mobile-filter-overlay');
    const productModal = document.getElementById('product-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContainer = document.getElementById('modal-container');
    const modalContentArea = document.getElementById('modal-content-area');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalProductTitle = document.getElementById('modal-product-title');
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    // --- APPLICATION STATE (Không thay đổi) ---
    let state = {
        searchTerm: '', categories: [], powerMax: 500, cris: [], features: [],
        sortBy: 'default', currentPage: 1, itemsPerPage: 12,
    };
 function initializeFilterFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');
        
        if (categoryFromUrl && categoryContainer) {
            const decodedCategory = decodeURIComponent(categoryFromUrl);
            state.category = decodedCategory;

            // Cập nhật giao diện bộ lọc
            document.querySelectorAll('.category-filter-item').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === decodedCategory);
            });
        }
    }
    // --- DATA PREPARATION (Không thay đổi) ---
    if (typeof allProducts === 'undefined') {
        console.error("Lỗi: Không tìm thấy dữ liệu `allProducts`.");
        return;
    }
    const allProductsArray = Object.values(allProducts);

    // --- HELPER FUNCTIONS (Không thay đổi) ---
    const debounce = (func, delay) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => func.apply(this, args), delay); }; };
    const parsePrice = (str) => !str || typeof str !== 'string' ? 0 : parseInt(str.replace(/\D/g, ''), 10) || 0;
    const parsePower = (str) => { if (!str || typeof str !== 'string') return 0; const m = str.match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[0]) : 0; }

    // --- FILTERING & SORTING LOGIC (Không thay đổi) ---
    function applyFiltersAndSort() {
        let filtered = [...allProductsArray];
        if (state.searchTerm) { const term = state.searchTerm.toLowerCase().trim(); filtered = filtered.filter(p => p.displayName.toLowerCase().includes(term) || p.category.toLowerCase().includes(term) || (p['Mã Quản Lý'] && p['Mã Quản Lý'].toLowerCase().includes(term))); }
        if (state.categories.length > 0) { filtered = filtered.filter(p => state.categories.includes(p.category)); }
        if (state.powerMax < 500) { filtered = filtered.filter(p => parsePower(p.power) <= state.powerMax); }
        if (state.cris.length > 0) { filtered = filtered.filter(p => { const match = (p.features || '').match(/CRI\s*>\s*(\d+)/); const cri = match ? parseInt(match[1]) : 0; return state.cris.some(filterCri => cri >= parseInt(filterCri)); }); }
        if (state.features.length > 0) { filtered = filtered.filter(p => { const text = ((p.features || '') + p.name).toLowerCase(); return state.features.every(feat => text.includes(feat)); }); }
        switch (state.sortBy) {
            case 'price-asc': filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); break;
            case 'price-desc': filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); break;
            case 'name-asc': filtered.sort((a, b) => a.displayName.localeCompare(b.displayName, 'vi')); break;
        }
        return filtered;
    }
 function initializeFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');
        
        if (categoryFromUrl) {
            const decodedCategory = decodeURIComponent(categoryFromUrl);
            
            // 1. Cập nhật state của ứng dụng để lọc theo category này
            state.categories.push(decodedCategory);

            // 2. Tìm checkbox tương ứng và tick vào nó
            const checkbox = document.querySelector(`#category-filter-container input[value="${decodedCategory}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        }
    }
    // --- RENDERING LOGIC (Không thay đổi) ---
    function renderProducts() {
        const filteredAndSorted = applyFiltersAndSort();
        productCount.textContent = `Hiển thị ${filteredAndSorted.length} kết quả`;
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const paginatedProducts = filteredAndSorted.slice(startIndex, endIndex);
        productGrid.innerHTML = '';
        if (paginatedProducts.length === 0) {
            productGrid.innerHTML = `<div class="col-span-full text-center py-10"><i class="fas fa-box-open text-5xl text-slate-700 mb-4"></i><p class="text-xl text-gray-400">Không tìm thấy sản phẩm nào phù hợp.</p></div>`;
        } else {
            paginatedProducts.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card group';
                card.setAttribute('data-id', p.id);
                card.innerHTML = `<div class="product-card-image"><img src="${p.image}" alt="${p.displayName}" loading="lazy" class="transition-transform duration-300 group-hover:scale-105" onerror="this.onerror=null; this.src='https://placehold.co/300x300/1f2937/4b5563?text=Ảnh lỗi';"></div><div class="p-4 flex flex-col flex-grow"><p class="text-xs text-blue-400 font-semibold mb-1 uppercase">${p.category}</p><h3 class="text-md font-bold text-white flex-grow">${p.displayName}</h3><div class="mt-4 flex justify-between items-center"><span class="text-lg font-bold text-amber-400">${p.price || 'Liên hệ'}</span><span class="text-gray-400 text-sm">${p.power}</span></div></div>`;
                productGrid.appendChild(card);
            });
        }
        renderPagination(filteredAndSorted.length);
    }
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / state.itemsPerPage);
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = 'pagination-btn w-10 h-10 rounded-md font-semibold border border-slate-700 transition-colors hover:bg-slate-700';
            if (i === state.currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => { state.currentPage = i; renderProducts(); window.scrollTo({ top: productGrid.offsetTop - 100, behavior: 'smooth' }); });
            paginationContainer.appendChild(btn);
        }
    }

    // ==========================================================
    // === MODAL LOGIC - PHẦN NÂNG CẤP CHÍNH ===
    // ==========================================================
    function openProductModal(productId) {
        const product = allProducts[productId];
        if (!product) {
            console.error("Không tìm thấy sản phẩm với ID:", productId);
            return;
        }

        // Tìm tất cả các phiên bản của cùng một dòng sản phẩm
        const productVariants = allProductsArray.filter(p => p.name === product.name);

        // Tìm các sản phẩm tương tự (cùng danh mục, khác dòng)
        const relatedProducts = allProductsArray.filter(p => p.category === product.category && p.name !== product.name)
            .filter((p, i, self) => i === self.findIndex(t => t.name === p.name)) // Lấy duy nhất mỗi dòng
            .slice(0, 4);

        // Render HTML cho modal
        modalProductTitle.textContent = product.displayName;
        modalContentArea.innerHTML = `
            <!-- Main Product Info -->
            <div class="grid lg:grid-cols-5 gap-8">
                <!-- Left Column: Image Gallery -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg p-2 mb-3"><img id="modalMainImage" src="${product.image}" alt="${product.displayName}" class="w-full h-auto object-contain rounded-md"></div>
                    <div id="modalThumbnailGallery" class="grid grid-cols-4 gap-2">
                        ${(product.gallery || [product.image]).map((imgSrc, index) => `
                            <img src="${imgSrc}" class="thumbnail w-full aspect-square object-cover cursor-pointer rounded-md border-2 bg-slate-700 ${index === 0 ? 'active' : 'border-transparent'}">
                        `).join('')}
                    </div>
                </div>

                <!-- Right Column: Details -->
                <div class="lg:col-span-3">
                    <h1 class="text-2xl font-bold text-white">${product.displayName}</h1>
                    <p class="text-xs text-gray-400 mt-1 mb-3">Mã SP: ${product['Mã Quản Lý'] || 'N/A'}</p>
                    <p class="text-3xl font-bold text-amber-400 mb-4">${product.price || "Liên hệ"}</p>
                    
                    <!-- Variant Selection -->
                    <div id="variant-selector" class="mb-4">
                        <p class="font-semibold text-gray-300 mb-2">Chọn phiên bản:</p>
                        <div class="flex flex-wrap gap-2">
                            ${productVariants.map(variant => `
                                <button class="variant-btn product-link" data-id="${variant.id}">${variant.power} (${variant.light})</button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Discount Calculator -->
                    <div class="mt-4 pt-4 border-t border-slate-700">
                        <label class="block text-sm font-semibold text-gray-300 mb-2">Tính giá chiết khấu cho đại lý:</label>
                        <div class="flex items-center space-x-2">
                            <input type="number" id="discount-percentage-input" placeholder="Nhập %" class="form-input flex-grow text-sm !py-2">
                            <button id="calculate-discount-btn" class="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 text-sm">Tính Giá</button>
                        </div>
                        <div id="discounted-price-display" class="mt-2 text-md hidden bg-green-500/10 border border-green-500/30 rounded-md p-2 text-center"></div>
                    </div>

                    <div class="flex items-center space-x-4 border-t border-slate-700 py-3 my-4 text-xs">
                        <span class="flex items-center"><i class="fas fa-check-circle mr-2 text-green-500"></i>Hàng chính hãng</span>
                        <span class="flex items-center"><i class="fas fa-shield-alt mr-2 text-blue-500"></i>Bảo hành 2-3 năm</span>
                        <span class="flex items-center"><i class="fas fa-medal mr-2 text-yellow-500"></i>Chất lượng cao</span>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-3">
                        <a href="tel:0886666730" class="w-full text-center bg-blue-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-700"><i class="fas fa-phone-alt mr-2"></i> Tư Vấn Ngay</a>
                        <a href="https://zalo.me/0886666730" target="_blank" class="w-full text-center bg-slate-600 text-white font-bold py-3 px-5 rounded-lg">Yêu Cầu Báo Giá</a>
                    </div>
                </div>
            </div>

            <!-- Tabs: Description & Specs -->
            <div class="mt-8 pt-6 border-t border-slate-700">
                <div class="border-b border-slate-700 mb-4">
                    <nav id="modal-tab-buttons" class="flex space-x-6">
                        <button data-tab="description" class="modal-tab-btn active">Mô tả chi tiết</button>
                        <button data-tab="specs" class="modal-tab-btn">Thông số kỹ thuật</button>
                    </nav>
                </div>
                <div id="modal-tab-content">
                    <div id="description-content" class="text-gray-300 space-y-1 text-sm leading-relaxed prose max-w-none"><ul>${(product.features || '').split('.').filter(s => s.trim() !== '').map(s => `<li>${s.trim()}.</li>`).join('')}</ul></div>
                    <div id="specs-content" class="hidden text-sm"><table class="modal-specs-table"><tbody>
                        <tr><td>Công suất</td><td>${product.power || 'N/A'}</td></tr>
                        <tr><td>Quang thông</td><td>${product.lumen || 'N/A'}</td></tr>
                        <tr><td>Nhiệt độ màu</td><td>${product.light || 'N/A'}</td></tr>
                        <tr><td>Kích thước</td><td>${product.dimensions_mm || product.kích_thước || 'N/A'}</td></tr>
                        <tr><td>Lỗ khoét</td><td>${product.cutout_mm || product.cắt_lỗ || 'N/A'}</td></tr>
                        <tr><td>Điện áp</td><td>${product['Điện áp'] || 'N/A'}</td></tr>
                    </tbody></table></div>
                </div>
            </div>

            <!-- Related Products -->
            <div id="related-products-section" class="mt-8 pt-6 border-t border-slate-700">
                <h3 class="text-xl font-bold text-white mb-4">Sản phẩm tương tự</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${relatedProducts.map(rel => `
                        <div class="product-card group" data-id="${rel.id}">
                            <div class="product-card-image !p-2"><img src="${rel.image}" alt="${rel.displayName}" loading="lazy" class="group-hover:scale-105"></div>
                            <div class="p-2 text-center"><h4 class="text-xs font-semibold text-white leading-tight">${rel.displayName}</h4><p class="text-xs text-amber-400 mt-1">${rel.price}</p></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Gắn sự kiện cho các element vừa tạo
        setupModalEventListeners(product);

        // Hiển thị modal
        document.body.classList.add('modal-open');
        productModal.classList.remove('hidden');
        setTimeout(() => {
            modalOverlay.classList.remove('opacity-0');
            modalContainer.classList.remove('opacity-0', 'scale-95');
        }, 10);
    }

    function setupModalEventListeners(currentProduct) {
        // Thumbnail click
        document.getElementById('modalThumbnailGallery').addEventListener('click', e => {
            if (e.target.tagName === 'IMG') {
                document.getElementById('modalMainImage').src = e.target.src;
                document.querySelectorAll('#modalThumbnailGallery .thumbnail').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            }
        });

        // Variant button click
        document.querySelectorAll('#variant-selector .product-link').forEach(btn => {
            if(btn.dataset.id === currentProduct.id) btn.classList.add('active'); // Highlight current variant
            btn.addEventListener('click', e => {
                e.preventDefault();
                openProductModal(e.currentTarget.dataset.id); // Re-render modal with new variant
            });
        });

        // Discount calculator
        const discountInput = document.getElementById('discount-percentage-input');
        const calculateBtn = document.getElementById('calculate-discount-btn');
        const discountedPriceDisplay = document.getElementById('discounted-price-display');
        calculateBtn.addEventListener('click', () => {
            const originalPrice = parsePrice(currentProduct.price);
            const discountPercent = parseFloat(discountInput.value);
            if (!originalPrice || isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) {
                discountedPriceDisplay.innerHTML = `<span class="text-red-400">Vui lòng nhập % hợp lệ.</span>`;
            } else {
                const newPrice = originalPrice * (1 - discountPercent / 100);
                discountedPriceDisplay.innerHTML = `Giá sau chiết khấu: <strong class="text-green-400 ml-2">${Math.round(newPrice).toLocaleString('vi-VN')} VNĐ</strong>`;
            }
            discountedPriceDisplay.classList.remove('hidden');
        });

        // Tab switching
        const tabButtons = document.querySelectorAll('.modal-tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                document.getElementById('description-content').classList.toggle('hidden', button.dataset.tab !== 'description');
                document.getElementById('specs-content').classList.toggle('hidden', button.dataset.tab !== 'specs');
            });
        });

        // Related product click
        document.querySelectorAll('#related-products-section .product-card').forEach(card => {
            card.addEventListener('click', () => openProductModal(card.dataset.id));
        });
    }

    function closeProductModal() {
        modalOverlay.classList.add('opacity-0');
        modalContainer.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            productModal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }, 300);
    }
    
    // --- FILTER UI INITIALIZATION (Không thay đổi) ---
    function createCheckbox(id, value, label) { return `<div class="flex items-center"><input type="checkbox" id="${id}" value="${value}" class="filter-checkbox hidden"><label for="${id}" class="flex items-center cursor-pointer text-gray-300 hover:text-white transition-colors"><span class="checkbox-icon w-5 h-5 mr-3 border-2 border-slate-600 rounded-md flex items-center justify-center transition-all flex-shrink-0"><svg class="w-3 h-3 text-white hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></span><span class="text-sm">${label}</span></label></div>`; }
    function populateFilters() {
        const categories = [...new Set(allProductsArray.map(p => p.category))].sort();
        categoryContainer.innerHTML = categories.map(cat => createCheckbox(`cat-${cat.replace(/\s/g, '-')}`, cat, cat)).join('');
        criContainer.innerHTML = ['95', '90', '80'].map(cri => createCheckbox(`cri-${cri}`, cri, `CRI > ${cri}`)).join('');
        const features = ['đổi màu', 'chống chói', 'năng lượng mặt trời', 'siêu mỏng', 'rgb'];
        featureContainer.innerHTML = features.map(feat => createCheckbox(`feat-${feat.replace(/\s/g, '-')}`, feat, feat.charAt(0).toUpperCase() + feat.slice(1))).join('');
    }

    // --- EVENT LISTENERS (Không thay đổi) ---
    const debouncedRender = debounce(renderProducts, 300);
    searchInput.addEventListener('input', e => { state.currentPage = 1; state.searchTerm = e.target.value; debouncedRender(); });
    sortBySelect.addEventListener('change', e => { state.sortBy = e.target.value; renderProducts(); });
    powerSlider.addEventListener('input', e => { powerValue.textContent = e.target.value < 500 ? `${e.target.value}W` : '500W+'; });
    powerSlider.addEventListener('change', e => { state.powerMax = parseInt(e.target.value, 10); state.currentPage = 1; debouncedRender(); });
    function setupCheckboxListeners(container, stateKey) { container.addEventListener('change', e => { if (e.target.type === 'checkbox') { state[stateKey] = [...container.querySelectorAll('input:checked')].map(cb => cb.value); state.currentPage = 1; renderProducts(); } }); }
    setupCheckboxListeners(categoryContainer, 'categories');
    setupCheckboxListeners(criContainer, 'cris');
    setupCheckboxListeners(featureContainer, 'features');
    resetFiltersBtn.addEventListener('click', () => { state = { ...state, searchTerm: '', categories: [], powerMax: 500, cris: [], features: [], currentPage: 1, sortBy: 'default' }; searchInput.value = ''; [...document.querySelectorAll('.filter-checkbox')].forEach(cb => cb.checked = false); powerSlider.value = 500; powerValue.textContent = '500W+'; sortBySelect.value = 'default'; renderProducts(); });
    mobileFilterBtn.addEventListener('click', () => { filterSidebar.classList.add('open'); mobileFilterOverlay.classList.remove('hidden'); });
    closeFilterBtn.addEventListener('click', () => { filterSidebar.classList.remove('open'); mobileFilterOverlay.classList.add('hidden'); });
    mobileFilterOverlay.addEventListener('click', () => { filterSidebar.classList.remove('open'); mobileFilterOverlay.classList.add('hidden'); });
    
    // Updated Modal Listeners
    productGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card && card.dataset.id) {
            openProductModal(card.dataset.id);
        }
    });
    modalCloseBtn.addEventListener('click', closeProductModal);
    modalOverlay.addEventListener('click', closeProductModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && !productModal.classList.contains('hidden')) {
            closeProductModal();
        }
    });

    // --- INITIALIZATION ---
    populateFilters();
      initializeFiltersFromURL();
    renderProducts();
});
