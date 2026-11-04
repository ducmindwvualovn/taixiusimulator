// ==========================================
// ĐỒ ĐẠC PHÒNG TRỌ & CẦM ĐỒ (SVG)
// ==========================================

function getFurnitureSVG(type, color = '#555') {
    const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`;
    const endSvg = `</svg>`;
    const c = color;
    
    switch(type) {
        case 'fan':
            return baseSvg + `<circle cx="50" cy="50" r="40" fill="none" stroke="${c}" stroke-width="4"/><circle cx="50" cy="50" r="8" fill="${c}"/><path d="M50 50 L50 10 M50 50 L85 70 M50 50 L15 70" stroke="${c}" stroke-width="6" stroke-linecap="round"/><rect x="46" y="85" width="8" height="15" fill="${c}"/>` + endSvg;
        case 'laptop':
            return baseSvg + `<rect x="10" y="20" width="80" height="50" rx="5" fill="${c}"/><rect x="15" y="25" width="70" height="40" fill="#111"/><rect x="5" y="70" width="90" height="10" rx="3" fill="#444"/><circle cx="50" cy="75" r="2" fill="#222"/>` + endSvg;
        case 'tivi':
            return baseSvg + `<rect x="15" y="20" width="70" height="50" rx="5" fill="#222"/><rect x="20" y="25" width="60" height="40" fill="${c}"/><rect x="40" y="70" width="20" height="10" fill="#333"/><rect x="35" y="80" width="30" height="5" fill="#555"/><path d="M80 30 L90 20 M80 40 L90 50" stroke="#222" stroke-width="2"/>` + endSvg;
        case 'vehicle':
            return baseSvg + `<circle cx="30" cy="75" r="15" fill="#111"/><circle cx="70" cy="75" r="15" fill="#111"/><path d="M30 75 L50 45 L70 75" stroke="${c}" stroke-width="8" fill="none"/><rect x="45" y="40" width="10" height="10" fill="${c}"/><path d="M30 75 L15 75 M70 75 L85 75" stroke="${c}" stroke-width="6"/>` + endSvg;
        case 'bed':
            return baseSvg + `<rect x="10" y="60" width="80" height="20" rx="5" fill="#8B4513"/><rect x="15" y="40" width="70" height="20" rx="5" fill="${c}"/><rect x="15" y="30" width="20" height="15" rx="3" fill="#fff"/><rect x="15" y="70" width="80" height="10" fill="#333"/>` + endSvg;
        default:
            return baseSvg + `<rect x="20" y="20" width="60" height="60" fill="${c}"/>` + endSvg;
    }
}

let roomFurniture = JSON.parse(localStorage.getItem('sx_room_furniture')) || [
    { id: 'rf_fan', name: 'Quạt Cây Vinawind Cũ', price: 200000, pawned: false, domId: 'roomObj_fan', type: 'fan', color: '#888' },
    { id: 'rf_laptop', name: 'Laptop Asus Core i3 Cũ', price: 2500000, pawned: false, domId: 'roomObj_laptop', type: 'laptop', color: '#666' },
    { id: 'rf_cooker', name: 'Tivi CRT 21 inch Cũ', price: 800000, pawned: false, domId: 'roomObj_cooker', type: 'tivi', color: '#333' },
    { id: 'rf_vehicle', name: 'Xe Wave Tàu Rách Nát', price: 3000000, pawned: false, domId: 'roomObj_vehicle', type: 'vehicle', color: '#8B0000' }
];

function renderPawnList() {
    const container = document.getElementById('pawnItemList'); 
    if (!container) return;
    container.innerHTML = '';

    const pawnCat1 = document.createElement('div');
    pawnCat1.className = 'font-bold text-amber-400 text-[11px] pb-1 border-b border-amber-900/50 mt-1';
    pawnCat1.innerText = 'ĐỒ ĐẠC PHÒNG TRỌ:';
    container.appendChild(pawnCat1);

    roomFurniture.forEach(item => {
        const svgHtml = getFurnitureSVG(item.type, item.color);
        const box = document.createElement('div');
        box.className = 'bg-[#22160d] border border-[#a16f21]/40 p-2 rounded-xl flex items-center justify-between flex-shrink-0';
        box.innerHTML = `
            <div class="flex items-center gap-2.5">
                <div class="w-12 h-12 rounded-lg overflow-hidden border border-amber-600/40 bg-black/40 flex items-center justify-center">${svgHtml}</div>
                <div>
                    <div class="font-bold text-white text-xs">${item.name}</div>
                    <div class="text-[10px] text-amber-400 font-mono font-bold">${item.price.toLocaleString()}đ</div>
                </div>
            </div>
            <div>
                ${item.pawned ? `<button onclick="redeemRoomItem('${item.id}')" class="bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold px-2.5 py-1.5 rounded-lg text-[10px]">Chuộc (${(Math.floor(item.price*1.1)).toLocaleString()}đ)</button>` : `<button onclick="pawnRoomItem('${item.id}')" class="bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-black px-2.5 py-1.5 rounded-lg text-[10px]">Cầm Đồ</button>`}
            </div>
        `;
        container.appendChild(box);
    });

    const pawnCat2 = document.createElement('div');
    pawnCat2.className = 'font-bold text-yellow-400 text-[11px] pb-1 border-b border-amber-900/50 mt-3';
    pawnCat2.innerText = 'ĐỒ HIỆU & XE ĐÃ MUA (>2 TRIỆU):';
    container.appendChild(pawnCat2);

    let luxuryItems = [
        ...carList.filter(c => c.owned && c.price >= 2000000).map(c => ({ ...c, cat: 'car' })),
        ...fashionList.filter(f => f.owned && f.price >= 2000000).map(f => ({ ...f, cat: 'fashion' })),
        ...houseList.filter(h => h.owned && h.price >= 2000000).map(h => ({ ...h, cat: 'house' }))
    ];

    if (luxuryItems.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'text-[10px] text-gray-500 italic p-2 text-center';
        emptyMsg.innerText = 'Chưa có đồ hiệu nào giá từ 2,000,000đ trở lên.';
        container.appendChild(emptyMsg);
    } else {
        luxuryItems.forEach(item => {
            const pawnValue = Math.floor(item.price * 0.7);
            let svgHtml = '';
            if (item.cat === 'car') svgHtml = getCarSVG(item.type, item.color);
            else if (item.cat === 'fashion') svgHtml = getFashionSVG(item.type, item.bg, item.label);
            else svgHtml = `<div class="w-full h-full bg-cover bg-center" style="background-image: url('${item.image}')"></div>`;

            const box = document.createElement('div');
            box.className = 'bg-[#22160d] border border-yellow-500/30 p-2 rounded-xl flex items-center justify-between flex-shrink-0';
            box.innerHTML = `
                <div class="flex items-center gap-2.5">
                    <div class="w-12 h-12 rounded-lg overflow-hidden border border-yellow-500/40 bg-black/40 flex items-center justify-center">${svgHtml}</div>
                    <div>
                        <div class="font-bold text-white text-xs">${item.name}</div>
                        <div class="text-[10px] text-yellow-400 font-mono font-bold">Cầm: ${pawnValue.toLocaleString()}đ • <span class="text-rose-400">-${item.luck}% Luck</span></div>
                    </div>
                </div>
                <div>
                    ${item.pawned 
                        ? `<button onclick="redeemLuxuryItem('${item.cat}', '${item.id}')" class="bg-stone-800 hover:bg-stone-700 text-emerald-400 font-bold px-2.5 py-1.5 rounded-lg text-[10px]">Chuộc (${(Math.floor(pawnValue * 1.1)).toLocaleString()}đ)</button>` 
                        : `<button onclick="pawnLuxuryItem('${item.cat}', '${item.id}')" class="bg-gradient-to-r from-red-600 to-amber-600 text-white font-black px-2.5 py-1.5 rounded-lg text-[10px]">Cầm Lấy Tiền</button>`
                    }
                </div>
            `;
            container.appendChild(box);
        });
    }
}

function pawnRoomItem(id) {
    const it = roomFurniture.find(x => x.id === id);
    if (it && !it.pawned) {
        it.pawned = true; balance += it.price;
        playTone('win'); showFloatingText(`+${it.price.toLocaleString()}đ CẦM ĐỒ!`, '#2ecc71');
        updateGameDisplay(); renderPawnList(); updateRoomAndCharacterVisual(); syncDataToFirestore(false);
    }
}

function redeemRoomItem(id) {
    const it = roomFurniture.find(x => x.id === id);
    if (it && it.pawned) {
        const cost = Math.floor(it.price * 1.1);
        if (balance < cost) return showFloatingText(`KHÔNG ĐỦ TIỀN CHUỘC!`, '#e74c3c');
        balance -= cost; it.pawned = false;
        playTone('chip'); showFloatingText(`Chuộc lại ${it.name}!`, '#3498db');
        updateGameDisplay(); renderPawnList(); updateRoomAndCharacterVisual(); syncDataToFirestore(false);
    }
}

function pawnLuxuryItem(cat, id) {
    let targetList = (cat === 'car') ? carList : (cat === 'fashion' ? fashionList : houseList);
    const item = targetList.find(x => x.id === id);
    if (item && item.owned && !item.pawned) {
        const pawnVal = Math.floor(item.price * 0.7);
        item.pawned = true; item.pawnedAt = Date.now();
        balance += pawnVal;
        playTone('win'); showFloatingText(`+${pawnVal.toLocaleString()}đ (Mất -${item.luck}% Luck)`, '#e67e22');
        calcTotalLuckAndRender(); updateGameDisplay(); renderPawnList(); updateRoomAndCharacterVisual(); syncDataToFirestore(false);
    }
}

function redeemLuxuryItem(cat, id) {
    let targetList = (cat === 'car') ? carList : (cat === 'fashion' ? fashionList : houseList);
    const item = targetList.find(x => x.id === id);
    if (item && item.pawned) {
        const redeemCost = Math.floor(item.price * 0.7 * 1.1);
        if (balance < redeemCost) return showFloatingText(`KHÔNG ĐỦ TIỀN CHUỘC!`, '#e74c3c');
        balance -= redeemCost; item.pawned = false; item.pawnedAt = 0;
        playTone('chip'); showFloatingText(`Chuộc thành công! (+${item.luck}% Luck)`, '#2ecc71');
        calcTotalLuckAndRender(); updateGameDisplay(); renderPawnList(); updateRoomAndCharacterVisual(); syncDataToFirestore(false);
    }
}