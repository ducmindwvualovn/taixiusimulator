// ==========================================
// DANH SÁCH THỜI TRANG (VẼ BẰNG SVG)
// ==========================================

// Hàm vẽ đồ thời trang
function getFashionSVG(type, color = '#444', label = '') {
    const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">`;
    const endSvg = `</svg>`;
    const c = color;
    
    switch(type) {
        case 'shirt':
            return baseSvg + `<path d="M30 20 L20 50 L30 50 L30 90 L70 90 L70 50 L80 50 L70 20 L60 30 L50 20 L40 30 Z" fill="${c}" stroke="#222" stroke-width="2"/><text x="50" y="65" font-size="8" fill="#fff" text-anchor="middle" font-family="Arial">${label}</text>` + endSvg;
        case 'pant':
            return baseSvg + `<path d="M30 20 L30 90 L45 90 L50 60 L55 90 L70 90 L70 20 Z" fill="${c}" stroke="#222" stroke-width="2"/><rect x="30" y="20" width="40" height="5" fill="#000" opacity="0.3"/>` + endSvg;
        case 'shoe':
            return baseSvg + `<path d="M20 70 Q20 50 40 50 L60 60 Q80 60 85 80 L85 90 L15 90 Z" fill="${c}" stroke="#222" stroke-width="2"/><path d="M40 55 L60 65" stroke="#fff" stroke-width="2"/><rect x="15" y="85" width="70" height="5" fill="#111"/>` + endSvg;
        case 'watch':
            return baseSvg + `<circle cx="50" cy="50" r="30" fill="${c}" stroke="#DAA520" stroke-width="4"/><circle cx="50" cy="50" r="25" fill="#111"/><path d="M50 50 L50 30 M50 50 L65 55" stroke="#fff" stroke-width="2"/><rect x="35" y="15" width="30" height="10" rx="3" fill="#333"/><rect x="35" y="75" width="30" height="10" rx="3" fill="#333"/>` + endSvg;
        default:
            return baseSvg + `<rect x="20" y="20" width="60" height="60" fill="${c}"/>` + endSvg;
    }
}

const baseFashionItems = [
    { name: "Áo Thun Chợ Đêm", price: 105000, luck: 0, type: "shirt", bg: "#44403c", label: "CHỢ" },
    { name: "Áo Ba Lỗ May Ô", price: 90000, luck: 0, type: "shirt", bg: "#ffffff", label: "BA LỖ" },
    { name: "Áo Sơ Mi Thực Tập", price: 450000, luck: 0, type: "shirt", bg: "#2563eb", label: "SƠ MI" },
    { name: "Áo Khoác Shipper", price: 660000, luck: 0, type: "shirt", bg: "#059669", label: "SHIPPER" },
    { name: "Áo Local Brand Fake", price: 540000, luck: 0, type: "shirt", bg: "#52525b", label: "FAKE" },
    { name: "Quần Đùi Rách", price: 75000, luck: 0, type: "pant", bg: "#1c1917", label: "" },
    { name: "Quần Jeans Chợ", price: 360000, luck: 0, type: "pant", bg: "#1e3a8a", label: "" },
    { name: "Dép Tổ Ong", price: 60000, luck: 0, type: "shoe", bg: "#78350f", label: "" },
    { name: "Giày Thượng Đình", price: 255000, luck: 0, type: "shoe", bg: "#dc2626", label: "" },
    { name: "Áo Hoodie Nike", price: 5400000, luck: 2, type: "shirt", bg: "#111827", label: "NIKE" },
    { name: "Áo FOG Essentials", price: 8400000, luck: 6, type: "shirt", bg: "#78716c", label: "FOG" },
    { name: "Áo Stussy 8 Ball", price: 9600000, luck: 8, type: "shirt", bg: "#18181b", label: "STUSSY" },
    { name: "Áo Polo Lacoste", price: 10500000, luck: 9, type: "shirt", bg: "#064e3b", label: "LACOSTE" },
    { name: "Quần Nỉ FOG", price: 10500000, luck: 9, type: "pant", bg: "#57534e", label: "" },
    { name: "Giày Nike AF1", price: 8400000, luck: 7, type: "shoe", bg: "#f8fafc", label: "" },
    { name: "Giày Yeezy 350", price: 23400000, luck: 15, type: "shoe", bg: "#d6d3d1", label: "" },
    { name: "Giày AJ1 Chicago", price: 28500000, luck: 18, type: "shoe", bg: "#b91c1c", label: "" },
    { name: "Áo Bape Shark", price: 33000000, luck: 22, type: "shirt", bg: "#047857", label: "BAPE" },
    { name: "Áo Thom Browne", price: 43500000, luck: 26, type: "shirt", bg: "#f8fafc", label: "TB" },
    { name: "Quần Tây TB", price: 54000000, luck: 32, type: "pant", bg: "#475569", label: "" },
    { name: "Quần Jean Dsquared2", price: 42000000, luck: 25, type: "pant", bg: "#1e293b", label: "" },
    { name: "Giày McQueen", price: 40500000, luck: 28, type: "shoe", bg: "#e2e8f0", label: "" },
    { name: "Áo LV Monogram", price: 84000000, luck: 50, type: "shirt", bg: "#78350f", label: "LV" },
    { name: "Áo Phao Moncler", price: 114000000, luck: 65, type: "shirt", bg: "#09090b", label: "MONCLER" },
    { name: "Áo Da Chrome Hearts", price: 255000000, luck: 120, type: "shirt", bg: "#1c1917", label: "CHROME" },
    { name: "Quần Chrome Hearts", price: 360000000, luck: 160, type: "pant", bg: "#1e293b", label: "" },
    { name: "Giày Dior x AJ1", price: 630000000, luck: 250, type: "shoe", bg: "#cbd5e1", label: "" },
    { name: "Đồng Hồ Rolex", price: 1140000000, luck: 350, type: "watch", bg: "#064e3b", label: "" },
    { name: "Đồng Hồ Patek", price: 7800000000, luck: 1500, type: "watch", bg: "#09090b", label: "" }
];

