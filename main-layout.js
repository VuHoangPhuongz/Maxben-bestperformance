document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        // Close mobile menu when a link inside it is clicked
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // ---- Logic cho Dropdown Sản phẩm (Desktop) ----
    const dropdownContainer = document.getElementById('product-dropdown-menu');

    // ---- Logic cho Dropdown Sản phẩm (Mobile) ----
    // Bạn cần một container riêng cho các danh mục sản phẩm trong menu mobile
    const mobileProductCategoriesList = document.getElementById('mobile-product-categories-list');

    // Đảm bảo rằng biến 'productDatabase' từ tệp 'product-details.js' đã tồn tại
    if (typeof productDatabase !== 'undefined') {
        const categories = Object.keys(productDatabase).sort();

        let dropdownHtml = '';
        let mobileDropdownHtml = ''; // HTML riêng cho mobile

        categories.forEach(category => {
            const encodedCategory = encodeURIComponent(category);
            const linkHref = `san-pham.html?category=${encodedCategory}`;

            // Tạo link cho dropdown desktop
            dropdownHtml += `<a href="${linkHref}">${category}</a>`;

            // Tạo link cho dropdown mobile
            // Sử dụng các class Tailwind phù hợp cho mobile menu
            mobileDropdownHtml += `
                <a href="${linkHref}" class="block py-2 pl-4 text-gray-300 hover:text-white text-sm transition-colors">
                    ${category}
                </a>
            `;
        });

        // Chèn các link đã tạo vào menu dropdown desktop
        if (dropdownContainer) {
            dropdownContainer.innerHTML = dropdownHtml;
        }

        // Chèn các link đã tạo vào menu dropdown mobile
        if (mobileProductCategoriesList) {
            mobileProductCategoriesList.innerHTML = mobileDropdownHtml;
        }

    } else {
        console.error('Lỗi: Dữ liệu sản phẩm (productDatabase) không được tìm thấy. Menu dropdown có thể không hoạt động.');
    }
});