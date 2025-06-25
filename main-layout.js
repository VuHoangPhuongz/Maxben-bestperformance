// File: main-layout.js

document.addEventListener('DOMContentLoaded', () => {
    // ---- Logic cho Menu Mobile ----
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Đóng menu khi click vào một link trên mobile
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ---- Logic cho Dropdown Sản phẩm ----
    // Đảm bảo rằng biến 'productDatabase' từ tệp 'product-details.js' đã tồn tại
    if (typeof productDatabase !== 'undefined') {
        const dropdownContainer = document.getElementById('product-dropdown-menu');
        if (dropdownContainer) {
            // Lấy và sắp xếp tên các danh mục theo thứ tự alphabet
            const categories = Object.keys(productDatabase).sort();
            
            let dropdownHtml = '';
            // Tạo link cho mỗi danh mục
            categories.forEach(category => {
                // Mã hóa tên danh mục để sử dụng an toàn trong URL
                const encodedCategory = encodeURIComponent(category);
                dropdownHtml += `<a href="san-pham.html?category=${encodedCategory}">${category}</a>`;
            });

            // Chèn các link đã tạo vào menu dropdown
            dropdownContainer.innerHTML = dropdownHtml;
        }
    } else {
        console.error('Lỗi: Dữ liệu sản phẩm (productDatabase) không được tìm thấy. Menu dropdown có thể không hoạt động.');
    }
});