// File: app.js

document.addEventListener('DOMContentLoaded', () => {

    // Lấy các element chính
    const mainContent = document.getElementById('main-content');
    const productShowcase = document.getElementById('product-showcase-section');
    const productDetailView = document.getElementById('product-detail-view');

    /**
     * Render danh mục sản phẩm mới
     */
    function renderProductCatalog() {
        const container = document.getElementById('product-catalog-content');
        if (!container) return;

        // Các danh mục muốn hiển thị và thứ tự
        const displayCategories = [
            "Đèn LED Âm Trần",
            "Đèn LED Ốp Trần",
            "Đèn LED Bulb",
            "Đèn Tuýp LED",
            "Đèn Pha LED",
        ];

        let catalogHtml = '';

        displayCategories.forEach(category => {
            if (!productDatabase[category]) return;

            const products = productDatabase[category];
            catalogHtml += `
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-white text-left mb-6">${category.toUpperCase()}</h2>
                    <div class="product-catalog-row">
            `;

            products.slice(0, 10).forEach(productLine => { // Hiển thị tối đa 10 sản phẩm
                const firstVariant = productLine.variants[0];
                const displayName = `${productLine.name} ${firstVariant.power || ''}`.trim();
                const id = `${productLine.name.replace(/\s/g, '-')}-${firstVariant.power}`.toLowerCase();
                
                const originalPriceRaw = parseInt((firstVariant.price || "0").replace(/\D/g, ''));
                const discountPercentage = category.includes("Âm Trần") ? 33 : 48; // Giả lập chiết khấu
                const discountedPrice = Math.round(originalPriceRaw * (1 - discountPercentage / 100));

                catalogHtml += `
                    <a href="#product-detail?id=${id}" class="product-card-new product-link" data-id="${id}">
                        <div class="product-image-wrapper">
                            ${originalPriceRaw > 0 ? `<div class="discount-badge">-${discountPercentage}%</div>` : ''}
                            <img src="${productLine.image}" alt="${productLine.name}" class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
                        </div>
                        <div class="p-4 flex-grow flex flex-col">
                            <h3 class="text-white font-semibold text-sm mb-2 flex-grow">${productLine.name}</h3>
                            <div class="mt-auto">
                                ${originalPriceRaw > 0 ? `<p class="text-xs text-gray-500 line-through">${originalPriceRaw.toLocaleString('vi-VN')}đ</p>` : ''}
                                <p class="text-lg font-bold text-red-400">${discountedPrice > 0 ? discountedPrice.toLocaleString('vi-VN') + 'đ' : 'Liên hệ'}</p>
                            </div>
                        </div>
                    </a>
                `;
            });

            catalogHtml += `</div></div>`;
        });
        
        container.innerHTML = catalogHtml;
    }

    /**
     * Render trang chi tiết sản phẩm
     * @param {string} productId - ID của sản phẩm
     */
    function renderProductDetail(productId) {
        // Tìm sản phẩm trong `allProducts` (đã được tạo trong product-details.js)
        const product = Object.values(allProducts).find(p => p.id === productId);

        if (!product) {
            productDetailView.innerHTML = `<div class="container mx-auto py-20 text-center"><h1 class="text-2xl text-red-500">Lỗi: Không tìm thấy sản phẩm.</h1><a href="index.html" class="mt-4 inline-block text-blue-400 hover:text-white">&larr; Quay lại trang chủ</a></div>`;
            return;
        }

        document.title = `${product.displayName} - MAXBEN`;
        const featuresHtml = (product.features || '').split('.').filter(s => s.trim() !== '').map(s => `<li class="pb-2">${s.trim()}.</li>`).join('');

        const detailHtml = `
            <main class="container mx-auto px-4 lg:px-6 py-8">
                <div class="text-sm text-gray-400 mb-4">
                    <a href="index.html" class="hover:text-white back-link">&larr; Quay lại</a>
                </div>
                <div class="bg-gray-800/50 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700/50">
                    <div class="grid lg:grid-cols-5 gap-8">
                        <div class="lg:col-span-2">
                            <img src="${product.image}" alt="${product.displayName}" class="w-full h-auto object-contain rounded-lg border border-gray-700">
                        </div>
                        <div class="lg:col-span-3">
                            <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">${product.displayName}</h1>
                            <p class="text-xs text-gray-400 mb-3">Mã SP: ${product['Mã Quản Lý'] || 'N/A'}</p>
                            <div class="mb-6">
                                <span class="text-3xl md:text-4xl font-bold text-blue-400">${product.price || "Liên hệ"}</span>
                            </div>
                            <div class="flex items-center space-x-6 border-t border-b border-gray-700 py-4 mb-6">
                                <div class="flex items-center text-sm text-gray-300"><i class="fas fa-check-circle mr-2 text-green-500"></i><span>Hàng chính hãng</span></div>
                                <div class="flex items-center text-sm text-gray-300"><i class="fas fa-shield-alt mr-2 text-blue-500"></i><span>Bảo hành 2-3 năm</span></div>
                            </div>
                            <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                <a href="tel:0886666730" class="w-full text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700"><i class="fas fa-phone-alt mr-2"></i> Tư Vấn Ngay</a>
                                <a href="#" class="w-full text-center bg-gray-700 text-gray-200 font-bold py-3 px-6 rounded-lg hover:bg-gray-600">Yêu Cầu Báo Giá</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-2xl mt-8 border border-gray-700/50">
                    <div class="border-b border-gray-700">
                        <nav class="flex space-x-8"><button class="tab-btn active font-semibold text-lg py-3">Mô tả chi tiết</button></nav>
                    </div>
                    <div class="mt-6 prose max-w-none text-gray-300 leading-relaxed"><ul class="list-disc list-inside space-y-1">${featuresHtml}</ul></div>
                </div>
            </main>
        `;
        productDetailView.innerHTML = detailHtml;
    }

    /**
     * Logic điều hướng chính
     */
    function router() {
        const hash = window.location.hash;

        if (hash.startsWith('#product-detail?id=')) {
            const productId = hash.split('?id=')[1];
            mainContent.classList.add('hidden');
            productDetailView.classList.remove('hidden');
            renderProductDetail(productId);
            window.scrollTo(0, 0);
        } else {
            mainContent.classList.remove('hidden');
            productDetailView.classList.add('hidden');
            document.title = 'MAXBEN - Giải Pháp Chiếu Sáng LED Chuyên Nghiệp';
        }
    }

    // --- Lắng nghe các sự kiện ---

    // Click vào link sản phẩm hoặc link quay lại
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (!link) return;

        // Xử lý click vào sản phẩm
        if (link.classList.contains('product-link')) {
            e.preventDefault();
            const productId = link.dataset.id;
            history.pushState({ productId }, '', `#product-detail?id=${productId}`);
            router();
        }

        // Xử lý click vào link quay lại
        if (link.classList.contains('back-link')) {
            e.preventDefault();
            history.back(); // Sử dụng history.back() để quay lại trang trước đó
        }
    });

    // Lắng nghe nút back/forward của trình duyệt
    window.addEventListener('popstate', router);

    // --- Chạy các hàm khởi tạo ---
    renderProductCatalog();
    router();
});