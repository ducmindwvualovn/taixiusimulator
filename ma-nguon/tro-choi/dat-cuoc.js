// ==========================================
// ĐẶT CƯỢC - CHỌN CỬA & VÀO TIỀN
// ==========================================
function openTaiXiuCasino() {
    playTone('chip');
    document.getElementById('taiXiuCasinoModal').classList.remove('hidden');
    document.getElementById('taiXiuCasinoModal').classList.add('flex');
    lockBodyScroll();
}
function closeTaiXiuCasino() {
    playTone('chip');
    document.getElementById('taiXiuCasinoModal').classList.remove('flex');
    document.getElementById('taiXiuCasinoModal').classList.add('hidden');
    unlockBodyScroll();
}

function selectBetDoor(door) {
    if (sessionStatus !== 'BETTING') return;
    playTone('chip'); selectedDoor = door;
    document.getElementById('taiBox').classList.toggle('border-yellow-400', door === 'TAI');
    document.getElementById('taiSelectedTag').classList.toggle('hidden', door !== 'TAI');
    document.getElementById('xiuBox').classList.toggle('border-yellow-400', door === 'XIU');
    document.getElementById('xiuSelectedTag').classList.toggle('hidden', door !== 'XIU');
}

function setChip(amount) {
    playTone('chip'); currentChip = amount;
    document.getElementById('activeChipLabel').innerText = amount.toLocaleString() + ' VNĐ';
}

function setBetAllIn() {
    if (balance <= 0) return;
    playTone('chip'); currentChip = balance;
    document.getElementById('activeChipLabel').innerText = balance.toLocaleString() + ' VNĐ (ALL-IN)';
}

function cancelBet() {
    if (sessionStatus !== 'BETTING') return;
    playTone('chip');
    if (selectedDoor === 'TAI' && myTaiBet > 0) { balance += myTaiBet; taiPool -= myTaiBet; myTaiBet = 0; document.getElementById('myTaiBetDisplay').innerText = '0đ'; }
    else if (selectedDoor === 'XIU' && myXiuBet > 0) { balance += myXiuBet; xiuPool -= myXiuBet; myXiuBet = 0; document.getElementById('myXiuBetDisplay').innerText = '0đ'; }
    updateGameDisplay(); syncDataToFirestore(false);
}

// FIX CHỐNG CLICK SPAM
function placeBet() {
    if (isProcessingBet) return;
    if (sessionStatus !== 'BETTING') return;
    if (!selectedDoor) return showFloatingText('CHỌN CỬA ĐI BẠN!', '#f39c12');
    if (currentChip <= 0 || balance < currentChip) return showFloatingText('KHÔNG ĐỦ TIỀN!', '#e74c3c');
    if (checkPoliceIntervention(currentChip)) {
        isProcessingBet = true;
        openPoliceCatchModal(currentChip, selectedDoor);
        setTimeout(() => isProcessingBet = false, 400);
        return;
    }
    isProcessingBet = true;
    executeBet(currentChip, selectedDoor);
    setTimeout(() => isProcessingBet = false, 400);
}

function executeBet(amount, door) {
    playTone('chip'); balance -= amount;
    if (door === 'TAI') { myTaiBet += amount; document.getElementById('myTaiBetDisplay').innerText = myTaiBet.toLocaleString() + 'đ'; taiPool += amount; }
    else { myXiuBet += amount; document.getElementById('myXiuBetDisplay').innerText = myXiuBet.toLocaleString() + 'đ'; xiuPool += amount; }
    showFloatingText(`-${amount.toLocaleString()}đ`, '#e74c3c');
    updateGameDisplay(); syncDataToFirestore(false);
}