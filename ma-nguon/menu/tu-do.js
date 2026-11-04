// ==========================================
// TỦ ĐỒ - WARDROBE
// ==========================================
function openWardrobe() {
    playTone('chip'); renderWardrobe();
    document.getElementById('wardrobeModal').classList.remove('hidden');
    document.getElementById('wardrobeModal').classList.add('flex');
    lockBodyScroll();
}
function closeWardrobe() {
    playTone('chip');
    document.getElementById('wardrobeModal').classList.remove('flex');
    document.getElementById('wardrobeModal').classList.add('hidden');
    unlockBodyScroll();
}

function renderWardrobe() {
    const container = document.getElementById('wardrobeItemsContainer'); container.innerHTML = '';
    const ownedFashion = fashionList.filter(f => f.owned && !f.pawned);
    
    ownedFashion.forEach(item => {
        // Vẽ SVG trực tiếp thay vì dùng thẻ img
        const svgHtml = getFashionSVG(item.type, item.bg, item.label);
        
        const box = document.createElement('div');
        box.className = 'bg-[#251910] border border-amber-600/40 p-2.5 rounded-2xl flex items-center justify-between flex-shrink-0 shadow-md';
        box.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-xl overflow-hidden border border-amber-500/50 bg-black/60 flex-shrink-0 flex items-center justify-center">
                    ${svgHtml}
                </div>
                <div>
                    <div class="font-bold text-white text-xs leading-tight">${item.name}</div>
                    <div class="text-[10px] text-emerald-400 font-bold mt-1">+${item.luck}% May Mắn (${item.type})</div>
                </div>
            </div>
            <div>
                ${item.equipped 
                    ? `<span class="text-amber-400 font-bold text-[10px] px-3 py-1.5 bg-amber-950/80 rounded-xl border border-amber-500/40">Đang Mặc</span>` 
                    : `<button onclick="equipFashionItem('${item.id}')" class="bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-black px-3.5 py-1.5 rounded-xl text-[10px] shadow active:scale-95 transition">Mặc Lên</button>`
                }
            </div>
        `;
        container.appendChild(box);
    });
}

function equipFashionItem(id) {
    const target = fashionList.find(x => x.id === id);
    if (target) {
        fashionList.forEach(f => { if (f.type === target.type) f.equipped = false; });
        target.equipped = true;
        playTone('chip'); showFloatingText(`Đã mặc ${target.name}!`, '#3498db');
        renderWardrobe(); updateRoomAndCharacterVisual(); syncDataToFirestore(false);
    }
}