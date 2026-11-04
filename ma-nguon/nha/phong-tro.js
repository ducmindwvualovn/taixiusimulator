// ==========================================
// PHÒNG TRỌ - HIỂN THỊ NHÂN VẬT & PHÒNG
// ==========================================
function updateRoomAndCharacterVisual() {
    const currentHouse = houseList.slice().reverse().find(h => h.owned && !h.pawned) || houseList[0];
    const roomView = document.getElementById('roomSimulationView');
    
    // ÁP DỤNG ẢNH NỀN SVG THAY VÌ CLASS MÀU
    roomView.className = `flex-1 w-full flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden transition-all duration-700`;
    
    // Nếu có ảnh nền (image) thì dùng ảnh, nếu không thì dùng class màu dự phòng
    if (currentHouse.image) {
        roomView.style.backgroundImage = `url('${currentHouse.image}')`;
        roomView.style.backgroundSize = 'cover';
        roomView.style.backgroundPosition = 'center';
    } else {
        roomView.style.backgroundImage = '';
        roomView.classList.add(currentHouse.classBg);
    }
    
    document.getElementById('roomNameLabel').innerText = currentHouse.name;
    document.getElementById('roomDescLabel').innerText = currentHouse.desc;

    // Ẩn/Hiện đồ đạc
    roomFurniture.forEach(item => {
        const dom = document.getElementById(item.domId);
        if (dom) {
            if (item.pawned) { dom.style.opacity = '0'; dom.style.transform = 'scale(0.4)'; dom.style.pointerEvents = 'none'; }
            else { dom.style.opacity = '1'; dom.style.transform = 'scale(1)'; dom.style.pointerEvents = 'auto'; }
        }
    });

    // Cập nhật xe
    const equippedCar = carList.find(c => c.equipped && !c.pawned) || carList[0];
    const carImgEl = document.getElementById('currentCarImg'); if (carImgEl) carImgEl.src = equippedCar.image;
    document.getElementById('currentCarName').innerText = equippedCar.name;

    // Cập nhật quần áo
    const equippedShirt = fashionList.find(f => f.type === 'shirt' && f.equipped && !f.pawned) || fashionList[0];
    const equippedPant = fashionList.find(f => f.type === 'pant' && f.equipped && !f.pawned) || fashionList[5];
    const equippedShoe = fashionList.find(f => f.type === 'shoe' && f.equipped && !f.pawned) || fashionList[7];

    const shirtDom = document.getElementById('avatarShirt'); const shirtImg = document.getElementById('avatarShirtImg');
    shirtDom.style.backgroundColor = equippedShirt.bg || '#44403c';
    if (shirtImg) shirtImg.src = equippedShirt.image;
    document.getElementById('avatarShirtLabel').innerText = equippedShirt.name.split(' ')[0] + ' ' + (equippedShirt.name.split(' ')[1] || '');

    const pantLeftImg = document.getElementById('avatarPantImgLeft'); const pantRightImg = document.getElementById('avatarPantImgRight');
    if (pantLeftImg) pantLeftImg.src = equippedPant.image;
    if (pantRightImg) pantRightImg.src = equippedPant.image;

    const shoeLeftImg = document.getElementById('avatarShoeImgLeft'); const shoeRightImg = document.getElementById('avatarShoeImgRight');
    if (shoeLeftImg) shoeLeftImg.src = equippedShoe.image;
    if (shoeRightImg) shoeRightImg.src = equippedShoe.image;

    // Kính cận (nếu may mắn > 20%)
    const glassesDom = document.getElementById('avatarGlassesDom');
    if (glassesDom) glassesDom.classList.toggle('hidden', totalLuck < 20);
}