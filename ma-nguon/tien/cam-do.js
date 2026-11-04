// ==========================================
// CẦM ĐỒ - PAWN SHOP (UI & HELPER)
// ==========================================
// Lưu ý: Các hàm pawnRoomItem, redeemRoomItem, pawnLuxuryItem, redeemLuxuryItem
// đã nằm ở vat-pham/do-dac.js. File này giữ các hàm điều hướng UI cầm đồ
// và xử lý tịch thu đồ khi hết hạn (nằm trong xuc-xac.js).

function openPhoneWithApp(appName) {
    const backdrop = document.getElementById('phoneBackdrop');
    if (backdrop.classList.contains('hidden')) {
        backdrop.classList.remove('hidden');
        backdrop.classList.add('flex');
        lockBodyScroll();
    }
    openAppInPhone(appName);
}