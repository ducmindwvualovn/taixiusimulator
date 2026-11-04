// ==========================================
// VÍ TIỀN - TỔNG LUCK & HIỂN THỊ
// ==========================================
function calcTotalLuckAndRender() {
    totalLuck = 0;
    carList.forEach(c => { if (c.owned && !c.pawned) totalLuck += (c.luck || 0); });
    fashionList.forEach(f => { if (f.owned && !f.pawned) totalLuck += (f.luck || 0); });
    houseList.forEach(h => { if (h.owned && !h.pawned) totalLuck += (h.luck || 0); });
    const luckBadge = document.getElementById('luckBadge'); if (luckBadge) luckBadge.innerText = `+${totalLuck}%`;
    const luckPct = document.getElementById('luckPercentage'); if (luckPct) luckPct.innerText = `+${totalLuck}%`;
    const currentHouse = houseList.slice().reverse().find(h => h.owned && !h.pawned) || houseList[0];
    const rankBadge = document.getElementById('charRankBadge'); if (rankBadge) rankBadge.innerText = currentHouse.rank || currentHouse.name;
    const homeRank = document.getElementById('phoneHomeRank'); if (homeRank) homeRank.innerText = `Minh • ${currentHouse.rank || currentHouse.name}`;
    const charStatusTag = document.getElementById('charStatusTag');
    const avatarIcon = document.getElementById('charAvatarIcon');
    const avatarHatIcon = document.getElementById('avatarHatIcon');
    if (charStatusTag) {
        if (totalLuck > 500) {
            charStatusTag.innerText = 'Tài Phiệt Đỉnh Cao';
            if (avatarIcon) avatarIcon.className = "fa-solid fa-crown text-yellow-400 text-lg";
            if (avatarHatIcon) avatarHatIcon.className = "fa-solid fa-crown text-yellow-400 text-3xl drop-shadow-md";
        } else if (totalLuck > 200) {
            charStatusTag.innerText = 'Đại Gia Phố Cổ';
            if (avatarIcon) avatarIcon.className = "fa-solid fa-gem text-yellow-400 text-lg";
            if (avatarHatIcon) avatarHatIcon.className = "fa-solid fa-hat-cowboy text-yellow-400 text-3xl drop-shadow-md";
        } else if (totalLuck > 60) {
            charStatusTag.innerText = 'Thiếu Gia Mới Nổi';
            if (avatarIcon) avatarIcon.className = "fa-solid fa-user-tie text-yellow-400 text-lg";
            if (avatarHatIcon) avatarHatIcon.className = "fa-solid fa-hat-wizard text-yellow-400 text-3xl drop-shadow-md";
        } else if (totalLuck > 15) {
            charStatusTag.innerText = 'Dân Chơi Khét Tiếng';
            if (avatarIcon) avatarIcon.className = "fa-solid fa-motorcycle text-yellow-400 text-lg";
            if (avatarHatIcon) avatarHatIcon.className = "fa-solid fa-helmet-safety text-yellow-400 text-3xl drop-shadow-md";
        } else {
            charStatusTag.innerText = 'Sinh Viên Rách Mùng Tơi';
            if (avatarIcon) avatarIcon.className = "fa-solid fa-graduation-cap text-yellow-400 text-lg";
            if (avatarHatIcon) avatarHatIcon.className = "fa-solid fa-graduation-cap text-yellow-400 text-3xl drop-shadow-md";
        }
    }
}