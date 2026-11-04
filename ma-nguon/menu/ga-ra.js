// ==========================================
// GA-RA - GARAGE PHƯƠNG TIỆN (SVG)
// ==========================================
function openGarage() {
    playTone('chip'); renderGarage();
    document.getElementById('garageModal').classList.remove('hidden');
    document.getElementById('garageModal').classList.add('flex');
    lockBodyScroll();
}
function closeGarage() {
    playTone('chip');
    document.getElementById('garageModal').classList.remove('flex');
    document.getElementById('garageModal').classList.add('hidden');
    unlockBodyScroll();
}

function renderGarage() {
    const container = document.getElementById('garageItemsContainer'); container.innerHTML = '';
    const ownedCars = carList.filter(c => c.owned && !c.pawned);
    
    ownedCars.forEach(item => {
        // Vẽ SVG trực tiếp thay vì dùng thẻ img
        const svgHtml = getCarSVG(item.type, item.color);
        
        const box = document.createElement('div');
        box.className = 'bg-[#1b2230] border border-sky-500/40 p-2.5 rounded-2xl flex items-center justify-between flex-shrink-0 shadow-md';
        box.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-16 h-12 rounded-xl overflow-hidden border border-sky-400/50 bg-black/60 flex-shrink-0 flex items-center justify-center">
                    ${svgHtml}
                </div>
                <div>
                    <div class="font-bold text-white text-xs leading-tight">${item.name}</div>
                    <div class="text-[10px] text-emerald-400 font-bold mt-1">+${item.luck}% May Mắn</div>
                </div>
            </div>
            <div>
                ${item.equipped 
                    ? `<span class="text-sky-400 font-bold text-[10px] px-3 py-1.5 bg-sky-950/80 rounded-xl border border-sky-500/40">Đang Lái</span>` 
                    : `<button onclick="equipCarItem('${item.id}')" class="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black px-3.5 py-1.5 rounded-xl text-[10px] shadow active:scale-95 transition">Cầm Lái</button>`
                }
            </div>
        `;
        container.appendChild(box);
    });
}

function equipCarItem(id) {
    const target = carList.find(x => x.id === id);
    if (target) {
        carList.forEach(c => c.equipped = false);
        target.equipped = true;
        playTone('chip'); showFloatingText(`Lên xe ${target.name}!`, '#3498db');
        renderGarage(); updateRoomAndCharacterVisual(); syncDataToFirestore(false);
    }
}