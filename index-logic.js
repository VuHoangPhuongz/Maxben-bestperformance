document.addEventListener('DOMContentLoaded', () => {
     const mobileProductCategoriesList = document.getElementById('mobile-product-categories-list');
    const desktopProductDropdownMenu = document.getElementById('product-dropdown-menu'); // Desktop dropdown

    // ... (các hàm openProductModal, setupModalEventListeners, renderHomepageSections, v.v.) ...

    // Hàm để điền danh mục sản phẩm vào menu (cho cả desktop và mobile)
    function populateProductCategories() {
        if (typeof allProductsArray === 'undefined' || allProductsArray.length === 0) {
            console.warn("Không có dữ liệu sản phẩm để điền danh mục.");
            return;
        }

        const categories = [...new Set(allProductsArray.map(p => p.category))].sort(); // Lấy các danh mục duy nhất

        const categoryHtml = categories.map(cat => `
            <a href="san-pham.html?category=${encodeURIComponent(cat)}"
               class="block py-1 text-gray-400 hover:text-white text-sm whitespace-nowrap">
                ${cat}
            </a>
        `).join('');

        // Điền vào dropdown desktop
        if (desktopProductDropdownMenu) {
            desktopProductDropdownMenu.innerHTML = categoryHtml;
        }

        // Điền vào mobile menu
        if (mobileProductCategoriesList) {
            mobileProductCategoriesList.innerHTML = categoryHtml;
        }
    }

    // --- DOM ELEMENTS ---
    const productShowcaseContainer = document.getElementById('homepage-product-showcase-content');
    const productModal = document.getElementById('product-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContainer = document.getElementById('modal-container');
    const modalContentArea = document.getElementById('modal-content-area');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalProductTitle = document.getElementById('modal-product-title');

    // --- DATA PREPARATION ---
    if (typeof allProducts === 'undefined' || Object.keys(allProducts).length === 0) {
        console.error("Lỗi: Dữ liệu `allProducts` không tồn tại hoặc rỗng. Hãy đảm bảo file `product-details.js` được nạp đúng và hàm `processProductData()` đã chạy.");
        if(productShowcaseContainer) {
            productShowcaseContainer.innerHTML = '<div class="container mx-auto px-4"><p class="text-center text-red-500">Lỗi: Không thể tải dữ liệu sản phẩm. Vui lòng kiểm tra console.</p></div>';
        }
        return;
    }
    const allProductsArray = Object.values(allProducts);

    // --- HELPER FUNCTIONS ---
    const parsePrice = (str) => !str || typeof str !== 'string' ? 0 : parseInt(str.replace(/\D/g, ''), 10) || 0;

    // --- RENDERING LOGIC (Phần này không thay đổi so với lần cuối bạn cập nhật) ---
function renderHomepageSections() {
    const productShowcaseContainer = document.getElementById('homepage-product-showcase-content');

    if (!productShowcaseContainer) {
        console.error("Lỗi: Không tìm thấy element #homepage-product-showcase-content trong HTML.");
        return;
    }

    const categoriesToShow = [
        "Đèn LED Âm Trần",
        "Đèn LED Ốp Trần",
        "Đèn Tuýp LED",
        "Đèn Pha LED",
        "Đèn LED Bulb",
        "Dây LED",
        "Quạt Trần Đèn"
    ];

    let finalHtml = '<div class="space-y-16">';

    categoriesToShow.forEach(category => {
        const allProductsInCurrentCategory = allProductsArray.filter(p => p.category === category);

        if (allProductsInCurrentCategory.length === 0) return;

        let productsToDisplayInThisCategory = [];
        const processedProductIds = new Set(); // Dùng để theo dõi ID sản phẩm đã được thêm vào

        // Giai đoạn 1: Ưu tiên lấy các sản phẩm có tên (loại) duy nhất
        const uniqueProductNames = [...new Set(allProductsInCurrentCategory.map(p => p.name))];
        const maxUniqueNamesToSelect = 5; // Bạn có thể điều chỉnh số này
        const selectedUniqueNames = uniqueProductNames.slice(0, maxUniqueNamesToSelect);

        selectedUniqueNames.forEach(name => {
            // Tìm sản phẩm ĐẦU TIÊN với tên duy nhất này mà chưa được thêm vào
            const product = allProductsInCurrentCategory.find(p => p.name === name && !processedProductIds.has(p.id));
            if (product) {
                productsToDisplayInThisCategory.push(product);
                processedProductIds.add(product.id);
            }
        });

        // Giai đoạn 2: Nếu chưa đủ 5 sản phẩm, thêm các sản phẩm khác từ danh mục
        // Điều này sẽ chọn các biến thể khác (có thể có công suất khác) hoặc các sản phẩm khác còn lại
        let productsAddedCount = productsToDisplayInThisCategory.length;
        if (productsAddedCount < 5) {
            for (let i = 0; i < allProductsInCurrentCategory.length && productsAddedCount < 5; i++) {
                const product = allProductsInCurrentCategory[i];
                if (!processedProductIds.has(product.id)) { // Chỉ thêm nếu sản phẩm này chưa được thêm
                    productsToDisplayInThisCategory.push(product);
                    processedProductIds.add(product.id);
                    productsAddedCount++;
                }
            }
        }

        // Nếu sau tất cả các bước lọc vẫn không có sản phẩm để hiển thị, bỏ qua danh mục này
        if (productsToDisplayInThisCategory.length === 0) return;

        // Bắt đầu phần HTML cho từng danh mục con
        finalHtml += `
            <div>
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl md:text-3xl font-bold text-white">${category.toUpperCase()}</h2>
                    <a href="san-pham.html?category=${encodeURIComponent(category)}" class="text-sky-400 font-semibold hover:text-sky-300 transition-colors text-sm">
                        Xem tất cả &rarr;
                    </a>
                </div>
                <div class="w-full h-px bg-slate-700 mb-6">
                     <div class="w-28 h-px bg-sky-500"></div>
                </div>
                <div class="product-showcase-row flex gap-4 overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
 `;

        // Lặp qua các sản phẩm đã chọn và thêm vào HTML
        productsToDisplayInThisCategory.forEach(product => {
            finalHtml += `
                <div class="product-showcase-card group cursor-pointer bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 flex flex-col" data-id="${product.id}">
                    <div class="product-showcase-image-wrapper relative w-full pt-[100%] overflow-hidden bg-white flex items-center justify-center p-2">
                        <img src="${product.image}" alt="${product.displayName}" class="absolute top-0 left-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/300x300/e5e7eb/9ca3af?text=Image+Error';">
                        <div class="absolute bottom-2 left-2 flex items-center bg-black/70 text-white text-[0.6rem] px-2 py-1 rounded-full pointer-events-none">
                            <img src="/path/to/your/maxben-logo.png" alt="Maxben Logo" class="w-3 h-3 mr-1"> MAXBEN
                        </div>
                    </div>
                    <div class="p-3 bg-slate-900 border-t border-slate-700 text-left flex-grow flex flex-col">
                        <p class="text-xs text-sky-400 font-semibold uppercase flex-shrink-0">${product.category}</p>
                        <h3 class="font-bold text-white mt-1 text-sm leading-snug flex-grow">${product.displayName}</h3>
                        <div class="flex justify-between items-center mt-2 flex-shrink-0">
                            <span class="text-md font-bold text-amber-400">${product.price || 'Liên hệ'}</span>
                            <span class="text-xs text-gray-400">${product.power || ''} ${product.light || ''}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        finalHtml += `</div></div>`;
    });

    finalHtml += '</div>';
    productShowcaseContainer.innerHTML = finalHtml;
    console.log("Render homepage sections... COMPLETED.");
}

    // --- MODAL LOGIC (Updated to match the image) ---
    function openProductModal(productId) {
        const product = allProducts[productId];
        if (!product) {
            console.error("Could not open modal. Product not found with ID:", productId);
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
                    <div id="modalThumbnailGallery" class="grid grid-cols-4 gap-2">${(product.gallery || [product.image]).map((img, i) => `<img src="${img}" class="thumbnail w-full aspect-square object-cover cursor-pointer rounded-md border-2 bg-slate-700 ${i === 0 ? 'active' : 'border-transparent'}">`).join('')}</div>
                </div>
                <div class="lg:col-span-3">
                    <h1 class="text-2xl font-bold text-white">${product.displayName}</h1>
                    <p class="text-xs text-gray-400 mt-1 mb-3">Mã SP: ${product['Mã Quản Lý'] || 'N/A'}</p>
                    <p class="text-3xl font-bold text-amber-400 mb-4">${product.price || "Liên hệ"}</p>

                    <div id="variant-selector" class="mb-4">
                        <p class="font-semibold text-gray-300 mb-2">Chọn phiên bản:</p>
                        <div class="flex flex-wrap gap-2">
                            ${productVariants.map(v => `<button class="variant-btn px-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-200 text-sm" data-id="${v.id}">${v.power} (${v.light})</button>`).join('')}
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
                    <div id="description-content" class="text-gray-300 space-y-1 text-sm leading-relaxed prose max-w-none">
                        <ul>${(product.features || '').split('.').filter(s => s.trim() !== '').map(s => `<li>${s.trim()}.</li>`).join('')}</ul>
                    </div>
                    <div id="specs-content" class="hidden text-sm">
                        <table class="modal-specs-table"><tbody>
                            <tr><td>Công suất</td><td>${product.power || 'N/A'}</td></tr>
                            <tr><td>Quang thông</td><td>${product.lumen || 'N/A'}</td></tr>
                            <tr><td>Nhiệt độ màu</td><td>${product.light || 'N/A'}</td></tr>
                            <tr><td>Kích thước</td><td>${product.dimensions_mm || product.kích_thước || 'N/A'}</td></tr>
                            <tr><td>Lỗ khoét</td><td>${product.cutout_mm || product.cắt_lỗ || 'N/A'}</td></tr>
                            <tr><td>Điện áp</td><td>${product['Điện áp'] || 'N/A'}</td></tr>
                        </tbody></table>
                    </div>
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
                                <h4 class="font-bold text-white mt-1 text-sm leading-snug flex-grow">${rel.displayName}</h4>
                                <div class="flex justify-between items-center mt-2 flex-shrink-0">
                                    <span class="text-md font-bold text-amber-400">${rel.price || 'Liên hệ'}</span>
                                    <span class="text-xs text-gray-400">${rel.power || ''} ${rel.light || ''}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>`; // Close of modalContentArea.innerHTML backtick

        setupModalEventListeners(product);
        document.body.classList.add('modal-open');
        productModal.classList.remove('hidden');
        setTimeout(() => { modalOverlay.classList.remove('opacity-0'); modalContainer.classList.remove('opacity-0', 'scale-95'); }, 10);
    }

    function setupModalEventListeners(currentProduct) {
        // Thumbnail click
        const modalThumbnailGallery = document.getElementById('modalThumbnailGallery');
        if (modalThumbnailGallery) { // Ensure element exists
             modalThumbnailGallery.addEventListener('click', e => {
                 if(e.target.tagName === 'IMG') {
                     document.getElementById('modalMainImage').src = e.target.src;
                     modalThumbnailGallery.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                     e.target.classList.add('active');
                 }
             });
        }

        // Variant button click
        // Updated to use the correct class `variant-btn` and scoped to modalContentArea
        if (modalContentArea) { // Ensure modalContentArea exists
            modalContentArea.querySelectorAll('#variant-selector .variant-btn').forEach(btn => {
                if(btn.dataset.id === currentProduct.id) btn.classList.add('active');
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    openProductModal(e.currentTarget.dataset.id);
                });
            });
        }


        // Discount calculator
        const discountInput = document.getElementById('discount-percentage-input');
        const calculateBtn = document.getElementById('calculate-discount-btn');
        const discountedPriceDisplay = document.getElementById('discounted-price-display');
        if(calculateBtn) { // Check if button exists on the page
            calculateBtn.addEventListener('click', () => {
                const originalPrice = parsePrice(currentProduct.price);
                const discountPercent = parseFloat(discountInput.value);
                if (!originalPrice || isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) { // Added validation
                    discountedPriceDisplay.innerHTML = `<span class="text-red-400">Vui lòng nhập % hợp lệ.</span>`;
                } else {
                    const newPrice = originalPrice * (1 - discountPercent / 100);
                    discountedPriceDisplay.innerHTML = `Giá sau chiết khấu: <strong class="text-green-400 ml-2">${Math.round(newPrice).toLocaleString('vi-VN')} VNĐ</strong>`;
                }
                discountedPriceDisplay.classList.remove('hidden');
            });
        }

        // Tab switching
        // Scoped to modalContentArea
        if (modalContentArea) { // Ensure modalContentArea exists
            modalContentArea.querySelectorAll('#modal-tab-buttons .modal-tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                     modalContentArea.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
                     e.currentTarget.classList.add('active');
                     modalContentArea.querySelector('#description-content').classList.toggle('hidden', e.currentTarget.dataset.tab !== 'description');
                     modalContentArea.querySelector('#specs-content').classList.toggle('hidden', e.currentTarget.dataset.tab !== 'specs');
                });
            });
        }


        // Related product click
        // Scoped to modalContentArea
        if (modalContentArea) { // Ensure modalContentArea exists
            modalContentArea.querySelectorAll('.product-showcase-card').forEach(card => { // Changed selector as discussed
                card.addEventListener('click', () => openProductModal(card.dataset.id));
            });
        }
    }

    function closeProductModal() {
        if(productModal) { // Check if modal element exists
            modalOverlay.classList.add('opacity-0');
            modalContainer.classList.add('opacity-0', 'scale-95');
            setTimeout(() => { productModal.classList.add('hidden'); document.body.classList.remove('modal-open'); }, 300);
        }
    }

    // --- INITIALIZATION & EVENT LISTENERS ---
    function init() {
        renderHomepageSections();
         populateProductCategories();

        if (productShowcaseContainer) { // Check if element exists
            productShowcaseContainer.addEventListener('click', (e) => {
                const card = e.target.closest('.product-showcase-card');
                if (card && card.dataset.id) {
                    openProductModal(card.dataset.id);
                }
            });
        }

        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal); // Check if button exists
        if (modalOverlay) modalOverlay.addEventListener('click', closeProductModal); // Check if overlay exists
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && productModal && !productModal.classList.contains('hidden')) { // Check if modal exists
                closeProductModal();
            }
        });

        if (typeof Swiper !== 'undefined') {
            new Swiper('.swiper', { loop: true, effect: 'fade', autoplay: { delay: 5000, disableOnInteraction: false }, pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } });
        }
    }

    init();
});