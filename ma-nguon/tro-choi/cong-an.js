// ==========================================
// CÔNG AN - BỊ BẮT QUẢ TANG
// ==========================================
function checkPoliceIntervention(betAmount) {
    if (betAmount < POLICE_RULES.MIN_BET) return false;
    let catchRate = 0;
    if (betAmount < POLICE_RULES.HIGH_BET)      catchRate = POLICE_RULES.RATE_LOW;
    else if (betAmount < POLICE_RULES.HUGE_BET) catchRate = POLICE_RULES.RATE_MID;
    else                                         catchRate = POLICE_RULES.RATE_HIGH;
    return Math.random() < catchRate;
}

function openPoliceCatchModal(amount, door) {
    pendingPoliceBet = { amount, door };
    document.getElementById('policeBetAmount').innerText = amount.toLocaleString() + 'đ';
    document.getElementById('policeBetDoor').innerText = (door === 'TAI' ? 'TÀI' : 'XỈU');
    document.getElementById('policeBribeCost').innerText = `-${Math.floor(amount * POLICE_RULES.BRIBE_RATE).toLocaleString()}đ (20%)`;
    document.getElementById('policeFineCost').innerText = `-${Math.floor(amount * POLICE_RULES.FINE_RATE).toLocaleString()}đ (50%)`;
    const ring = document.getElementById('policeCountdownRing'); const text = document.getElementById('policeCountdownText');
    ring.style.strokeDashoffset = '0'; ring.style.stroke = '#ef4444'; text.innerText = POLICE_RULES.TIMEOUT_SEC; text.style.color = '#ef4444';
    const modal = document.getElementById('policeCatchModal'); modal.classList.remove('hidden'); modal.classList.add('flex');
    lockBodyScroll(); playTone('lose');
    document.body.classList.add('screen-shake'); setTimeout(() => document.body.classList.remove('screen-shake'), 500);
    let remaining = POLICE_RULES.TIMEOUT_SEC; const totalLength = 150.8;
    policeCountdownInterval = setInterval(() => {
        remaining--; text.innerText = remaining > 0 ? remaining : '0';
        const offset = totalLength * (1 - remaining / POLICE_RULES.TIMEOUT_SEC); ring.style.strokeDashoffset = offset;
        if (remaining <= 2) ring.style.stroke = '#dc2626'; else if (remaining <= 3) ring.style.stroke = '#f59e0b';
        if (remaining <= 2 && remaining > 0) playUrgentTick();
        if (remaining <= 0) clearInterval(policeCountdownInterval);
    }, 1000);
    policeTimeoutTimer = setTimeout(() => {
        if (pendingPoliceBet.amount > 0) { showFloatingText('⏰ HẾT GIỜ! Tự động Tiếp Tục!', '#e74c3c'); handlePoliceChoice('CONTINUE', true); }
    }, POLICE_RULES.TIMEOUT_SEC * 1000);
}

function closePoliceCatchModal() {
    if (policeCountdownInterval) { clearInterval(policeCountdownInterval); policeCountdownInterval = null; }
    if (policeTimeoutTimer) { clearTimeout(policeTimeoutTimer); policeTimeoutTimer = null; }
    const modal = document.getElementById('policeCatchModal'); modal.classList.add('hidden'); modal.classList.remove('flex'); unlockBodyScroll();
}

function handlePoliceChoice(choice, isAuto = false) {
    const { amount, door } = pendingPoliceBet; if (amount <= 0) return;
    if (policeCountdownInterval) { clearInterval(policeCountdownInterval); policeCountdownInterval = null; }
    if (policeTimeoutTimer) { clearTimeout(policeTimeoutTimer); policeTimeoutTimer = null; }
    closePoliceCatchModal(); pendingPoliceBet = { amount: 0, door: null };
    if (choice === 'STOP') { playTone('chip'); showFloatingText('✅ Đã ngừng cược — an toàn!', '#3498db'); return; }
    if (choice === 'BRIBE') {
        const bribeCost = Math.floor(amount * POLICE_RULES.BRIBE_RATE);
        if (balance < amount + bribeCost) { showFloatingText(`❌ Không đủ tiền hối lộ + cược!`, '#e74c3c'); playTone('lose'); return; }
        balance -= bribeCost; updateGameDisplay(); syncDataToFirestore(false);
        playTone('win'); showFloatingText(`💸 Hối lộ thành công! -${bribeCost.toLocaleString()}đ`, '#f39c12');
        setTimeout(() => executeBet(amount, door), 400); return;
    }
    if (choice === 'CONTINUE') {
        const fineCost = Math.floor(amount * POLICE_RULES.FINE_RATE);
        if (balance < amount + fineCost) { showFloatingText(`❌ Không đủ tiền cược + phạt!`, '#e74c3c'); playTone('lose'); return; }
        balance -= fineCost; updateGameDisplay(); playTone('lose');
        const prefix = isAuto ? '⏰ Auto: ' : '🚨 ';
        showFloatingText(`${prefix}Bị phạt -${fineCost.toLocaleString()}đ (50%)!`, '#e74c3c');
        document.body.classList.add('screen-shake'); setTimeout(() => document.body.classList.remove('screen-shake'), 400);
        setTimeout(() => executeBet(amount, door), 400); syncDataToFirestore(false); return;
    }
}