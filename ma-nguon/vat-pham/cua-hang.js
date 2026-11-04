// ==========================================
// CỬA HÀNG - SHOP ĐỔI ĐỜI (XE, FASHION, NHÀ)
// ==========================================
function switchStoreTab(tab) {
    playTone('chip');
    document.getElementById('tabBtnCar').className = `flex-1 py-2 font-bold ${tab === 'car' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`;
    document.getElementById('tabBtnFashion').className = `flex-1 py-2 font-bold ${tab === 'fashion' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`;
    document.getElementById('tabBtnHouse').className = `flex-1 py-2 font-bold ${tab === 'house' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`;
    renderStoreList(tab);
}

function renderStoreList(category) {
    const container = document.getElementById('storeItemsList'); container.innerHTML = '';
    const list = (category === 'car') ? carList : (category === 'fashion' ? fashionList : houseList);
    
    list.forEach(item => {
        // Lấy ảnh SVG tương ứng với từng loại
        let imageHtml = '';
        if (category === 'car') {
            imageHtml = `<div class="w-full h-full flex items-center justify-center">${getCarSVG(item.type, item.color)}</div>`;
        } else if (category === 'fashion') {
            imageHtml = `<div class="w-full h-full flex items-center justify-center">${getFashionSVG(item.type, item.bg, item.label)}</div>`;
        } else if (category === 'house') {
            // Nếu là nhà thì hiển thị ảnh nền SVG làm thumbnail
            imageHtml = `<div class="w-full h-full bg-cover bg-center" style="background-image: url('${item.image}')"></div>`;
        }

        const box = document.createElement('div');
        box.className = 'bg-[#19152e] border border-purple-500/40 p-2.5 rounded-2xl flex flex-col gap-2 flex-shrink-0 shadow-lg';
        box.innerHTML = `
            <div class="flex gap-3 items-center">
                <div class="w-20 h-16 rounded-xl overflow-hidden bg-black/60 border border-purple-400/40 flex-shrink-0 shadow relative">
                    ${imageHtml}
                </div>
                <div class="flex-1 min-w-0">
                    <div class="font-black text-white text-xs truncate leading-snug">${item.name}</div>
                    <div class="text-[11px] text-yellow-300 font-bold font-mono mt-0.5">${item.price === 0 ? 'Mặc Định' : item.price.toLocaleString() + 'đ'}</div>
                    <div class="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5"><i class="fa-solid fa-sparkles text-[9px]"></i> +${item.luck}% May Mắn</div>
                </div>
            </div>
            <div class="flex justify-between items-center pt-2 border-t border-purple-900/40">
                <span class="text-[9px] text-gray-400">Hình ảnh 3D 100%</span>
                ${item.owned 
                    ? `<span class="text-emerald-400 font-black text-[10px] px-3 py-1 bg-emerald-950/80 rounded-lg border border-emerald-500/50">Đã Sở Hữu</span>` 
                    : `<button onclick="buyStoreItem('${category}', '${item.id}')" class="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-black px-4 py-1.5 rounded-xl text-[11px] shadow hover:brightness-110 active:scale-95 transition flex items-center gap-1"><i class="fa-solid fa-cart-shopping text-xs"></i> <span>Mua Ngay</span></button>`
                }
            </div>
        `;
        container.appendChild(box);
    });
}

function buyStoreItem(cat, id) {
    const list = (cat === 'car') ? carList : (cat === 'fashion' ? fashionList : houseList);
    const item = list.find(x => x.id === id);
    if (item && !item.owned) {
        if (balance < item.price) return showFloatingText(`SỐ DƯ KHÔNG ĐỦ TIỀN!`, '#e74c3c');
        balance -= item.price; item.owned = true;
        if (cat === 'house') { houseList.forEach(h => h.owned = false); item.owned = true; }
        playTone('win'); showFloatingText(`Mua thành công ${item.name}!`, '#2ecc71');
        calcTotalLuckAndRender(); updateGameDisplay(); renderStoreList(cat); updateRoomAndCharacterVisual(); syncDataToFirestore(false);
    }
}

function renderHistory() {
    const container = document.getElementById('historyList'); container.innerHTML = '';
    if (betHistory.length === 0) { container.innerHTML = `<div class="text-center text-gray-500 mt-10">Chưa có lịch sử cược nào.</div>`; return; }
    betHistory.forEach(item => {
        const isWin = item.result === 'THẮNG'; const isLose = item.result === 'THUA';
        const color = isWin ? 'text-emerald-400' : (isLose ? 'text-red-400' : 'text-yellow-400');
        const box = document.createElement('div');
        box.className = 'bg-[#1a1a1a] border border-stone-700 p-2.5 rounded-xl flex justify-between items-center';
        box.innerHTML = `<div><div class="flex items-center gap-2"><span class="text-[10px] text-gray-500">#${item.session}</span><span class="font-bold ${item.door === 'TÀI' ? 'text-red-500' : 'text-sky-400'}">${item.door}</span><span class="text-[10px] text-gray-400">${item.betAmount.toLocaleString()}đ</span></div><div class="text-[10px] text-gray-500 mt-0.5">Kết quả: ${item.outcome} | ${item.time}</div></div><div class="text-right"><div class="font-black text-xs ${color}">${item.result}</div><div class="text-[10px] ${isWin ? 'text-emerald-300' : 'text-gray-600'}">${isWin ? '+' + item.winAmount.toLocaleString() : (isLose ? '-' + item.betAmount.toLocaleString() : '0')}</div></div>`;
        container.appendChild(box);
    });
}