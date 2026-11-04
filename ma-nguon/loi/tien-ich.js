// ==========================================
// TIỆN ÍCH CHUNG
// ==========================================
function showFloatingText(text, color) {
    const el = document.createElement('div'); el.className = 'float-text text-xl sm:text-2xl';
    el.style.color = color; el.innerText = text; el.style.top = '40%';
    document.body.appendChild(el); setTimeout(() => el.remove(), 1200);
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function saveAllStorage() {
    localStorage.setItem('sx_balance', balance);
    localStorage.setItem('sx_car_list', JSON.stringify(carList));
    localStorage.setItem('sx_fashion_list', JSON.stringify(fashionList));
    localStorage.setItem('sx_house_list', JSON.stringify(houseList));
    localStorage.setItem('sx_room_furniture', JSON.stringify(roomFurniture));
    localStorage.setItem('sx_bet_history', JSON.stringify(betHistory));
}

function updateGameDisplay() {
    document.getElementById('userBalanceDisplay').innerText = balance.toLocaleString();
    document.getElementById('phoneHomeBalance').innerText = balance.toLocaleString() + 'đ';
    document.getElementById('debtDisplay').innerText = debt.toLocaleString() + 'đ';
    document.getElementById('appLoanDebtTotal').innerText = debt.toLocaleString() + ' VNĐ';
    localStorage.setItem('sx_balance', balance);
}

// Phím ESC toàn cục
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const policeModal = document.getElementById('policeCatchModal');
        if (policeModal && !policeModal.classList.contains('hidden')) { e.preventDefault(); return; }
        const backdrop = document.getElementById('phoneBackdrop'); if (!backdrop.classList.contains('hidden')) togglePhone();
        const chatBox = document.getElementById('liveChatSidebar'); if (!chatBox.classList.contains('hidden')) chatBox.classList.add('hidden');
        const casinoModal = document.getElementById('taiXiuCasinoModal'); if (!casinoModal.classList.contains('hidden')) closeTaiXiuCasino();
        const wardrobe = document.getElementById('wardrobeModal'); if (!wardrobe.classList.contains('hidden')) closeWardrobe();
        const garage = document.getElementById('garageModal'); if (!garage.classList.contains('hidden')) closeGarage();
        const authModal = document.getElementById('authModal'); if (!authModal.classList.contains('hidden')) closeAuthModal();
    }
}, true);