// File: main-app.js

document.addEventListener('DOMContentLoaded', () => {
    // --- GLOBAL DOM ELEMENTS (Có thể có trên cả hai trang) ---
    // Các element liên quan đến Modal (có trên cả index.html và san-pham.html)
    const productModal = document.getElementById('product-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContainer = document.getElementById('modal-container');
    const modalContentArea = document.getElementById('modal-content-area');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalProductTitle = document.getElementById('modal-product-title');

    // Dữ liệu sản phẩm (phải được load trước từ product-details.js)
    if (typeof allProducts === 'undefined' || Object.keys(allProducts).length === 0) {
        console.error("Lỗi: Dữ liệu `allProducts` không tồn tại hoặc rỗng. Hãy đảm bảo file `product-details.js` được nạp đúng.");
        // Hiển thị lỗi trên trang nếu cần
        const homepageContainer = document.getElementById('homepage-product-showcase');
        const productGrid = document.getElementById('product-grid'); // Cho trang san-pham.html
        if (homepageContainer) homepageContainer.innerHTML = '<div class="container mx-auto px-4"><p class="text-center text-red-500">Lỗi: Không thể tải dữ liệu sản phẩm.</p></div>';
        if (productGrid) productGrid.innerHTML = `<div class="col-span-full text-center py-10"><i class="fas fa-box-open text-5xl text-slate-700 mb-4"></i><p class="text-xl text-gray-400">Lỗi: Không thể tải dữ liệu sản phẩm.</p></div>`;
        return;
    }
    const allProductsArray = Object.values(allProducts);

    // --- HELPER FUNCTIONS (Dùng chung) ---
    const debounce = (func, delay) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => func.apply(this, args), delay); }; };
    const parsePrice = (str) => !str || typeof str !== 'string' ? 0 : parseInt(str.replace(/\D/g, ''), 10) || 0;
    const parsePower = (str) => { if (!str || typeof str !== 'string') return 0; const m = str.match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[0]) : 0; }
    function createCheckbox(id, value, label) { return `<div class="flex items-center"><input type="checkbox" id="${id}" value="${value}" class="filter-checkbox hidden"><label for="${id}" class="flex items-center cursor-pointer text-gray-300 hover:text-white transition-colors"><span class="checkbox-icon w-5 h-5 mr-3 border-2 border-slate-600 rounded-md flex items-center justify-center transition-all flex-shrink-0"><svg class="w-3 h-3 text-white hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></span><span class="text-sm">${label}</span></label></div>`; }


    // ==========================================================
    // === MODAL LOGIC (Hàm chung cho cả hai trang) ===
    // ==========================================================
    function openProductModal(productId) {
        const product = allProducts[productId];
        if (!product) {
            console.error("Không tìm thấy sản phẩm với ID:", productId);
            return;
        }

        const productVariants = allProductsArray.filter(p => p.name === product.name);
        const relatedProducts = allProductsArray.filter(p => p.category === product.category && p.name !== product.name)
            .filter((p, i, self) => i === self.findIndex(t => t.name === p.name))
            .slice(0, 4);

        modalProductTitle.textContent = product.displayName;
        modalContentArea.innerHTML = `
            <div class="grid lg:grid-cols-5 gap-8">
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg p-2 mb-3"><img id="modalMainImage" src="${product.image}" alt="${product.displayName}" class="w-full h-auto object-contain rounded-md"></div>
                    <div id="modalThumbnailGallery" class="grid grid-cols-4 gap-2">
                        ${(product.gallery || [product.image]).map((imgSrc, index) => `
                            <img src="${imgSrc}" class="thumbnail w-full aspect-square object-cover cursor-pointer rounded-md border-2 bg-slate-700 ${index === 0 ? 'active' : 'border-transparent'}">
                        `).join('')}
                    </div>
                </div>

                <div class="lg:col-span-3">
                    <h1 class="text-2xl font-bold text-white">${product.displayName}</h1>
                    <p class="text-xs text-gray-400 mt-1 mb-3">Mã SP: ${product['Mã Quản Lý'] || 'N/A'}</p>
                    <p class="text-3xl font-bold text-amber-400 mb-4">${product.price || "Liên hệ"}</p>

                    <div id="variant-selector" class="mb-4">
                        <p class="font-semibold text-gray-300 mb-2">Chọn phiên bản:</p>
                        <div class="flex flex-wrap gap-2">
                            ${productVariants.map(variant => `
                                <button class="variant-btn px-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-200 text-sm" data-id="${variant.id}">${variant.power} (${variant.light})</button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="mt-4 pt-4 border-t border-slate-700">
                        <label class="block text-sm font-semibold text-gray-300 mb-2">Tính giá chiết khấu cho đại lý:</label>
                        <div class="flex items-center space-x-2">
                            <input type="number" id="discount-percentage-input" placeholder="Nhập %" class="flex-grow text-sm py-2 px-3 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
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

            <div class="mt-8 pt-6 border-t border-slate-700">
                <div class="border-b border-slate-700 mb-4">
                    <nav id="modal-tab-buttons" class="flex space-x-6">
                        <button data-tab="description" class="modal-tab-btn px-4 py-2 text-sm font-semibold text-gray-300 border-b-2 border-transparent hover:border-blue-500 hover:text-white transition-all duration-200 active">Mô tả chi tiết</button>
                        <button data-tab="specs" class="modal-tab-btn px-4 py-2 text-sm font-semibold text-gray-300 border-b-2 border-transparent hover:border-blue-500 hover:text-white transition-all duration-200">Thông số kỹ thuật</button>
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

            <div id="related-products-section" class="mt-8 pt-6 border-t border-slate-700">
                <h3 class="text-xl font-bold text-white mb-4">Sản phẩm tương tự</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${relatedProducts.map(rel => `
                        <div class="product-showcase-card group cursor-pointer bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 flex flex-col" data-id="${rel.id}">
                            <div class="product-showcase-image-wrapper relative w-full pt-[100%] overflow-hidden bg-white flex items-center justify-center p-2">
                                <img src="${rel.image}" alt="${rel.displayName}" class="absolute top-0 left-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-300">
                                <div class="absolute bottom-2 left-2 flex items-center bg-black/70 text-white text-[0.6rem] px-2 py-1 rounded-full pointer-events-none">
                                    <img src="/path/to/your/maxben-logo.png" alt="Maxben Logo" class="w-3 h-3 mr-1"> MAXBEN
                                </div>
                            </div>
                            <div class="p-3 bg-slate-900 border-t border-slate-700 text-left flex flex-col flex-grow">
                                <p class="text-xs text-sky-400 font-semibold uppercase flex-shrink-0">${rel.category || 'Sản phẩm'}</p>
                                <h3 class="font-bold text-white mt-1 text-sm leading-snug flex-grow">${rel.displayName}</h3>
                                <div class="flex justify-between items-center mt-2 flex-shrink-0">
                                    <span class="text-md font-bold text-amber-400">${rel.price || 'Liên hệ'}</span>
                                    <span class="text-xs text-gray-400">${rel.power || ''} ${rel.light || ''}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        setupModalEventListeners(product);
        document.body.classList.add('modal-open');
        productModal.classList.remove('hidden');
        setTimeout(() => { modalOverlay.classList.remove('opacity-0'); modalContainer.classList.remove('opacity-0', 'scale-95'); }, 10);
    }

    function setupModalEventListeners(currentProduct) {
        // Thumbnail click
        const modalThumbnailGallery = modalContentArea.querySelector('#modalThumbnailGallery');
        if (modalThumbnailGallery) {
            modalThumbnailGallery.addEventListener('click', e => {
                if (e.target.tagName === 'IMG') {
                    modalContentArea.querySelector('#modalMainImage').src = e.target.src;
                    modalThumbnailGallery.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                }
            });
        }

        // Variant button click
        // Sử dụng modalContentArea.querySelectorAll để giới hạn scope tìm kiếm
        modalContentArea.querySelectorAll('#variant-selector .variant-btn').forEach(btn => { // Changed .product-link to .variant-btn
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
        if (calculateBtn) { // Kiểm tra sự tồn tại của nút
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
        }


        // Tab switching
        const tabButtons = modalContentArea.querySelectorAll('.modal-tab-btn'); // Giới hạn scope tìm kiếm
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                modalContentArea.querySelector('#description-content').classList.toggle('hidden', button.dataset.tab !== 'description');
                modalContentArea.querySelector('#specs-content').classList.toggle('hidden', button.dataset.tab !== 'specs');
            });
        });

        // Related product click
        modalContentArea.querySelectorAll('#related-products-section .product-showcase-card').forEach(card => { // Changed .product-card to .product-showcase-card and used modalContentArea
            card.addEventListener('click', () => openProductModal(card.dataset.id));
        });
    }

    function closeProductModal() {
        if (productModal) { // Đảm bảo modal tồn tại trước khi thao tác
            modalOverlay.classList.add('opacity-0');
            modalContainer.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                productModal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            }, 300);
        }
    }


    // ==========================================================
    // === PAGE-SPECIFIC LOGIC (Chạy tùy theo trang) ===
    // ==========================================================

    // Logic cho trang chủ (index.html)
    function initHomepage() {
        const productShowcaseContainer = document.getElementById('homepage-product-showcase');
        if (productShowcaseContainer) { // Chỉ chạy nếu element này tồn tại
            renderHomepageSections();

            // Event delegation cho homepage product showcase
            productShowcaseContainer.addEventListener('click', (e) => {
                const card = e.target.closest('.product-showcase-card');
                if (card && card.dataset.id) {
                    openProductModal(card.dataset.id);
                }
            });

            // Swiper (nếu có trên trang chủ)
            if (typeof Swiper !== 'undefined') {
                new Swiper('.swiper', { loop: true, effect: 'fade', autoplay: { delay: 5000, disableOnInteraction: false }, pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } });
            }
        }
    }

    // Logic cho trang sản phẩm (san-pham.html)
    let state = {
        searchTerm: '', categories: [], powerMax: 500, cris: [], features: [],
        sortBy: 'default', currentPage: 1, itemsPerPage: 12,
    }; // Khởi tạo state cho trang sản phẩm

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

    function renderProducts() {
        const productGrid = document.getElementById('product-grid'); // Lấy lại DOM element cho trang sản phẩm
        const productCount = document.getElementById('product-count');
        const paginationContainer = document.getElementById('pagination-container');

        if (!productGrid || !productCount || !paginationContainer) return; // Chỉ chạy nếu các element này tồn tại

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
                // Sử dụng cùng một cấu trúc card với homepage showcase
                card.className = 'product-showcase-card group cursor-pointer bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 flex flex-col';
                card.setAttribute('data-id', p.id);
                card.innerHTML = `
                    <div class="product-showcase-image-wrapper relative w-full pt-[100%] overflow-hidden bg-white flex items-center justify-center p-2">
                        <img src="${p.image}" alt="${p.displayName}" class="absolute top-0 left-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/300x300/1f2937/4b5563?text=Image+Error';">
                        <div class="absolute bottom-2 left-2 flex items-center bg-black/70 text-white text-[0.6rem] px-2 py-1 rounded-full pointer-events-none">
                            <img src="/path/to/your/maxben-logo.png" alt="Maxben Logo" class="w-3 h-3 mr-1"> MAXBEN
                        </div>
                    </div>
                    <div class="p-3 bg-slate-900 border-t border-slate-700 text-left flex flex-col flex-grow">
                        <p class="text-xs text-sky-400 font-semibold uppercase flex-shrink-0">${p.category}</p>
                        <h3 class="font-bold text-white mt-1 text-sm leading-snug flex-grow">${p.displayName}</h3>
                        <div class="flex justify-between items-center mt-2 flex-shrink-0">
                            <span class="text-md font-bold text-amber-400">${p.price || 'Liên hệ'}</span>
                            <span class="text-xs text-gray-400">${p.power || ''} ${p.light || ''}</span>
                        </div>
                    </div>
                `;
                productGrid.appendChild(card);
            });
        }
        renderPagination(filteredAndSorted.length);
    }

    function renderPagination(totalItems) {
        const paginationContainer = document.getElementById('pagination-container');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(totalItems / state.itemsPerPage);
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = 'pagination-btn w-10 h-10 rounded-md font-semibold border border-slate-700 transition-colors hover:bg-slate-700';
            if (i === state.currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => { state.currentPage = i; renderProducts(); window.scrollTo({ top: document.getElementById('product-grid').offsetTop - 100, behavior: 'smooth' }); });
            paginationContainer.appendChild(btn);
        }
    }

    function initProductPage() {
        // Elements cụ thể của trang sản phẩm
        const searchInput = document.getElementById('search-input');
        const categoryContainer = document.getElementById('category-filter-container');
        const powerSlider = document.getElementById('power-slider');
        const powerValue = document.getElementById('power-value');
        const criContainer = document.getElementById('cri-filter-container');
        const featureContainer = document.getElementById('feature-filter-container');
        const sortBySelect = document.getElementById('sort-by');
        const resetFiltersBtn = document.getElementById('reset-filters-btn');
        const mobileFilterBtn = document.getElementById('mobile-filter-btn');
        const closeFilterBtn = document.getElementById('close-filter-btn');
        const filterSidebar = document.getElementById('filter-sidebar');
        const mobileFilterOverlay = document.getElementById('mobile-filter-overlay');
        const productGrid = document.getElementById('product-grid'); // Lấy lại DOM element
        const productCount = document.getElementById('product-count'); // Lấy lại DOM element
        const paginationContainer = document.getElementById('pagination-container'); // Lấy lại DOM element

        if (!productGrid) return; // Chỉ chạy nếu là trang sản phẩm

        // Populate filters
        populateFilters(categoryContainer, criContainer, featureContainer); // Truyền container vào
        initializeFiltersFromURL(categoryContainer); // Cập nhật tham số

        // Event Listeners cho bộ lọc
        const debouncedRender = debounce(renderProducts, 300);
        if (searchInput) searchInput.addEventListener('input', e => { state.currentPage = 1; state.searchTerm = e.target.value; debouncedRender(); });
        if (sortBySelect) sortBySelect.addEventListener('change', e => { state.sortBy = e.target.value; renderProducts(); });
        if (powerSlider) {
            powerSlider.addEventListener('input', e => { powerValue.textContent = e.target.value < 500 ? `${e.target.value}W` : '500W+'; });
            powerSlider.addEventListener('change', e => { state.powerMax = parseInt(e.target.value, 10); state.currentPage = 1; debouncedRender(); });
        }

        function setupCheckboxListeners(container, stateKey) {
            if (container) {
                container.addEventListener('change', e => {
                    if (e.target.type === 'checkbox') {
                        state[stateKey] = [...container.querySelectorAll('input:checked')].map(cb => cb.value);
                        state.currentPage = 1;
                        renderProducts();
                    }
                });
            }
        }
        setupCheckboxListeners(categoryContainer, 'categories');
        setupCheckboxListeners(criContainer, 'cris');
        setupCheckboxListeners(featureContainer, 'features');

        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', () => {
                state = { ...state, searchTerm: '', categories: [], powerMax: 500, cris: [], features: [], currentPage: 1, sortBy: 'default' };
                if (searchInput) searchInput.value = '';
                [...document.querySelectorAll('.filter-checkbox')].forEach(cb => cb.checked = false);
                if (powerSlider) powerSlider.value = 500;
                if (powerValue) powerValue.textContent = '500W+';
                if (sortBySelect) sortBySelect.value = 'default';
                renderProducts();
            });
        }

        // Mobile Filter UI
        if (mobileFilterBtn) mobileFilterBtn.addEventListener('click', () => { filterSidebar.classList.add('open'); mobileFilterOverlay.classList.remove('hidden'); });
        if (closeFilterBtn) closeFilterBtn.addEventListener('click', () => { filterSidebar.classList.remove('open'); mobileFilterOverlay.classList.add('hidden'); });
        if (mobileFilterOverlay) mobileFilterOverlay.addEventListener('click', () => { filterSidebar.classList.remove('open'); mobileFilterOverlay.classList.add('hidden'); });

        // Event delegation cho product grid (trang sản phẩm)
        if (productGrid) {
            productGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.product-showcase-card'); // Sử dụng product-showcase-card
                if (card && card.dataset.id) {
                    openProductModal(card.dataset.id);
                }
            });
        }

        renderProducts();
    }

    // Initial population for filters (common function, but needs containers)
    function populateFilters(categoryContainer, criContainer, featureContainer) {
        const categories = [...new Set(allProductsArray.map(p => p.category))].sort();
        if (categoryContainer) categoryContainer.innerHTML = categories.map(cat => createCheckbox(`cat-${cat.replace(/\s/g, '-')}`, cat, cat)).join('');
        if (criContainer) criContainer.innerHTML = ['95', '90', '80'].map(cri => createCheckbox(`cri-${cri}`, cri, `CRI > ${cri}`)).join('');
        const features = ['đổi màu', 'chống chói', 'năng lượng mặt trời', 'siêu mỏng', 'rgb'];
        if (featureContainer) featureContainer.innerHTML = features.map(feat => createCheckbox(`feat-${feat.replace(/\s/g, '-')}`, feat, feat.charAt(0).toUpperCase() + feat.slice(1))).join('');
    }

    function initializeFiltersFromURL(categoryContainer) { // Cập nhật tham số
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');

        if (categoryFromUrl && categoryContainer) { // Kiểm tra categoryContainer
            const decodedCategory = decodeURIComponent(categoryFromUrl);

            state.categories.push(decodedCategory);

            const checkbox = categoryContainer.querySelector(`input[value="${decodedCategory}"]`); // Giới hạn scope tìm kiếm
            if (checkbox) {
                checkbox.checked = true;
            }
        }
    }


    // --- GLOBAL INITIALIZATION (Chạy khi DOMContentLoaded) ---
    // Gán event listeners cho modal chung
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProductModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && productModal && !productModal.classList.contains('hidden')) {
            closeProductModal();
        }
    });

    // Kiểm tra trang hiện tại và chạy logic phù hợp
    if (document.getElementById('homepage-product-showcase')) { // Nếu đây là trang chủ
        initHomepage();
    }

    if (document.getElementById('product-grid')) { // Nếu đây là trang sản phẩm
        // Lấy lại các DOM elements cụ thể của trang sản phẩm
        const categoryContainer = document.getElementById('category-filter-container');
        const criContainer = document.getElementById('cri-filter-container');
        const featureContainer = document.getElementById('feature-filter-container');

        initProductPage(); // Khởi tạo logic trang sản phẩm
    }

});