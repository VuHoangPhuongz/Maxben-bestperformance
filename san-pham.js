        document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('search-input'), categoryContainer = document.getElementById('category-filter-container'), sortBySelect = document.getElementById('sort-by'), productGrid = document.getElementById('product-grid'), productCount = document.getElementById('product-count'), paginationContainer = document.getElementById('pagination-container'), resetFiltersBtn = document.getElementById('reset-filters-btn'), productModal = document.getElementById('product-modal'), modalOverlay = document.getElementById('modal-overlay'), modalContainer = document.getElementById('modal-container'), modalContentArea = document.getElementById('modal-content-area'), modalCloseBtn = document.getElementById('modal-close-btn'), modalProductTitle = document.getElementById('modal-product-title'), mobileMenuButton = document.getElementById('mobile-menu-button'), mobileMenu = document.getElementById('mobile-menu'), powerSlider = document.getElementById('power-slider'), powerValue = document.getElementById('power-value'), criContainer = document.getElementById('cri-filter-container'), featureContainer = document.getElementById('feature-filter-container'), breadcrumbContainer = document.getElementById('breadcrumb-container');
            let state = { searchTerm: '', categories: [], sortBy: 'default', currentPage: 1, itemsPerPage: 12, powerMax: 200, cris: [], features: [] };
            const debounce = (func, delay) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => func.apply(this, args), delay); }; };
            const parsePrice = (str) => !str || typeof str !== 'string' ? 0 : parseInt(str.replace(/\D/g, ''), 10) || 0;
            const parsePower = (str) => { if (!str || typeof str !== 'string') return 0; const m = str.match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[0]) : 0; }

            function applyFiltersAndSort() {
                let filtered = Object.values(allProducts);
                if (state.searchTerm) { const term = state.searchTerm.toLowerCase().trim(); filtered = filtered.filter(p => p.displayName.toLowerCase().includes(term)); }
                if (state.categories.length > 0) { filtered = filtered.filter(p => state.categories.includes(p.category)); }
                if (state.powerMax < 200) { filtered = filtered.filter(p => parsePower(p.power) <= state.powerMax); }
                if (state.cris.length > 0) { filtered = filtered.filter(p => { const match = (p.features || '').match(/CRI\s*>\s*(\d+)/); const cri = match ? parseInt(match[1], 10) : 0; return state.cris.some(filterCri => cri >= parseInt(filterCri, 10)); }); }
                if (state.features.length > 0) { filtered = filtered.filter(p => { const text = ((p.features || '') + p.name).toLowerCase(); return state.features.every(feat => text.includes(feat)); }); }
                switch (state.sortBy) {
                    case 'price-asc': filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); break;
                    case 'price-desc': filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); break;
                    case 'name-asc': filtered.sort((a, b) => a.displayName.localeCompare(b.displayName, 'vi')); break;
                }
                return filtered;
            }

            function renderProducts() {
                renderBreadcrumb();
                const filteredAndSorted = applyFiltersAndSort();
                productCount.textContent = `Hiển thị ${filteredAndSorted.length} kết quả`;
                const paginatedProducts = filteredAndSorted.slice((state.currentPage - 1) * state.itemsPerPage, state.currentPage * state.itemsPerPage);
                productGrid.innerHTML = paginatedProducts.length === 0 ? `<div class="col-span-full text-center py-10"><p class="text-xl text-gray-400">Không tìm thấy sản phẩm nào.</p></div>` : paginatedProducts.map(p => `<div class="product-card group" data-id="${p.id}"><div class="product-card-image"><img src="${p.image}" alt="${p.displayName}" loading="lazy" class="transition-transform duration-300 group-hover:scale-105" onerror="this.onerror=null; this.src='https://placehold.co/300x300/1f2937/4b5563?text=Ảnh lỗi';"></div><div class="p-4 flex flex-col flex-grow"><p class="text-xs text-blue-400 font-semibold mb-1 uppercase">${p.category}</p><h3 class="text-md font-bold text-white flex-grow">${p.displayName}</h3><div class="mt-4 flex justify-between items-center"><span class="text-lg font-bold text-amber-400">${p.price || 'Liên hệ'}</span><span class="text-sm text-gray-400">${p.power || ''}</span></div></div></div>`).join('');
                renderPagination(filteredAndSorted.length);
            }

            function renderPagination(totalItems) {
                const totalPages = Math.ceil(totalItems / state.itemsPerPage);
                paginationContainer.innerHTML = '';
                if (totalPages <= 1) return;
                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement('button');
                    btn.textContent = i;
                    btn.className = `w-10 h-10 rounded-md font-semibold border border-slate-700 transition-colors hover:bg-slate-700 ${i === state.currentPage ? 'pagination-btn active' : 'pagination-btn'}`;
                    btn.addEventListener('click', () => { state.currentPage = i; renderProducts(); productGrid.scrollIntoView({ behavior: 'smooth' }); });
                    paginationContainer.appendChild(btn);
                }
            }
            
            function openProductModal(productId) {
                const product = allProducts[productId];
                if (!product) return;
                const productVariants = Object.values(allProducts).filter(p => p.name === product.name && p.category === product.category);
                const relatedProducts = Object.values(allProducts).filter(p => p.category === product.category && p.name !== product.name).filter((p, i, self) => i === self.findIndex(t => t.name === p.name)).slice(0, 4);
                modalProductTitle.textContent = product.displayName;
                modalContentArea.innerHTML = `<div class="grid lg:grid-cols-5 gap-8"><div class="lg:col-span-2"><div class="bg-white rounded-lg p-2 mb-3"><img id="modalMainImage" src="${product.image}" alt="${product.displayName}" class="w-full h-auto object-contain rounded-md" onerror="this.onerror=null; this.src='https://placehold.co/400x400/1f2937/4b5563?text=Ảnh lỗi';"></div><div id="modalThumbnailGallery" class="grid grid-cols-4 gap-2">${(product.gallery || [product.image]).map((imgSrc, index) => `<img src="${imgSrc}" class="thumbnail w-full aspect-square object-cover cursor-pointer rounded-md border-2 bg-slate-700 ${index === 0 ? 'border-blue-500' : 'border-transparent'}" onerror="this.onerror=null; this.src='https://placehold.co/100x100/1f2937/4b5563?text=Lỗi';">`).join('')}</div></div><div class="lg:col-span-3"><h1 class="text-2xl font-bold text-white">${product.displayName}</h1><p class="text-xs text-gray-400 mt-1 mb-3">Mã SP: ${product['Mã Quản Lý'] || 'N/A'}</p><p class="text-3xl font-bold text-amber-400 mb-4">${product.price || "Liên hệ"}</p><div id="variant-selector" class="mb-4"><p class="font-semibold text-gray-300 mb-2">Chọn phiên bản:</p><div class="flex flex-wrap gap-2">${productVariants.map(variant => `<button class="variant-btn ${variant.id === product.id ? 'active' : ''}" data-id="${variant.id}">${variant.power}</button>`).join('')}</div></div><div class="mt-4 pt-4 border-t border-slate-700"><label class="block text-sm font-semibold text-gray-300 mb-2">Tính giá chiết khấu cho đại lý:</label><div class="flex items-center space-x-2"><input type="number" id="discount-percentage-input" placeholder="Nhập %" class="form-input flex-grow text-sm !py-2"><button id="calculate-discount-btn" class="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 text-sm">Tính Giá</button></div><div id="discounted-price-display" class="mt-2 text-md hidden bg-green-500/10 border border-green-500/30 rounded-md p-2 text-center"></div></div><div class="flex items-center space-x-4 border-t border-slate-700 py-3 my-4 text-xs"><span class="flex items-center"><i class="fas fa-check-circle mr-2 text-green-500"></i>Hàng chính hãng</span><span class="flex items-center"><i class="fas fa-shield-alt mr-2 text-blue-500"></i>Bảo hành 2-3 năm</span><span class="flex items-center"><i class="fas fa-medal mr-2 text-yellow-500"></i>Chất lượng cao</span></div><div class="flex flex-col sm:flex-row gap-3"><a href="tel:0886666730" class="w-full text-center bg-blue-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-blue-700"><i class="fas fa-phone-alt mr-2"></i> Tư Vấn Ngay</a><a href="https://zalo.me/0886666730" target="_blank" class="w-full text-center bg-slate-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-slate-700">Yêu Cầu Báo Giá</a></div></div></div><div class="mt-8 pt-6 border-t border-slate-700"><div class="border-b border-slate-700 mb-4"><nav class="flex space-x-6"><button data-tab="description" class="modal-tab-btn active">Mô tả chi tiết</button><button data-tab="specs" class="modal-tab-btn">Thông số kỹ thuật</button></nav></div><div id="modal-tab-content"><div id="description-content" class="text-gray-300 space-y-1 text-sm leading-relaxed prose prose-invert max-w-none"><ul>${(product.features || '').split('. ').filter(s => s.trim() !== '').map(s => `<li>${s.trim()}.</li>`).join('')}</ul></div><div id="specs-content" class="hidden text-sm"><table class="modal-specs-table w-full"><tbody><tr><td>Công suất</td><td>${product.power || 'N/A'}</td></tr><tr><td>Quang thông</td><td>${product.lumen || 'N/A'}</td></tr><tr><td>Nhiệt độ màu</td><td>${product.light || 'N/A'}</td></tr><tr><td>Kích thước</td><td>${product.dimensions_mm || 'N/A'}</td></tr><tr><td>Lỗ khoét</td><td>${product.cutout_mm || 'N/A'}</td></tr></tbody></table></div></div></div><div id="related-products-section" class="mt-8 pt-6 border-t border-slate-700"><h3 class="text-xl font-bold text-white mb-4">Sản phẩm tương tự</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4">${relatedProducts.map(rel => `<div class="product-card group" data-id="${rel.id}"><div class="product-card-image !p-2"><img src="${rel.image}" alt="${rel.displayName}" loading="lazy" class="group-hover:scale-105"></div><div class="p-2 text-center"><h4 class="text-xs font-semibold text-white leading-tight">${rel.displayName}</h4><p class="text-xs text-amber-400 mt-1">${rel.price}</p></div></div>`).join('')}</div></div>`;
                setupModalEventListeners(product);
                document.body.classList.add('modal-open'); productModal.classList.remove('hidden');
                setTimeout(() => { modalOverlay.classList.remove('opacity-0'); modalContainer.classList.remove('opacity-0', 'scale-95'); }, 10);
            }

            function setupModalEventListeners(currentProduct) {
                document.getElementById('modalThumbnailGallery').addEventListener('click', e => { if (e.target.tagName === 'IMG') { document.getElementById('modalMainImage').src = e.target.src; document.querySelectorAll('#modalThumbnailGallery .thumbnail').forEach(t => t.classList.replace('border-blue-500', 'border-transparent')); e.target.classList.replace('border-transparent', 'border-blue-500'); } });
                document.querySelectorAll('#variant-selector .variant-btn').forEach(btn => { btn.addEventListener('click', e => openProductModal(e.currentTarget.dataset.id)); });
                document.getElementById('calculate-discount-btn').addEventListener('click', () => { const display = document.getElementById('discounted-price-display'); const originalPrice = parsePrice(currentProduct.price); const percent = parseFloat(document.getElementById('discount-percentage-input').value); if (!originalPrice || isNaN(percent) || percent < 0 || percent > 100) { display.innerHTML = `<span class="text-red-400">Vui lòng nhập % hợp lệ.</span>`; } else { const newPrice = originalPrice * (1 - percent / 100); display.innerHTML = `Giá sau chiết khấu: <strong class="text-green-400 ml-2">${Math.round(newPrice).toLocaleString('vi-VN')} VNĐ</strong>`; } display.classList.remove('hidden'); });
                document.querySelectorAll('.modal-tab-btn').forEach(button => { button.addEventListener('click', () => { document.querySelectorAll('.modal-tab-btn').forEach(btn => btn.classList.remove('active')); button.classList.add('active'); document.getElementById('description-content').classList.toggle('hidden', button.dataset.tab !== 'description'); document.getElementById('specs-content').classList.toggle('hidden', button.dataset.tab !== 'specs'); }); });
                document.querySelectorAll('#related-products-section .product-card').forEach(card => { card.addEventListener('click', () => openProductModal(card.dataset.id)); });
            }

            function closeProductModal() { modalOverlay.classList.add('opacity-0'); modalContainer.classList.add('opacity-0', 'scale-95'); setTimeout(() => { productModal.classList.add('hidden'); document.body.classList.remove('modal-open'); }, 300); }
            
            function renderBreadcrumb() {
                if (!breadcrumbContainer) return;
                let html = '<a href="index.html" class="hover:text-white transition-colors">Trang chủ</a> <span class="mx-2 text-slate-500">/</span> ';
                if (!state.categories[0] && !state.searchTerm) { html += '<span class="font-semibold text-white">Sản Phẩm</span>'; } 
                else { html += '<a href="san-pham.html" class="hover:text-white transition-colors">Sản Phẩm</a>'; }
                if (state.categories[0]) { html += ` <span class="mx-2 text-slate-500">/</span> ${!state.searchTerm ? `<span class="font-semibold text-white">${state.categories[0]}</span>` : `<a href="san-pham.html?category=${encodeURIComponent(state.categories[0])}" class="hover:text-white transition-colors">${state.categories[0]}</a>`}`; }
                if (state.searchTerm) { html += ` <span class="mx-2 text-slate-500">/</span> <span class="font-semibold text-white">${state.searchTerm}</span>`; }
                breadcrumbContainer.innerHTML = html;
            }

            function populateMenus() {
                const gridContainer = document.getElementById('product-menu-grid');
                const menuStructure = { 'Đèn Trần & Tường': { categories: ['Đèn LED Âm Trần', 'Đèn LED Ốp Trần', 'Đèn Ống Bơ'] }, 'Đèn Tuýp & Dây LED': { categories: ['Đèn Tuýp LED', 'Dây LED'] }, 'Đèn Ngoài Trời & Chuyên Dụng': { categories: ['Đèn Pha LED', 'Đèn Năng Lượng Mặt Trời', 'Đèn high bay'] }, 'Quạt & Sản Phẩm Khác': { categories: ['Quạt Trần Đèn', 'Đèn LED Bulb', 'Đèn Pin'] } };
                gridContainer.innerHTML = Object.entries(menuStructure).map(([groupName, group]) => `<div><h3 class="product-group-title">${groupName}</h3><div class="space-y-4">${group.categories.map(catName => productDatabase[catName] && productDatabase[catName].length ? `<div><a href="san-pham.html?category=${encodeURIComponent(catName)}" class="category-title">${catName}</a><ul class="pl-2 mt-1 space-y-1 border-l border-slate-700">${productDatabase[catName].map(line => `<li><a href="san-pham.html?category=${encodeURIComponent(catName)}&productLine=${encodeURIComponent(line.name)}" class="product-line-link pl-2">&bull; ${line.name}</a></li>`).join('')}</ul></div>` : '').join('')}</div></div>`).join('');
                
                const row1 = document.getElementById('icon-menu-row-1'); const row2 = document.getElementById('icon-menu-row-2');
                const allCategories = Object.keys(productDatabase).filter(cat => productDatabase[cat] && productDatabase[cat].length > 0);
                const midPoint = 6;
                const categoriesRow1 = allCategories.slice(0, midPoint); const categoriesRow2 = allCategories.slice(midPoint);
                const categoryIconMap = {'Đèn LED Âm Trần': { icon: 'fa-cloud-arrow-down', text: 'Âm Trần' }, 'Đèn LED Ốp Trần': { icon: 'fa-border-all', text: 'Ốp Trần' }, 'Đèn Tuýp LED': { icon: 'fa-ruler-horizontal', text: 'Đèn Tuýp' },'Đèn LED Bulb': { icon: 'fa-lightbulb', text: 'Bóng Bulb'}, 'Đèn Pha LED': { icon: 'fa-bolt', text: 'Đèn Pha' }, 'Quạt Trần Đèn': { icon: 'fa-fan', text: 'Quạt Trần' }, 'Dây LED': { icon: 'fa-wave-square', text: 'Dây LED' }, 'Đèn Ống Bơ': { icon: 'fa-t', text: 'Ống Bơ'}, 'Đèn Năng Lượng Mặt Trời': {icon: 'fa-sun', text: 'NLMT'}, 'Đèn Pin': {icon: 'fa-flashlight', text: 'Đèn Pin'}, 'Đèn high bay': { icon: 'fa-industry', text: 'Highbay' }};
                
                const renderRow = (targetEl, categoryList) => {
                    categoryList.forEach(categoryName => {
                        const iconInfo = categoryIconMap[categoryName] || { icon: 'fa-circle-question', text: categoryName };
                        const groupEl = document.createElement('div'); groupEl.className = 'relative group';
                        let innerHTML = `<a href="san-pham.html?category=${encodeURIComponent(categoryName)}" class="icon-menu-item"><span class="icon-wrapper"><i class="fa-solid ${iconInfo.icon}"></i></span><span class="icon-text">${iconInfo.text}</span></a>`;
                        const productLines = productDatabase[categoryName];
                        if (productLines && productLines.length > 1) { innerHTML += `<div class="sub-dropdown-panel absolute top-full mt-2 left-1/2 -translate-x-1/2 z-40 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-2 min-w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"><ul>${productLines.map(line => `<li><a href="san-pham.html?category=${encodeURIComponent(categoryName)}&productLine=${encodeURIComponent(line.name)}">${line.name}</a></li>`).join('')}</ul></div>`; }
                        groupEl.innerHTML = innerHTML; targetEl.appendChild(groupEl);
                    });
                };
                renderRow(row1, categoriesRow1); renderRow(row2, categoriesRow2);
            }

            function populateMobileMenu() {
                const container = document.getElementById('mobile-product-menu-container'); if (!container) return;
                let menuHTML = `<div class="py-1"><div class="mobile-menu-item"><button class="mobile-menu-toggle flex justify-between items-center w-full py-2 text-left font-semibold text-white"><span>Sản phẩm</span><i class="fas fa-chevron-down text-xs mobile-menu-toggle-icon"></i></button><div class="mobile-submenu pl-2 border-l border-slate-700 space-y-1 mt-1 hidden">`;
                for (const categoryName in productDatabase) {
                    const productLines = productDatabase[categoryName];
                    if (productLines && productLines.length > 0) { menuHTML += `<a href="san-pham.html?category=${encodeURIComponent(categoryName)}" class="block py-2 text-gray-300 hover:text-white">${categoryName}</a>`; }
                }
                menuHTML += `</div></div></div>`; container.innerHTML = menuHTML;
                container.querySelector('.mobile-menu-toggle').addEventListener('click', (e) => { e.preventDefault(); const item = e.currentTarget.closest('.mobile-menu-item'); const submenu = item.querySelector('.mobile-submenu'); item.classList.toggle('open'); submenu.classList.toggle('hidden'); });
            }

            function populateFilters() {
                const createCheckbox = (id, val, lab) => `<div class="flex items-center"><input type="checkbox" id="${id}" value="${val}" class="filter-checkbox hidden"><label for="${id}" class="flex items-center cursor-pointer text-gray-300 hover:text-white"><span class="checkbox-icon w-5 h-5 mr-3 border-2 border-slate-600 rounded-md flex items-center justify-center"><svg class="w-3 h-3 text-white hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg></span><span class="text-sm">${lab}</span></label></div>`;
                categoryContainer.innerHTML = [...new Set(Object.values(allProducts).map(p => p.category))].sort().map(cat => createCheckbox(`cat-${cat.replace(/\s/g, '-')}`, cat, cat)).join('');
                criContainer.innerHTML = ['95', '90', '80'].map(cri => createCheckbox(`cri-${cri}`, cri, `CRI > ${cri}`)).join('');
                featureContainer.innerHTML = ['đổi màu', 'chống chói', 'năng lượng mặt trời', 'siêu mỏng', 'rgb'].map(feat => createCheckbox(`feat-${feat.replace(/\s/g, '-')}`, feat, feat.charAt(0).toUpperCase() + feat.slice(1))).join('');
            }
            
            function setupFilterListeners() {
                const debouncedRender = debounce(renderProducts, 300);
                searchInput.addEventListener('input', e => { state.currentPage = 1; state.searchTerm = e.target.value; debouncedRender(); });
                sortBySelect.addEventListener('change', e => { state.sortBy = e.target.value; renderProducts(); });
                powerSlider.addEventListener('input', e => { powerValue.textContent = e.target.value < 200 ? `${e.target.value}W` : '200W+'; });
                powerSlider.addEventListener('change', e => { state.powerMax = parseInt(e.target.value, 10); state.currentPage = 1; renderProducts(); });
                const setupCheckboxListeners = (container, stateKey) => { container.addEventListener('change', e => { if (e.target.type === 'checkbox') { state[stateKey] = [...container.querySelectorAll('input:checked')].map(cb => cb.value); state.currentPage = 1; renderProducts(); } }); };
                setupCheckboxListeners(categoryContainer, 'categories'); setupCheckboxListeners(criContainer, 'cris'); setupCheckboxListeners(featureContainer, 'features');
            }

            function initializeFiltersFromURL() {
                const params = new URLSearchParams(window.location.search);
                const category = params.get('category'); const productLine = params.get('productLine');
                if (productLine) { searchInput.value = decodeURIComponent(productLine); state.searchTerm = searchInput.value; }
                if (category) { state.categories = [decodeURIComponent(category)]; const checkbox = document.querySelector(`#category-filter-container input[value="${decodeURIComponent(category)}"]`); if (checkbox) checkbox.checked = true; }
            }

            function resetAllFilters() {
                searchInput.value = ''; sortBySelect.value = 'default'; powerSlider.value = 200; powerValue.textContent = '200W+';
                state = { ...state, searchTerm: '', categories: [], sortBy: 'default', currentPage: 1, powerMax: 200, cris: [], features: [] };
                [...document.querySelectorAll('.filter-checkbox:checked')].forEach(cb => cb.checked = false);
                renderProducts(); productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            resetFiltersBtn.addEventListener('click', resetAllFilters);
            document.getElementById('show-all-products-btn').addEventListener('click', (e) => { e.preventDefault(); resetAllFilters(); });
            productGrid.addEventListener('click', (e) => { const card = e.target.closest('.product-card'); if (card && card.dataset.id) openProductModal(card.dataset.id); });
            modalCloseBtn.addEventListener('click', closeProductModal);
            modalOverlay.addEventListener('click', closeProductModal);
            document.addEventListener('keydown', (e) => { if (e.key === "Escape" && !productModal.classList.contains('hidden')) closeProductModal(); });
            mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

            populateMenus(); populateMobileMenu(); populateFilters(); setupFilterListeners(); initializeFiltersFromURL(); renderProducts();
        });