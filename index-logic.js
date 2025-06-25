// File: index-logic.js (Upgraded with new UI and bug fixes)

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const productShowcaseContainer = document.getElementById('homepage-product-showcase');
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

    // --- RENDERING LOGIC ---
    function renderHomepageSections() {
        if (!productShowcaseContainer) {
            console.error("Lỗi: Không tìm thấy element #homepage-product-showcase trong HTML.");
            return;
        }

        const categoriesToShow = ["Đèn LED Âm Trần", "Đèn LED Ốp Trần", "Đèn Tuýp LED", "Đèn Pha LED", "Đèn LED Bulb", "Dây LED", "Quạt Trần Đèn"];
        let finalHtml = '<div class="container mx-auto px-4 space-y-16">';

        categoriesToShow.forEach(category => {
            const productsInCategory = allProductsArray
                .filter(p => p.category === category)
                .slice(0, 4); // Cập nhật: Chỉ lấy 4 sản phẩm đầu tiên

            if (productsInCategory.length === 0) return;

            finalHtml += `
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl md:text-3xl font-bold text-white">${category.toUpperCase()}</h2>
                        <a href="san-pham.html" class="text-sky-400 font-semibold hover:text-sky-300 transition-colors text-sm">
                            Xem tất cả &rarr;
                        </a>
                    </div>
                    <div class="w-full h-px bg-slate-700 mb-6">
                         <div class="w-28 h-px bg-sky-500"></div>
                    </div>
                    <div class="product-showcase-row">
            `;

            productsInCategory.forEach(product => {
                finalHtml += `
                    <div class="product-showcase-card group" data-id="${product.id}">
                        <div class="product-showcase-image-wrapper">
                            <img src="${product.image}" alt="${product.displayName}" loading="lazy" onerror="this.onerror=null; this.src='https://placehold.co/300x300/e5e7eb/9ca3af?text=Ảnh lỗi';">
                        </div>
                        <div class="p-4 bg-slate-800 text-left flex-grow flex flex-col">
                            <p class="text-xs text-sky-400 font-semibold uppercase flex-shrink-0">${product.category}</p>
                            <h3 class="font-bold text-white mt-1 text-md leading-snug flex-grow">${product.displayName}</h3>
                            <div class="flex justify-between items-center mt-3 flex-shrink-0">
                                 <span class="text-lg font-bold text-amber-400">${product.price || 'Liên hệ'}</span>
                                 <span class="text-sm text-gray-400">${product.power}</span>
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

    // --- MODAL LOGIC ---
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
                    <div id="variant-selector" class="mb-4"><p class="font-semibold text-gray-300 mb-2">Chọn phiên bản:</p><div class="flex flex-wrap gap-2">${productVariants.map(v => `<button class="variant-btn product-link" data-id="${v.id}">${v.power} (${v.light})</button>`).join('')}</div></div>
                    <div class="mt-4 pt-4 border-t border-slate-700"><label class="block text-sm font-semibold text-gray-300 mb-2">Tính giá chiết khấu:</label><div class="flex items-center space-x-2"><input type="number" id="discount-percentage-input" placeholder="Nhập %" class="form-input flex-grow text-sm !py-2"><button id="calculate-discount-btn" class="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 text-sm">Tính</button></div><div id="discounted-price-display" class="mt-2 text-md hidden bg-green-500/10 border border-green-500/30 rounded-md p-2 text-center"></div></div>
                </div>
            </div>
            <div class="mt-8 pt-6 border-t border-slate-700">
                <div class="border-b border-slate-700 mb-4"><nav id="modal-tab-buttons" class="flex space-x-6"><button data-tab="description" class="modal-tab-btn active">Mô tả</button><button data-tab="specs" class="modal-tab-btn">Thông số</button></nav></div>
                <div id="modal-tab-content">
                    <div id="description-content" class="text-gray-300 text-sm leading-relaxed prose max-w-none"><ul>${(product.features || '').split('.').filter(s => s.trim()).map(s => `<li>${s.trim()}.</li>`).join('')}</ul></div>
                    <div id="specs-content" class="hidden text-sm"><table class="modal-specs-table"><tbody><tr><td>Công suất</td><td>${product.power||'N/A'}</td></tr><tr><td>Quang thông</td><td>${product.lumen||'N/A'}</td></tr><tr><td>Màu ánh sáng</td><td>${product.light||'N/A'}</td></tr></tbody></table></div>
                </div>
            </div>
            <div id="related-products-section" class="mt-8 pt-6 border-t border-slate-700">
                <h3 class="text-xl font-bold text-white mb-4">Sản phẩm tương tự</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${relatedProducts.map(rel => `<div class="product-showcase-card" data-id="${rel.id}"><div class="product-showcase-image-wrapper !p-2 !bg-gray-100"><img src="${rel.image}" alt="${rel.displayName}" class="group-hover:scale-105"></div><div class="p-2 text-center bg-slate-800"><h4 class="text-xs font-semibold text-white leading-tight">${rel.displayName}</h4></div></div>`).join('')}</div>
            </div>`;

        setupModalEventListeners(product);
        document.body.classList.add('modal-open');
        productModal.classList.remove('hidden');
        setTimeout(() => { modalOverlay.classList.remove('opacity-0'); modalContainer.classList.remove('opacity-0', 'scale-95'); }, 10);
    }
    
    function setupModalEventListeners(currentProduct) {
        const calculateBtn = document.getElementById('calculate-discount-btn');
        if(calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                const originalPrice = parsePrice(currentProduct.price);
                const discountPercent = parseFloat(document.getElementById('discount-percentage-input').value);
                const display = document.getElementById('discounted-price-display');
                if (!originalPrice || isNaN(discountPercent)) { display.innerHTML = `<span class="text-red-400">Vui lòng nhập % hợp lệ.</span>`; } 
                else { const newPrice = originalPrice * (1 - discountPercent / 100); display.innerHTML = `Giá sau chiết khấu: <strong class="text-green-400 ml-2">${Math.round(newPrice).toLocaleString('vi-VN')} VNĐ</strong>`; }
                display.classList.remove('hidden');
            });
        }

        document.querySelectorAll('#variant-selector .product-link, #related-products-section .product-card').forEach(card => {
            if(card.dataset.id === currentProduct.id) card.classList.add('active');
            card.addEventListener('click', (e) => { e.preventDefault(); openProductModal(e.currentTarget.dataset.id); });
        });
        
        document.querySelectorAll('#modal-tab-buttons .modal-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                 document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
                 e.currentTarget.classList.add('active');
                 document.getElementById('description-content').classList.toggle('hidden', e.currentTarget.dataset.tab !== 'description');
                 document.getElementById('specs-content').classList.toggle('hidden', e.currentTarget.dataset.tab !== 'specs');
            });
        });
    }

    function closeProductModal() {
        modalOverlay.classList.add('opacity-0');
        modalContainer.classList.add('opacity-0', 'scale-95');
        setTimeout(() => { productModal.classList.add('hidden'); document.body.classList.remove('modal-open'); }, 300);
    }

    // --- INITIALIZATION & EVENT LISTENERS ---
    function init() {
        renderHomepageSections();

        productShowcaseContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.product-showcase-card');
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

        if (typeof Swiper !== 'undefined') {
            new Swiper('.swiper', { loop: true, effect: 'fade', autoplay: { delay: 5000, disableOnInteraction: false }, pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } });
        }
    }
    
    init();
});
