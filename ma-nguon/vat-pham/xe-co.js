// ==========================================
// DANH SÁCH XE CỘ & TRẠNG THÁI SỞ HỮU
// ==========================================
function getCarSVG(type, color = '#444') {
    const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`;
    const endSvg = `</svg>`;
    const c = color;
    
    switch(type) {
        case 'bicycle':
            return baseSvg + `<path d="M40 80 Q20 80 20 100 Q20 120 40 120 Q60 120 60 100 Q60 80 40 80 M160 80 Q140 80 140 100 Q140 120 160 120 Q180 120 180 100 Q180 80 160 80 M40 100 L80 50 L130 50 L160 100 M80 50 L100 100 M110 50 L100 50" stroke="${c}" stroke-width="6" fill="none"/>` + endSvg;
        case 'motorbike':
            return baseSvg + `<circle cx="50" cy="95" r="20" fill="#333"/><circle cx="150" cy="95" r="20" fill="#333"/><path d="M50 95 L90 60 L130 60 L150 95" stroke="${c}" stroke-width="6" fill="none"/><rect x="80" y="40" width="40" height="15" rx="5" fill="#222"/><path d="M110 40 L120 60" stroke="black" stroke-width="4"/><path d="M50 95 L90 95" stroke="black" stroke-width="8"/>` + endSvg;
        case 'car':
            return baseSvg + `<path d="M30 90 L40 60 L80 40 L140 40 L170 60 L180 90 Z" fill="${c}"/><rect x="50" y="60" width="20" height="15" rx="3" fill="#87CEEB"/><rect x="90" y="60" width="20" height="15" rx="3" fill="#87CEEB"/><rect x="130" y="60" width="20" height="15" rx="3" fill="#87CEEB"/><circle cx="60" cy="100" r="18" fill="#111"/><circle cx="60" cy="100" r="8" fill="#444"/><circle cx="150" cy="100" r="18" fill="#111"/><circle cx="150" cy="100" r="8" fill="#444"/>` + endSvg;
        case 'supercar':
            return baseSvg + `<path d="M20 100 L30 70 L70 50 L130 50 L170 70 L190 100 Z" fill="${c}"/><polygon points="40,80 60,60 100,55 100,80" fill="#111"/><polygon points="120,55 150,60 170,80 120,80" fill="#111"/><circle cx="60" cy="110" r="15" fill="#333"/><circle cx="150" cy="110" r="15" fill="#333"/><rect x="80" y="50" width="40" height="5" fill="#fff"/>` + endSvg;
        case 'sportbike':
            return baseSvg + `<path d="M40 90 L80 40 L130 40 L160 90 Z" fill="${c}"/><circle cx="50" cy="105" r="18" fill="#111"/><circle cx="150" cy="105" r="18" fill="#111"/><path d="M80 40 L100 70 L130 70 L150 40" stroke="black" stroke-width="4" fill="none"/><rect x="80" y="30" width="30" height="10" rx="5" fill="#222"/>` + endSvg;
        default:
            return baseSvg + `<circle cx="100" cy="60" r="40" fill="${c}"/>` + endSvg;
    }
}

const baseCarBrands = [
    { name: "Xe Đạp Phượng Hoàng Cũ", price: 0, luck: 0, type: 'bicycle', color: '#8B4513' },
    { name: "Xe Đạp Mini Nhật", price: 2400000, luck: 1, type: 'bicycle', color: '#FF69B4' },
    { name: "Honda Super Cub 50cc Cũ", price: 12000000, luck: 2, type: 'motorbike', color: '#2F4F4F' },
    { name: "Wave Alpha Đời 2005", price: 24000000, luck: 3, type: 'motorbike', color: '#8B0000' },
    { name: "Yamaha Sirius 110", price: 45000000, luck: 6, type: 'motorbike', color: '#000080' },
    { name: "Honda Dream Thái Zin", price: 75000000, luck: 8, type: 'motorbike', color: '#A52A2A' },
    { name: "Yamaha Exciter 150", price: 105000000, luck: 12, type: 'sportbike', color: '#000000' },
    { name: "Honda Air Blade 125", price: 126000000, luck: 15, type: 'motorbike', color: '#808000' },
    { name: "Yamaha NVX 155", price: 162000000, luck: 18, type: 'sportbike', color: '#555555' },
    { name: "Vespa Sprint 125", price: 255000000, luck: 25, type: 'motorbike', color: '#DAA520' },
    { name: "Honda SH 150i ABS", price: 360000000, luck: 35, type: 'motorbike', color: '#FFFFFF' },
    { name: "Honda SH 350i Thể Thao", price: 495000000, luck: 45, type: 'motorbike', color: '#800080' },
    { name: "Kawasaki Ninja 400", price: 555000000, luck: 50, type: 'sportbike', color: '#00FF00' },
    { name: "Ducati Monster 821", price: 1050000000, luck: 65, type: 'sportbike', color: '#FF0000' },
    { name: "Kia Morning Cũ", price: 750000000, luck: 55, type: 'car', color: '#FFA500' },
    { name: "Hyundai Grand i10", price: 1140000000, luck: 70, type: 'car', color: '#FFFFFF' },
    { name: "Toyota Vios E", price: 1560000000, luck: 85, type: 'car', color: '#C0C0C0' },
    { name: "Honda City RS", price: 1830000000, luck: 95, type: 'car', color: '#000000' },
    { name: "Mazda 3 Premium", price: 2340000000, luck: 110, type: 'car', color: '#FF0000' },
    { name: "Toyota Camry 2.5Q", price: 4350000000, luck: 160, type: 'car', color: '#FFFFFF' },
    { name: "Honda CR-V Turbo", price: 3450000000, luck: 140, type: 'car', color: '#A52A2A' },
    { name: "Mercedes-Benz C300 AMG", price: 6300000000, luck: 250, type: 'supercar', color: '#000000' },
    { name: "Mercedes-Benz E300 AMG", price: 9600000000, luck: 320, type: 'supercar', color: '#000000' },
    { name: "BMW 330i M Sport", price: 6000000000, luck: 240, type: 'supercar', color: '#0000FF' },
    { name: "BMW 530i Luxury", price: 10200000000, luck: 340, type: 'supercar', color: '#0000FF' },
    { name: "Mercedes-Benz S450 Luxury", price: 16800000000, luck: 450, type: 'supercar', color: '#000000' },
    { name: "Lexus RX 350", price: 13200000000, luck: 400, type: 'supercar', color: '#000000' },
    { name: "Lexus LX 600 VIP", price: 28500000000, luck: 650, type: 'supercar', color: '#000000' },
    { name: "Porsche Macan GTS", price: 14400000000, luck: 420, type: 'supercar', color: '#FFFFFF' },
    { name: "Porsche 911 Carrera S", price: 26400000000, luck: 600, type: 'supercar', color: '#FFFFFF' },
    { name: "Porsche Panamera 4S", price: 21600000000, luck: 520, type: 'supercar', color: '#FFFFFF' },
    { name: "Mercedes-AMG G63", price: 36000000000, luck: 800, type: 'car', color: '#000000' },
    { name: "Range Rover SV Autobiography", price: 43500000000, luck: 900, type: 'car', color: '#FFFFFF' },
    { name: "Aston Martin DB11", price: 49500000000, luck: 980, type: 'supercar', color: '#0000FF' },
    { name: "Bentley Flying Spur", price: 58500000000, luck: 1100, type: 'supercar', color: '#000000' },
    { name: "Bentley Continental GT", price: 64500000000, luck: 1200, type: 'supercar', color: '#FFFFFF' },
    { name: "Ferrari Roma", price: 67500000000, luck: 1300, type: 'supercar', color: '#FF0000' },
    { name: "Ferrari 488 Pista Spider", price: 99000000000, luck: 1500, type: 'supercar', color: '#FF0000' },
    { name: "Ferrari SF90 Stradale", price: 126000000000, luck: 1800, type: 'supercar', color: '#FF0000' },
    { name: "Lamborghini Huracan EVO", price: 81000000000, luck: 1400, type: 'supercar', color: '#FFFF00' },
    { name: "Lamborghini Aventador SVJ", price: 174000000000, luck: 2200, type: 'supercar', color: '#FFFF00' },
    { name: "Lamborghini Revuelto V12 Hybrid", price: 204000000000, luck: 2600, type: 'supercar', color: '#FFFF00' },
    { name: "McLaren 720S Spider", price: 78000000000, luck: 1350, type: 'supercar', color: '#FF8C00' },
    { name: "McLaren Senna", price: 234000000000, luck: 2900, type: 'supercar', color: '#FF8C00' },
    { name: "Rolls-Royce Ghost Black Badge", price: 108000000000, luck: 1600, type: 'supercar', color: '#000000' },
    { name: "Rolls-Royce Cullinan VIP", price: 132000000000, luck: 1900, type: 'car', color: '#FFFFFF' },
    { name: "Rolls-Royce Phantom VIII", price: 225000000000, luck: 3000, type: 'supercar', color: '#FFFFFF' },
    { name: "Bugatti Chiron Pur Sport", price: 294000000000, luck: 4000, type: 'supercar', color: '#0000FF' },
    { name: "Koenigsegg Jesko Attack", price: 345000000000, luck: 5000, type: 'supercar', color: '#FFFFFF' },
    { name: "Rolls-Royce Boat Tail Độc Bản", price: 780000000000, luck: 8888, type: 'supercar', color: '#DAA520' }
];

let carList = baseCarBrands.map((c, i) => ({ id: `car_${i}`, name: c.name, price: c.price, luck: c.luck, type: c.type, color: c.color, owned: (i === 0), pawned: false, equipped: (i === 0), pawnedAt: 0 }));

if (localStorage.getItem('sx_car_list')) {
    try {
        const saved = JSON.parse(localStorage.getItem('sx_car_list'));
        carList.forEach((c, idx) => {
            if (saved[idx]) { c.owned = saved[idx].owned; c.pawned = saved[idx].pawned; c.equipped = saved[idx].equipped; c.pawnedAt = saved[idx].pawnedAt || 0; }
        });
    } catch (e) {}
}