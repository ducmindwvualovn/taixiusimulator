// ==========================================
// DANH SÁCH NHÀ & TRẠNG THÁI SỞ HỮU (SVG)
// ==========================================

// Hàm tạo ảnh nền SVG cho từng cấp nhà
function getHouseBackground(type) {
    const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">`;
    const endSvg = `</svg>`;

    switch(type) {
        case 'room-slum': // Phòng trọ ọp ẹp
            return baseSvg + `
                <rect width="1000" height="600" fill="#2d2218"/>
                <rect width="1000" height="450" fill="#3d2e22"/>
                <g stroke="#2a1e15" stroke-width="2" opacity="0.4">
                    ${Array.from({length: 20}, (_, i) => `<line x1="0" y1="${i*25}" x2="1000" y2="${i*25}"/>`).join('')}
                    ${Array.from({length: 20}, (_, i) => `<line x1="${i*50}" y1="0" x2="${i*50}" y2="450"/>`).join('')}
                </g>
                <circle cx="200" cy="100" r="40" fill="#1a0f08" opacity="0.5"/>
                <circle cx="800" cy="300" r="60" fill="#1a0f08" opacity="0.4"/>
                <rect x="400" y="100" width="200" height="250" fill="#0a0603" stroke="#1a0f08" stroke-width="8"/>
                <rect x="495" y="100" width="10" height="250" fill="#1a0f08"/>
                <rect x="400" y="220" width="200" height="10" fill="#1a0f08"/>
                <circle cx="500" cy="80" r="20" fill="#d4af37" opacity="0.6"/>
                <path d="M480 80 Q500 120 520 80" fill="#d4af37" opacity="0.2"/>
                <rect y="450" width="1000" height="150" fill="#1a0f08"/>
                <line x1="0" y1="450" x2="1000" y2="450" stroke="#0a0603" stroke-width="4"/>
            ` + endSvg;

        case 'room-apartment': // Nhà trọ khá / Chung cư
            return baseSvg + `
                <rect width="1000" height="600" fill="#202b38"/>
                <rect width="1000" height="450" fill="#34495e"/>
                <rect x="150" y="80" width="700" height="300" fill="#87CEEB" stroke="#ecf0f1" stroke-width="10" rx="5"/>
                <rect x="480" y="80" width="10" height="300" fill="#ecf0f1"/>
                <rect x="150" y="220" width="700" height="10" fill="#ecf0f1"/>
                <path d="M150 80 Q130 230 150 380 L200 380 Q180 230 200 80 Z" fill="#bdc3c7" opacity="0.8"/>
                <path d="M850 80 Q870 230 850 380 L800 380 Q820 230 800 80 Z" fill="#bdc3c7" opacity="0.8"/>
                <circle cx="500" cy="50" r="15" fill="#f1c40f"/>
                <path d="M500 0 L500 50" stroke="#333" stroke-width="2"/>
                <circle cx="500" cy="50" r="40" fill="#f1c40f" opacity="0.1"/>
                <rect y="450" width="1000" height="150" fill="#8e6e53"/>
                <g stroke="#6b4f3a" stroke-width="2" opacity="0.5">
                    ${Array.from({length: 10}, (_, i) => `<line x1="0" y1="${460 + i*15}" x2="1000" y2="${460 + i*15}"/>`).join('')}
                </g>
            ` + endSvg;

        case 'room-mansion': // Biệt thự
            return baseSvg + `
                <rect width="1000" height="600" fill="#422a10"/>
                <rect width="1000" height="450" fill="#5d4037"/>
                <g stroke="#4e342e" stroke-width="2" opacity="0.3">
                    ${Array.from({length: 15}, (_, i) => `<line x1="${i*70}" y1="0" x2="${i*70}" y2="450"/>`).join('')}
                </g>
                <path d="M200 400 L200 150 Q300 50 400 150 L400 400 Z" fill="#87CEEB" stroke="#d4af37" stroke-width="8"/>
                <path d="M600 400 L600 150 Q700 50 800 150 L800 400 Z" fill="#87CEEB" stroke="#d4af37" stroke-width="8"/>
                <path d="M200 150 Q230 270 200 400 L250 400 Q270 270 250 150 Z" fill="#8e0000"/>
                <path d="M600 150 Q630 270 600 400 L650 400 Q670 270 650 150 Z" fill="#8e0000"/>
                <path d="M500 0 L500 60" stroke="#d4af37" stroke-width="4"/>
                <circle cx="500" cy="80" r="30" fill="#d4af37" opacity="0.8"/>
                <circle cx="470" cy="100" r="10" fill="#fff" opacity="0.8"/>
                <circle cx="530" cy="100" r="10" fill="#fff" opacity="0.8"/>
                <circle cx="500" cy="120" r="10" fill="#fff" opacity="0.8"/>
                <circle cx="500" cy="80" r="50" fill="#d4af37" opacity="0.2"/>
                <rect y="450" width="1000" height="150" fill="#2c3e50"/>
                <g stroke="#34495e" stroke-width="2" opacity="0.4">
                    ${Array.from({length: 10}, (_, i) => `<line x1="${i*100}" y1="450" x2="${i*100}" y2="600"/>`).join('')}
                </g>
            ` + endSvg;

        case 'room-palace': // Dinh thự
            return baseSvg + `
                <rect width="1000" height="600" fill="#4c1143"/>
                <rect width="1000" height="450" fill="#6b1b5c"/>
                <rect x="50" y="0" width="80" height="450" fill="#d4af37" opacity="0.3"/>
                <rect x="870" y="0" width="80" height="450" fill="#d4af37" opacity="0.3"/>
                <rect x="450" y="0" width="100" height="450" fill="#d4af37" opacity="0.2"/>
                <path d="M300 400 L300 100 Q500 0 700 100 L700 400 Z" fill="#87CEEB" stroke="#f1c40f" stroke-width="12"/>
                <path d="M300 100 Q340 250 300 400 L350 400 Q380 250 350 100 Z" fill="#f1c40f" opacity="0.6"/>
                <path d="M700 100 Q660 250 700 400 L650 400 Q620 250 650 100 Z" fill="#f1c40f" opacity="0.6"/>
                <path d="M500 0 L500 40" stroke="#f1c40f" stroke-width="6"/>
                <circle cx="500" cy="60" r="40" fill="#f1c40f"/>
                <circle cx="460" cy="90" r="15" fill="#fff"/>
                <circle cx="540" cy="90" r="15" fill="#fff"/>
                <circle cx="500" cy="110" r="15" fill="#fff"/>
                <circle cx="500" cy="60" r="80" fill="#f1c40f" opacity="0.2"/>
                <rect y="450" width="1000" height="150" fill="#2c1a30"/>
            ` + endSvg;

        default:
            return baseSvg + `<rect width="100%" height="100%" fill="#000"/>` + endSvg;
    }
}