let fashionList = [];
const luxuryBrands = ["Gucci", "LV", "Balenciaga", "Off-White", "Givenchy", "Versace", "Prada", "Burberry", "Fendi", "Hermès"];

baseFashionItems.forEach((item, index) => {
    const svg = getFashionSVG(item.type, item.bg, item.label);
    fashionList.push({ id: `fsh_${index}`, name: item.name, price: item.price, luck: item.luck, type: item.type, bg: item.bg, image: svg, owned: (index === 0 || index === 5 || index === 7), pawned: false, equipped: (index === 0 || index === 5 || index === 7), pawnedAt: 0 });
});

luxuryBrands.forEach((brand, bIdx) => {
    const shirtSvg = getFashionSVG('shirt', '#1e1b4b', brand);
    const pantSvg = getFashionSVG('pant', '#312e81', '');
    const shoeSvg = getFashionSVG('shoe', '#4338ca', '');
    
    fashionList.push({ id: `brand_tee_${bIdx}`, name: `Áo ${brand} Paris`, price: (24 + bIdx * 9) * 1000000, luck: 16 + bIdx * 5, type: "shirt", bg: "#1e1b4b", image: shirtSvg, owned: false, pawned: false, equipped: false, pawnedAt: 0 });
    fashionList.push({ id: `brand_pant_${bIdx}`, name: `Quần Cargo ${brand}`, price: (36 + bIdx * 12) * 1000000, luck: 22 + bIdx * 6, type: "pant", bg: "#312e81", image: pantSvg, owned: false, pawned: false, equipped: false, pawnedAt: 0 });
    fashionList.push({ id: `brand_shoe_${bIdx}`, name: `Sneaker ${brand}`, price: (45 + bIdx * 15) * 1000000, luck: 28 + bIdx * 7, type: "shoe", bg: "#4338ca", image: shoeSvg, owned: false, pawned: false, equipped: false, pawnedAt: 0 });
});

if (localStorage.getItem('sx_fashion_list')) {
    try {
        const saved = JSON.parse(localStorage.getItem('sx_fashion_list'));
        fashionList.forEach((f, idx) => {
            if (saved[idx]) { f.owned = saved[idx].owned; f.pawned = saved[idx].pawned; f.equipped = saved[idx].equipped; f.pawnedAt = saved[idx].pawnedAt || 0; }
        });
    } catch (e) {}
}