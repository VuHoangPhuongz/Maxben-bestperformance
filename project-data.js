const allProjects = [
    { 
        id: "biet-thu-harmony", category: "Nhà Ở", client: "Tập đoàn Vingroup", location: "Long Biên, Hà Nội", year: "2023",
        title: "Biệt Thự The Harmony, Long Biên", 
        desc: "Giải pháp chiếu sáng 3 lớp tạo nên không gian sống tinh tế và linh hoạt, đáp ứng tiêu chuẩn sống đẳng cấp.", 
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1770&auto=format&fit=crop", 
        tags: ["Ray Nam Châm", "Spotlight", "CRI > 98"], 
        challenge: "Thách thức đặt ra là tạo ra một hệ thống chiếu sáng vừa đảm bảo công năng cho từng khu vực, vừa có tính thẩm mỹ cao, đồng thời cho phép gia chủ linh hoạt thay đổi kịch bản ánh sáng.",
        solution: "Chúng tôi đã tư vấn giải pháp chiếu sáng 3 lớp toàn diện: 1. Chiếu sáng chung dùng đèn downlight âm trần Lucy Pro. 2. Chiếu sáng tác vụ dùng hệ ray nam châm linh hoạt. 3. Chiếu sáng điểm nhấn dùng spotlight PROLUX-SPX1 (CRI>98) để làm nổi bật các tác phẩm nghệ thuật.",
        gallery: [ "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1770&auto=format&fit=crop", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1770&auto=format&fit=crop", "https://images.unsplash.com/photo-1600585153492-3a216834b6e3?q=80&w=1770&auto=format&fit=crop", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1770&auto=format&fit=crop" ],
        productsUsed: [
            { name: "Đèn Âm Trần SPOTLIGHT PROLUX-SPX1", img: "./icons/prolux SPX1.png" },
            { name: "Đèn LED âm trần chống chói ZEN", img: "./icons/3.png" },
            { name: "Dây LED 24 SMD/COB", img: "https://i.ibb.co/ksHMJBdw/Day-led-24-V-SMD.png" }
        ],
        testimonial: "Tôi thực sự hài lòng với giải pháp mà MAXBEN đã cung cấp. Đội ngũ tư vấn rất chuyên nghiệp, giúp tôi hình dung được toàn bộ không gian trước khi lắp đặt. Chất lượng ánh sáng rất tuyệt vời, làm nổi bật từng chi tiết nội thất.",
        customerName: "Anh Trần Văn Minh, Chủ biệt thự"
    },
    { 
        id: "showroom-ivy", category: "Bán Lẻ", client: "Thương hiệu IVY Moda", location: "Quận 1, TP.HCM", year: "2024",
        title: "Showroom Thời Trang IVY, Quận 1", 
        desc: "Hệ thống đèn rọi ray chuyên dụng giúp màu sắc sản phẩm được hiển thị trung thực, thu hút khách hàng.", 
        img: "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Đèn Rọi Ray", "CRI>95", "Showroom"],
        challenge: "Cần một giải pháp chiếu sáng làm nổi bật chất liệu, màu sắc của các bộ sưu tập thời trang mà không gây chói mắt cho khách hàng. Ánh sáng phải linh hoạt để thay đổi theo từng khu vực trưng bày.",
        solution: "MAXBEN đã sử dụng hệ thống đèn rọi ray PROLUX-T với chỉ số CRI > 97 và góc chiếu có thể điều chỉnh. Ánh sáng tập trung vào sản phẩm, tạo nên một không gian mua sắm sang trọng và chuyên nghiệp.",
        gallery: [ "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn Âm Trần SPOTLIGHT PRO LUX-T", img: "./icons/Prolux T.png" },
            { name: "Đèn LED âm trần chống chói ZEN", img: "./icons/3.png" }
        ],
        testimonial: "Ánh sáng từ đèn của MAXBEN thực sự tôn vinh vẻ đẹp của từng bộ sưu tập. Chỉ số CRI cao giúp màu sắc sản phẩm hiển thị trung thực, thu hút khách hàng ngay từ cái nhìn đầu tiên. Không gian showroom trở nên sang trọng và chuyên nghiệp hơn hẳn.",
        customerName: "Chị Thuỳ Linh, Quản lý Cửa hàng IVY Moda"
    },
    { 
        id: "van-phong-fpt", category: "Văn Phòng", client: "Tập đoàn FPT", location: "Cầu Giấy, Hà Nội", year: "2023",
        title: "Văn Phòng FPT Software, Cầu Giấy", 
        desc: "Triển khai hệ thống đèn Panel và tuýp LED bán nguyệt đạt chuẩn UGR<19, đảm bảo môi trường làm việc không gây chói.", 
        img: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Đèn Panel", "UGR<19", "Tiết kiệm năng lượng"],
        challenge: "Với không gian làm việc mở và mật độ nhân viên cao, yêu cầu đặt ra là hệ thống chiếu sáng phải cung cấp đủ độ sáng theo tiêu chuẩn, đồng thời phải có chỉ số chống chói (UGR) dưới 19 để bảo vệ thị lực và tăng sự tập trung.",
        solution: "Chúng tôi đã lựa chọn đèn LED Panel 600x600 và tuýp LED bán nguyệt của MAXBEN. Các sản phẩm này không chỉ đáp ứng tiêu chuẩn UGR<19 mà còn tiết kiệm hơn 50% điện năng so với hệ thống đèn huỳnh quang cũ.",
        gallery: [ "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn tuýp LED bán nguyệt", img: "https://i.ibb.co/PzsVJwHj/den-tuyp-led-ban-nguyet-maxben-1.png" },
            { name: "Đèn LED Panel Tấm", img: "https://placehold.co/300x300/e5e7eb/9ca3af?text=Panel+Tam" }
        ],
        testimonial: "Môi trường làm việc rất quan trọng. Hệ thống đèn chống chói UGR<19 của MAXBEN đã tạo ra một không gian làm việc thoải mái, giúp nhân viên tập trung cao độ. Giải pháp này còn giúp chúng tôi tiết kiệm chi phí vận hành đáng kể.",
        customerName: "Ông Nguyễn Tuấn Anh, Trưởng phòng Quản lý Cơ sở vật chất FPT"
    },
    { 
        id: "can-ho-masteri", category: "Nhà Ở", client: "Chủ căn hộ", location: "Tây Mỗ, Hà Nội", year: "2024",
        title: "Căn Hộ Masteri West Heights", 
        desc: "Kết hợp đèn âm trần chống chói và dây LED hắt trần, tạo không gian nghỉ ngơi thư giãn với ánh sáng êm dịu, ấm cúng.", 
        img: "https://images.pexels.com/photos/6434623/pexels-photo-6434623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Âm trần chống chói", "Dây LED"],
        challenge: "Chủ nhà mong muốn một không gian sống hiện đại, ấm cúng, ánh sáng có thể điều chỉnh độ sáng và màu sắc để phù hợp với nhiều tâm trạng khác nhau.",
        solution: "Giải pháp tối ưu là sử dụng đèn âm trần chống chói ZEN cho ánh sáng nền, kết hợp với dây LED đổi màu hắt trần và tủ kệ. Toàn bộ hệ thống có thể điều khiển thông qua smartphone, cho phép tạo ra các kịch bản chiếu sáng đa dạng.",
        gallery: [ "https://images.pexels.com/photos/6434623/pexels-photo-6434623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/6585613/pexels-photo-6585613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/6585764/pexels-photo-6585764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/7031706/pexels-photo-7031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn LED âm trần chống chói ZEN", img: "https://i.ibb.co/Y7zkd2qz/Ch-ng-ch-i-ZEN.png" },
            { name: "Dây LED 24 SMD/COB", img: "https://i.ibb.co/ksHMJBdw/Day-led-24-V-SMD.png" }
        ],
        testimonial: "Tôi rất thích sự linh hoạt của hệ thống chiếu sáng thông minh này. Tôi có thể dễ dàng thay đổi không khí của căn phòng, từ ấm cúng cho buổi tối thư giãn đến rực rỡ khi có khách. Một giải pháp tuyệt vời cho căn hộ hiện đại.",
        customerName: "Chị Phương Mai, Chủ căn hộ"
    },
    { 
        id: "nha-hang-lamour", category: "Bán Lẻ", client: "L'amour Steak", location: "Quận Hoàn Kiếm, Hà Nội", year: "2023",
        title: "Nhà hàng L'amour Steak, Hà Nội", 
        desc: "Sử dụng đèn spotlight với góc chiếu hẹp và ánh sáng vàng ấm 3000K để tạo điểm nhấn trên từng bàn ăn.", 
        img: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Spotlight", "3000K", "Nhà hàng"],
        challenge: "Nhà hàng cần một không gian sang trọng, lãng mạn. Ánh sáng phải đủ để thực khách thấy rõ món ăn nhưng vẫn giữ được sự riêng tư, ấm cúng.",
        solution: "Mỗi bàn ăn được bố trí một đèn spotlight PROLUX-SP7 có thể điều chỉnh độ sáng và góc chiếu. Ánh sáng vàng 3000K tạo cảm giác ấm áp, kết hợp với ánh sáng nền dịu nhẹ từ đèn âm trần, tạo nên một không gian ẩm thực hoàn hảo.",
        gallery: [ "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn Âm Trần SPOTLIGHT PROLUX-SP7", img: "https://i.ibb.co/1f274t9t/spotlight-prolux-sp7.png" },
            { name: "Đèn LED âm trần Lucy", img: "https://i.ibb.co/Xk8GvthV/den-led-am-tran-lucy-01-247x296.png" }
        ],
        testimonial: "Không gian lãng mạn, ấm cúng của nhà hàng được tạo nên phần lớn nhờ vào hệ thống chiếu sáng. MAXBEN đã giúp chúng tôi tạo ra điểm nhấn hoàn hảo trên từng bàn ăn, mang lại trải nghiệm đáng nhớ cho thực khách.",
        customerName: "Ông Phillip, Bếp trưởng nhà hàng L'amour Steak"
    },
    { 
        id: "san-vuon-ecopark", category: "Ngoại thất", client: "KĐT Ecopark", location: "Hưng Yên", year: "2023",
        title: "Chiếu sáng sân vườn Biệt thự Ecopark", 
        desc: "Sử dụng các loại đèn pha và đèn sân vườn IP65, vừa đảm bảo an toàn, vừa làm nổi bật các tiểu cảnh, lối đi.", 
        img: "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Đèn Pha LED", "IP65", "Sân Vườn"],
        challenge: "Tạo ra một không gian ngoại thất lung linh, an toàn vào ban đêm mà không làm ảnh hưởng đến cảnh quan tự nhiên. Các thiết bị phải có khả năng chống chịu thời tiết khắc nghiệt.",
        solution: "Hệ thống đèn pha LED V2 và đèn trụ năng lượng mặt trời của MAXBEN đã được sử dụng. Các đèn có tiêu chuẩn chống nước IP65, ánh sáng ấm 3000K được bố trí khéo léo để chiếu sáng lối đi và rọi vào các gốc cây, tiểu cảnh.",
        gallery: [ "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1618492/pexels-photo-1618492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1474234/pexels-photo-1474234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn pha LED V2", img: "https://i.ibb.co/CFZJwvQ/MB-Pha-led-V2-01.png" },
            { name: "Đèn Trụ Năng lượng mặt trời", img: "https://i.postimg.cc/Kzsts1pL/page5-img2.jpg" }
        ],
        testimonial: "Khu vườn của chúng tôi trở nên lung linh và an toàn hơn vào ban đêm. Các sản phẩm đèn ngoại thất của MAXBEN có độ bền cao, chống chịu thời tiết tốt và đặc biệt là ánh sáng rất hài hòa với cảnh quan thiên nhiên.",
        customerName: "Anh Hoàng, Cư dân Ecopark"
    },
    { 
        id: "coworking-toong", category: "Văn Phòng", client: "Toong Coworking Space", location: "Hoàng Đạo Thúy, Hà Nội", year: "2022",
        title: "Coworking Space Toong", 
        desc: "Giải pháp chiếu sáng linh hoạt với các vùng sáng khác nhau, phục vụ đa dạng nhu cầu làm việc và sáng tạo.", 
        img: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Đèn Tuýp", "Linh hoạt", "Thiết kế hiện đại"],
        challenge: "Không gian coworking đòi hỏi sự linh hoạt tối đa, từ khu vực làm việc chung cần ánh sáng tập trung đến khu vực thư giãn cần ánh sáng dịu nhẹ.",
        solution: "MAXBEN đã kết hợp nhiều loại đèn: Đèn tuýp LED bán nguyệt cho khu vực chung, đèn thả trang trí và đèn ống bơ COB-S cho các phòng họp và khu vực pantry, tạo ra một không gian đa chức năng và đầy cảm hứng.",
        gallery: [ "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1181415/pexels-photo-1181415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn LED Ống Bơ COB-S", img: "https://i.ibb.co/DH928TNg/COB-S.png" },
            { name: "Đèn tuýp LED bán nguyệt", img: "https://i.ibb.co/PzsVJwHj/den-tuyp-led-ban-nguyet-maxben-1.png" }
        ],
        testimonial: "Sự đa dạng trong giải pháp chiếu sáng của MAXBEN đã giúp Toong tạo ra một không gian làm việc đầy cảm hứng, đáp ứng được nhu cầu của nhiều đối tượng khách hàng khác nhau. Ánh sáng chất lượng cao thực sự nâng tầm trải nghiệm không gian.",
        customerName: "Anh Đỗ Sơn Dương, Sáng lập Toong"
    },
    { 
        id: "cafe-signature", category: "Bán Lẻ", client: "The Coffee House", location: "Phan Xích Long, TP.HCM", year: "2023",
        title: "Quán Cafe The Coffee House Signature", 
        desc: "Ánh sáng được thiết kế để tạo ra một không gian ấm cúng, gần gũi, là nơi lý tưởng để gặp gỡ và làm việc.", 
        img: "https://images.pexels.com/photos/1749821/pexels-photo-1749821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Đèn Thả", "Ấm cúng", "3000K"],
        challenge: "Tạo ra một không gian cafe vừa đủ sáng để đọc sách, làm việc, nhưng vẫn phải giữ được không khí thư giãn, ấm cúng đặc trưng của thương hiệu.",
        solution: "Sử dụng kết hợp đèn thả trần với ánh sáng vàng ấm (3000K) tại mỗi bàn và đèn rọi ray để chiếu sáng các quầy kệ. Giải pháp này tạo ra các 'ốc đảo' ánh sáng riêng tư, mang lại trải nghiệm dễ chịu cho khách hàng.",
        gallery: [ "https://images.pexels.com/photos/1749821/pexels-photo-1749821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3363351/pexels-photo-3363351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn Âm Trần SPOTLIGHT PROLUX-SP7", img: "https://i.ibb.co/1f274t9t/spotlight-prolux-sp7.png" },
            { name: "Đèn Âm Trần SPOTLIGHT PROLUX-SPX1", img: "https://i.ibb.co/b5cTCxZT/prolux-SPX1.png" }
        ],
        testimonial: "Ánh sáng là linh hồn của không gian. MAXBEN đã giúp chúng tôi tạo ra những 'ốc đảo' ánh sáng ấm cúng, mang lại cảm giác dễ chịu và riêng tư cho khách hàng. Đây là yếu tố quan trọng giữ chân khách hàng quay trở lại.",
        customerName: "Anh Quốc Anh, Quản lý Vận hành The Coffee House"
    },
    { 
        id: "penthouse-landmark", category: "Nhà Ở", client: "Chủ căn hộ", location: "Bình Thạnh, TP.HCM", year: "2024",
        title: "Penthouse Tòa nhà Landmark 81", 
        desc: "Hệ thống chiếu sáng thông minh, có thể điều khiển qua smartphone, tạo ra các kịch bản chiếu sáng đa dạng.", 
        img: "https://images.pexels.com/photos/6585758/pexels-photo-6585758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Smart Lighting", "Dimmable", "Luxury"],
        challenge: "Tích hợp hệ thống chiếu sáng vào nền tảng nhà thông minh (smarthome) của căn hộ. Yêu cầu ánh sáng phải điều chỉnh được cường độ, màu sắc và tạo ra các kịch bản (scenes) khác nhau như 'tiếp khách', 'xem phim', 'thư giãn'.",
        solution: "Toàn bộ hệ thống đèn của MAXBEN (downlight, spotlight, dây LED) được kết nối với bộ điều khiển trung tâm. Gia chủ có thể dễ dàng điều khiển toàn bộ hệ thống chiếu sáng chỉ bằng một nút bấm trên điện thoại hoặc bằng giọng nói.",
        gallery: [ "https://images.pexels.com/photos/6585758/pexels-photo-6585758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/6585601/pexels-photo-6585601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/6492395/pexels-photo-6492395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn Âm Trần SPOTLIGHT PROLUX-SPX1", img: "https://i.ibb.co/b5cTCxZT/prolux-SPX1.png" },
            { name: "Dây LED 24 SMD/COB", img: "https://i.ibb.co/ksHMJBdw/Day-led-24-V-SMD.png" }
        ],
        testimonial: "Giải pháp chiếu sáng thông minh của MAXBEN đã thực sự biến căn hộ của tôi thành một không gian sống đẳng cấp. Việc điều khiển toàn bộ ánh sáng qua điện thoại, tạo các kịch bản 'xem phim', 'tiếp khách' chỉ bằng một nút bấm thật sự ấn tượng.",
        customerName: "Doanh nhân Lê Hoàng, Chủ căn hộ Penthouse"
    },
    { 
        id: "cua-hang-pnj", category: "Bán Lẻ", client: "PNJ", location: "Hai Bà Trưng, Hà Nội", year: "2023",
        title: "Cửa hàng trang sức PNJ Next", 
        desc: "Giải pháp chiếu sáng chuyên dụng cho trang sức, làm nổi bật sự lấp lánh và tinh xảo của sản phẩm.", 
        img: "https://images.pexels.com/photos/16668101/pexels-photo-16668101/free-photo-of-gold-necklaces-in-a-shop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Chiếu sáng trang sức", "CRI>98", "Spotlight"],
        challenge: "Ánh sáng cần có chỉ số hoàn màu CRI cực cao và nhiệt độ màu chuẩn (4000K) để thể hiện đúng màu sắc của vàng, bạc và đá quý. Đồng thời, phải tạo ra hiệu ứng 'lấp lánh' (sparkle effect) mà không gây chói.",
        solution: "MAXBEN đã sử dụng các đèn spotlight PROLUX-SP2 với chip LED chuyên dụng cho ngành trang sức, có CRI>98 và quang phổ đặc biệt. Các đèn được bố trí với góc chiếu hẹp, tập trung chính xác vào từng sản phẩm.",
        gallery: [ "https://images.pexels.com/photos/16668101/pexels-photo-16668101/free-photo-of-gold-necklaces-in-a-shop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/230290/pexels-photo-230290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1458866/pexels-photo-1458866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/2659175/pexels-photo-2659175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn Âm Trần SPOTLIGHT PROLUX-SP2", img: "https://i.ibb.co/yc33cf20/Prolux-SP2.png" },
            { name: "Đèn LED âm trần Lucy", img: "https://i.ibb.co/Xk8GvthV/den-led-am-tran-lucy-01-247x296.png" }
        ],
        testimonial: "Đối với ngành trang sức, ánh sáng là yếu tố quyết định. Giải pháp của MAXBEN với chỉ số hoàn màu CRI>98 đã làm nổi bật vẻ đẹp tinh xảo và sự lấp lánh của từng sản phẩm, mang lại hiệu quả trưng bày vượt trội.",
        customerName: "Bà Lê Thị Hạnh, Giám đốc Phát triển Mạng lưới PNJ"
    },
    { 
        id: "tru-so-techcombank", category: "Văn Phòng", client: "Ngân hàng Techcombank", location: "Quận Hoàn Kiếm, Hà Nội", year: "2023",
        title: "Trụ sở chính Techcombank Tower", 
        desc: "Hệ thống chiếu sáng kiến trúc hiện đại, đồng bộ và thông minh, thể hiện đẳng cấp thương hiệu.", 
        img: "https://images.pexels.com/photos/7794042/pexels-photo-7794042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Facade Lighting", "Smart Control"],
        challenge: "Chiếu sáng toàn bộ mặt dựng của tòa nhà 23 tầng, yêu cầu giải pháp phải đồng bộ, có thể thay đổi màu sắc theo kịch bản và tiết kiệm năng lượng tối đa.",
        solution: "Hệ thống đèn pha LED Wall Washer của MAXBEN với khả năng điều khiển DMX đã được lựa chọn. Toàn bộ hệ thống được lập trình để tạo ra các hiệu ứng ánh sáng độc đáo, thay đổi theo các sự kiện trong năm, góp phần tạo nên một biểu tượng kiến trúc về đêm.",
        gallery: [ "https://images.pexels.com/photos/7794042/pexels-photo-7794042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/7794043/pexels-photo-7794043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn pha LED V2", img: "https://i.ibb.co/CFZJwvQ/MB-Pha-led-V2-01.png" },
            { name: "Đèn pha RGB", img: "https://i.ibb.co/C5B0Qrf/e69a968e-17a0-457e-a511-d94f9c2c0bc1.png" }
        ],
        testimonial: "Tòa nhà Techcombank Tower đã trở thành một biểu tượng kiến trúc vào ban đêm nhờ hệ thống chiếu sáng mặt dựng của MAXBEN. Giải pháp điều khiển DMX thông minh cho phép chúng tôi tạo ra những màn trình diễn ánh sáng ấn tượng, thể hiện đúng tầm vóc của thương hiệu.",
        customerName: "Ông Phạm Quang Thắng, Giám đốc Dự án Xây dựng Techcombank"
    },
    { 
        id: "nha-xuong-vinatex", category: "Nhà Xưởng", client: "Tập đoàn Dệt May Việt Nam", location: "Hưng Yên", year: "2024",
        title: "Nhà Xưởng Dệt May Vinatex", 
        desc: "Giải pháp chiếu sáng công nghiệp sử dụng đèn High-bay, đảm bảo độ sáng và an toàn cho hoạt động sản xuất.", 
        img: "https://images.pexels.com/photos/2228561/pexels-photo-2228561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Đèn High-bay", "IP65"],
        challenge: "Nhà xưởng yêu cầu một hệ thống chiếu sáng có cường độ cao, phân bổ đồng đều trên diện tích rộng, đồng thời phải bền bỉ trong môi trường công nghiệp và tiết kiệm chi phí vận hành.",
        solution: "MAXBEN đã lắp đặt hệ thống đèn LED High-bay công suất 150W, có hiệu suất phát quang cao và tuổi thọ lên đến 50.000 giờ. Giải pháp này giúp nhà máy giảm 60% chi phí điện năng và chi phí bảo trì so với đèn cao áp truyền thống.",
        gallery: [ "https://images.pexels.com/photos/2228561/pexels-photo-2228561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/8346039/pexels-photo-8346039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn High-Bay UFO", img: "https://placehold.co/300x300/e5e7eb/9ca3af?text=High-Bay+UFO" },
            { name: "Đèn tuýp LED T8", img: "https://i.ibb.co/0VQgyQ1V/den-tuyp-led-t8-maxben-45w-1-247.png" }
        ],
        testimonial: "Hệ thống đèn High-bay của MAXBEN đã cải thiện đáng kể môi trường làm việc trong nhà xưởng. Ánh sáng đủ và đồng đều, giúp công nhân làm việc an toàn và hiệu quả hơn. Đặc biệt, chi phí điện năng và bảo trì giảm rõ rệt.",
        customerName: "Ông Trần Văn Long, Quản đốc nhà máy Vinatex"
    },
    { 
        id: "khach-san-marriott", category: "Bán Lẻ", client: "JW Marriott", location: "Hà Nội", year: "2022",
        title: "Khách Sạn JW Marriott, Hà Nội", 
        desc: "Hệ thống chiếu sáng sảnh và phòng nghỉ sang trọng, tạo trải nghiệm đẳng cấp 5 sao.", 
        img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Hospitality", "Dimmable", "Luxury"],
        challenge: "Tạo ra một không gian đẳng cấp, sang trọng nhưng vẫn ấm cúng. Hệ thống chiếu sáng cần linh hoạt, có thể điều chỉnh để phù hợp với các sự kiện khác nhau tại sảnh và mang lại sự thoải mái tối đa trong phòng nghỉ.",
        solution: "Sử dụng hệ thống đèn downlight, spotlight có thể điều chỉnh độ sáng (dimmable) và nhiệt độ màu (tunable white). Điều này cho phép quản lý khách sạn dễ dàng thay đổi không khí của không gian từ rực rỡ, sang trọng thành ấm cúng, thư giãn.",
        gallery: [ "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn LED âm trần Lucy", img: "https://i.ibb.co/Xk8GvthV/den-led-am-tran-lucy-01-247x296.png" },
            { name: "Đèn Âm Trần SPOTLIGHT PROLUX-SP7", img: "https://i.ibb.co/1f274t9t/spotlight-prolux-sp7.png" }
        ],
        testimonial: "Giải pháp chiếu sáng linh hoạt của MAXBEN cho phép chúng tôi dễ dàng thay đổi không gian từ sảnh đón khách sang trọng đến phòng nghỉ ấm cúng. Chất lượng ánh sáng vượt trội đã góp phần quan trọng vào việc mang lại trải nghiệm 5 sao cho khách hàng của chúng tôi.",
        customerName: "Bà Nguyễn Thị Bích Vân, Tổng Giám đốc Khách sạn JW Marriott Hanoi"
    },
    { 
        id: "san-golf-long-bien", category: "Ngoại thất", client: "Sân Golf Long Biên", location: "Long Biên, Hà Nội", year: "2023",
        title: "Sân Golf Long Biên", 
        desc: "Chiếu sáng toàn diện cho sân golf, đảm bảo tầm nhìn tốt nhất cho các golfer vào buổi tối.", 
        img: "https://images.pexels.com/photos/1323456/pexels-photo-1323456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Đèn Pha LED", "Thể thao", "Công suất cao"],
        challenge: "Cung cấp đủ độ sáng trên một diện tích cực lớn, đảm bảo không có vùng tối và không gây chói cho người chơi. Hệ thống đèn phải có độ bền cao, chống chịu được thời tiết ngoài trời.",
        solution: "Hệ thống đèn pha LED công suất cao (400W) của MAXBEN với góc chiếu được tính toán kỹ lưỡng đã được lắp đặt trên các cột đèn cao. Giải pháp này không chỉ đảm bảo tầm nhìn hoàn hảo mà còn giúp tiết kiệm đáng kể chi phí vận hành.",
        gallery: [ "https://images.pexels.com/photos/1323456/pexels-photo-1323456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/733398/pexels-photo-733398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1102915/pexels-photo-1102915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/164287/pexels-photo-164287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn pha LED V2", img: "https://i.ibb.co/CFZJwvQ/MB-Pha-led-V2-01.png" }
        ],
        testimonial: "Hệ thống đèn pha công suất cao của MAXBEN đã mang lại chất lượng chiếu sáng tuyệt vời cho sân golf của chúng tôi. Các golfer có thể chơi vào buổi tối với tầm nhìn rõ nét và không bị chói. Đây là một sự đầu tư hiệu quả và bền vững.",
        customerName: "Ông Nguyễn Hồng Sơn, Giám đốc Điều hành Sân Golf Long Biên"
    },
    { 
        id: "chung-cu-sunshine", category: "Nhà Ở", client: "Sunshine Group", location: "Quận Tây Hồ, Hà Nội", year: "2022",
        title: "Chung cư Sunshine City", 
        desc: "Cung cấp giải pháp chiếu sáng đồng bộ cho hàng ngàn căn hộ, tối ưu chi phí và đảm bảo chất lượng.", 
        img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Âm trần", "Số lượng lớn", "Dự án"],
        challenge: "Cung cấp một số lượng lớn sản phẩm đèn âm trần với chất lượng đồng đều, giá cả cạnh tranh và tiến độ giao hàng nhanh chóng để đáp ứng yêu cầu của một dự án quy mô lớn.",
        solution: "MAXBEN đã cung cấp dòng đèn LED âm trần Happy V2, một sản phẩm được tối ưu hóa về giá thành nhờ dây chuyền sản xuất tự động mà vẫn đảm bảo chất lượng ánh sáng (CRI>80) và độ bền.",
        gallery: [ "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn LED âm trần Happy V2", img: "https://i.ibb.co/0RdqTTXf/happy-v2-13-247x296.jpg" }
        ],
        testimonial: "Với một dự án quy mô lớn như Sunshine City, việc tìm được nhà cung cấp uy tín, đáp ứng được cả về số lượng, chất lượng và tiến độ là cực kỳ quan trọng. MAXBEN đã là một đối tác tin cậy, góp phần vào thành công của dự án.",
        customerName: "Đại diện Ban Quản lý Dự án Sunshine Group"
    },
    { 
        id: "trung-tam-aeon", category: "Bán Lẻ", client: "AEON Mall", location: "Hà Đông, Hà Nội", year: "2021",
        title: "Trung Tâm Thương Mại AEON Mall", 
        desc: "Hệ thống chiếu sáng chung cho không gian rộng lớn, đảm bảo tính thẩm mỹ và tiết kiệm năng lượng.", 
        img: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["TTTM", "Tiết kiệm năng lượng"],
        challenge: "Chiếu sáng một không gian công cộng rộng lớn, yêu cầu độ sáng cao, đồng đều và phải hoạt động liên tục trong thời gian dài với chi phí vận hành thấp nhất có thể.",
        solution: "Hàng ngàn bộ đèn tuýp LED và đèn panel của MAXBEN đã được lắp đặt. Với hiệu suất phát quang cao, các sản phẩm này giúp AEON Mall tiết kiệm một khoản chi phí điện năng khổng lồ hàng năm.",
        gallery: [ "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1345083/pexels-photo-1345083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn tuýp LED bán nguyệt", img: "https://i.ibb.co/PzsVJwHj/den-tuyp-led-ban-nguyet-maxben-1.png" },
            { name: "Đèn LED Panel Tấm", img: "https://placehold.co/300x300/e5e7eb/9ca3af?text=Panel+Tam" }
        ],
        testimonial: "Việc chuyển đổi sang hệ thống đèn LED của MAXBEN là một quyết định đầu tư đúng đắn. Chúng tôi không chỉ tạo ra một không gian mua sắm sáng sủa, thân thiện hơn mà còn tiết kiệm được một khoản chi phí vận hành khổng lồ mỗi năm.",
        customerName: "Ông Tanaka, Giám đốc Kỹ thuật AEON Mall Hà Đông"
    },
    { 
        id: "ngan-hang-vietcombank", category: "Văn Phòng", client: "Vietcombank", location: "TP.HCM", year: "2022",
        title: "Trụ sở Vietcombank Tower, TP.HCM", 
        desc: "Chiếu sáng mặt dựng tòa nhà biểu tượng, khẳng định vị thế thương hiệu hàng đầu.", 
        img: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Facade Lighting", "Kiến trúc", "DMX"],
        challenge: "Tạo ra một hệ thống chiếu sáng mặt dựng (facade lighting) đẳng cấp, có thể thay đổi màu sắc và hiệu ứng linh hoạt để phù hợp với các sự kiện và nhận diện thương hiệu của Vietcombank.",
        solution: "Sử dụng hệ thống đèn pha LED RGBW có thể điều khiển qua giao thức DMX, cho phép tạo ra hàng triệu màu sắc và hiệu ứng chuyển động mượt mà. Hệ thống giúp tòa nhà Vietcombank Tower trở thành một điểm nhấn kiến trúc nổi bật trên bầu trời thành phố.",
        gallery: [ "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn pha LED V2", img: "https://i.ibb.co/CFZJwvQ/MB-Pha-led-V2-01.png" },
            { name: "Đèn pha RGB", img: "https://i.ibb.co/C5B0Qrf/e69a968e-17a0-457e-a511-d94f9c2c0bc1.png" }
        ],
        testimonial: "Hệ thống chiếu sáng mặt dựng của MAXBEN đã giúp Vietcombank Tower tỏa sáng đúng với vị thế của một biểu tượng. Khả năng thay đổi màu sắc linh hoạt giúp chúng tôi truyền tải các thông điệp thương hiệu một cách ấn tượng và đầy tự hào.",
        customerName: "Đại diện Ban Xây dựng Cơ bản Vietcombank"
    },
    { 
        id: "nha-may-samsung", category: "Nhà Xưởng", client: "Samsung Electronics", location: "Bắc Ninh", year: "2023",
        title: "Nhà máy Samsung Electronics, Bắc Ninh", 
        desc: "Giải pháp chiếu sáng cho dây chuyền sản xuất yêu cầu độ chính xác cao và chống tĩnh điện.", 
        img: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Nhà máy", "Chống tĩnh điện", "High-bay"],
        challenge: "Dây chuyền lắp ráp linh kiện điện tử yêu cầu ánh sáng không nhấp nháy, độ hoàn màu cao để công nhân có thể thao tác chính xác. Ngoài ra, đèn phải có khả năng chống tĩnh điện để không làm hỏng các vi mạch nhạy cảm.",
        solution: "MAXBEN cung cấp dòng đèn tuýp LED và High-bay có thiết kế đặc biệt, đạt tiêu chuẩn chống tĩnh điện và có chỉ số hoàn màu CRI>90. Giải pháp đảm bảo môi trường làm việc an toàn và hiệu quả cho nhà máy.",
        gallery: [ "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/4968545/pexels-photo-4968545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/4968649/pexels-photo-4968649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn High-Bay UFO", img: "https://placehold.co/300x300/e5e7eb/9ca3af?text=High-Bay+UFO" },
            { name: "Đèn tuýp LED bán nguyệt", img: "https://i.ibb.co/PzsVJwHj/den-tuyp-led-ban-nguyet-maxben-1.png" }
        ],
        testimonial: "Chất lượng sản phẩm là ưu tiên hàng đầu của Samsung. Hệ thống đèn chống tĩnh điện và có CRI>90 của MAXBEN đã đáp ứng những yêu cầu kỹ thuật khắt khe nhất, đảm bảo một môi trường sản xuất an toàn và chính xác tuyệt đối.",
        customerName: "Ông Lee Jun-ho, Trưởng bộ phận Quản lý sản xuất"
    },
    { 
        id: "resort-intercontinental", category: "Ngoại thất", client: "InterContinental Hotels Group", location: "Phú Quốc", year: "2022",
        title: "Khu nghỉ dưỡng InterContinental, Phú Quốc", 
        desc: "Chiếu sáng cảnh quan và biệt thự nghỉ dưỡng, tạo không gian thư giãn, hòa mình với thiên nhiên.", 
        img: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
        tags: ["Resort", "Cảnh quan", "IP67"],
        challenge: "Hệ thống chiếu sáng ngoài trời phải có khả năng chống lại sự ăn mòn của hơi muối biển (tiêu chuẩn IP67). Ánh sáng cần tinh tế, hài hòa với thiên nhiên, không phá vỡ không gian nghỉ dưỡng yên tĩnh.",
        solution: "MAXBEN cung cấp các dòng đèn sân vườn, đèn pha và đèn dưới nước có cấp bảo vệ IP67 và vật liệu chống ăn mòn. Ánh sáng vàng ấm được sử dụng để tạo nên một không gian nghỉ dưỡng sang trọng, gần gũi và đầy thư giãn.",
        gallery: [ "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ],
        productsUsed: [
            { name: "Đèn pha LED V2", img: "https://i.ibb.co/CFZJwvQ/MB-Pha-led-V2-01.png" },
            { name: "Đèn Trụ Năng lượng mặt trời", img: "https://i.postimg.cc/Kzsts1pL/page5-img2.jpg" }
        ],
        testimonial: "Làm việc trong môi trường biển đảo, chúng tôi đánh giá rất cao độ bền và khả năng chống ăn mòn của các sản phẩm đèn MAXBEN. Ánh sáng tinh tế, hài hòa với thiên nhiên đã góp phần tạo nên một không gian nghỉ dưỡng thực sự đẳng cấp và yên bình.",
        customerName: "Giám đốc Kỹ thuật, InterContinental Phú Quốc"
    }
];