function svgToDataUri(svg) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

let houseList = [
    { id: 'h0', name: 'Phòng Trọ 15m²', price: 0, luck: 0, owned: true, pawned: false, classBg: 'room-slum', desc: 'Mái tôn dột nát, ẩm thấp.', rank: 'Sinh Viên Nghèo', image: svgToDataUri(getHouseBackground('room-slum')) },
    { id: 'h1', name: 'Nhà Trọ 35m²', price: 450000000, luck: 40, owned: false, pawned: false, classBg: 'room-apartment', desc: 'Có điều hòa, ban công.', rank: 'Sinh Viên Có Điều Kiện', image: svgToDataUri(getHouseBackground('room-apartment')) },
    { id: 'h2', name: 'Chung Cư Vinhomes', price: 8400000000, luck: 250, owned: false, pawned: false, classBg: 'room-apartment', desc: 'Căn hộ cao cấp 2PN.', rank: 'Thành Đạt Tuổi Trẻ', image: svgToDataUri(getHouseBackground('room-apartment')) },
    { id: 'h3', name: 'Biệt Thự Riverside', price: 105000000000, luck: 1200, owned: false, pawned: false, classBg: 'room-mansion', desc: 'Sân vườn rộng, nội thất Ý.', rank: 'Đại Gia Phố Cổ', image: svgToDataUri(getHouseBackground('room-mansion')) },
    { id: 'h4', name: 'Dinh Thự Hồ Tây', price: 360000000000, luck: 3500, owned: false, pawned: false, classBg: 'room-palace', desc: 'View trọn Hồ Tây, người hầu.', rank: 'Ông Trùm Tài Phiệt', image: svgToDataUri(getHouseBackground('room-palace')) }
];

if (localStorage.getItem('sx_house_list')) {
    try {
        const saved = JSON.parse(localStorage.getItem('sx_house_list'));
        houseList.forEach((h, idx) => {
            if (saved[idx]) { h.owned = saved[idx].owned; h.pawned = saved[idx].pawned; }
        });
    } catch (e) {}
}