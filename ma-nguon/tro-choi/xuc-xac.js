// ==========================================
// XÚC XẮC - LOGIC LẮC & MỞ BÁT
// ==========================================
function initSessionPoolTargets() {
    taiPool = 0; xiuPool = 0;
    const isHighPool = Math.random() < 0.5;
    if (isHighPool) { targetTaiPool = Math.floor(Math.random() * 800000000) + 1100000000; targetXiuPool = Math.floor(Math.random() * 800000000) + 1100000000; }
    else { targetTaiPool = Math.floor(Math.random() * 200000000) + 180000000; targetXiuPool = Math.floor(Math.random() * 200000000) + 180000000; }
    const taiEl = document.getElementById('taiPoolNumber'); const xiuEl = document.getElementById('xiuPoolNumber');
    if (taiEl) taiEl.innerText = "0"; if (xiuEl) xiuEl.innerText = "0";
    const playersTai = Math.floor(targetTaiPool / (Math.random() * 400000 + 400000)); const playersXiu = Math.floor(targetXiuPool / (Math.random() * 400000 + 400000));
    const taiPlEl = document.getElementById('taiPlayerCount'); const xiuPlEl = document.getElementById('xiuPlayerCount'); const totalPlEl = document.getElementById('totalPlayersOnline');
    if (taiPlEl) taiPlEl.innerText = playersTai.toLocaleString(); if (xiuPlEl) xiuPlEl.innerText = playersXiu.toLocaleString();
    if (totalPlEl) totalPlEl.innerText = (playersTai + playersXiu + 350).toLocaleString();
}

function applyDiceClass(id, value) {
    const el = document.getElementById(id); if (!el) return;
    el.className = `dice-3d dice-${value}`; let pipsHtml = '';
    for (let i = 0; i < value; i++) pipsHtml += '<div class="pip"></div>'; el.innerHTML = pipsHtml;
}

function startShakingAndResolve() {
    sessionStatus = 'SHAKING';
    document.getElementById('bowlStatus').innerText = 'ĐANG LẮC';
    document.getElementById('countdownTimer').innerText = '00';
    document.getElementById('resultPlate').classList.add('hidden');
    const bowl = document.getElementById('bowlCover'); bowl.classList.add('bowl-shaking');
    const shuffleTimer = setInterval(() => {
        applyDiceClass('dice1', Math.floor(Math.random() * 6) + 1);
        applyDiceClass('dice2', Math.floor(Math.random() * 6) + 1);
        applyDiceClass('dice3', Math.floor(Math.random() * 6) + 1);
    }, 65);
    setTimeout(() => { clearInterval(shuffleTimer); bowl.classList.remove('bowl-shaking'); revealDiceResult(); }, 2600);
}

function revealDiceResult() {
    sessionStatus = 'REVEAL'; document.getElementById('bowlStatus').innerText = 'MỞ BÁT';
    const bowl = document.getElementById('bowlCover'); bowl.style.transform = 'translateY(-140px) scale(0.85)'; bowl.style.opacity = '0.15';
    let d1 = Math.floor(Math.random() * 6) + 1; let d2 = Math.floor(Math.random() * 6) + 1; let d3 = Math.floor(Math.random() * 6) + 1;
    let total = d1 + d2 + d3; let outcome = (total >= 11 && total <= 18) ? 'TAI' : 'XIU';
    if (winStreak >= 3) { outcome = (outcome === 'TAI') ? 'XIU' : 'TAI'; winStreak = 0; }
    if (totalLuck > 0 && (myTaiBet > 0 || myXiuBet > 0)) {
        const luckyRoll = (Math.random() * 100) < (totalLuck * 0.15);
        if (luckyRoll) { const wantedDoor = myTaiBet > myXiuBet ? 'TAI' : 'XIU'; outcome = wantedDoor; }
    }
    if (outcome === 'TAI') { while ((d1 + d2 + d3) < 11) { d1 = Math.floor(Math.random() * 6) + 1; d2 = Math.floor(Math.random() * 6) + 1; d3 = Math.floor(Math.random() * 6) + 1; } }
    else { while ((d1 + d2 + d3) > 10) { d1 = Math.floor(Math.random() * 6) + 1; d2 = Math.floor(Math.random() * 6) + 1; d3 = Math.floor(Math.random() * 6) + 1; } }
    applyDiceClass('dice1', d1); applyDiceClass('dice2', d2); applyDiceClass('dice3', d3);
    total = d1 + d2 + d3; outcome = (total >= 11 && total <= 18) ? 'TAI' : 'XIU';

    let refundAmount = 0; let effectiveTaiBet = myTaiBet; let effectiveXiuBet = myXiuBet;
    if (myTaiBet > 0 && myXiuBet > 0) {
        const hedgeFee = Math.floor(Math.min(myTaiBet, myXiuBet) * 0.05);
        refundAmount = Math.min(myTaiBet, myXiuBet) * 2;
        balance += refundAmount; balance -= hedgeFee;
        showFloatingText(`Phí cân cửa: -${hedgeFee.toLocaleString()}đ`, '#e74c3c');
        if (myTaiBet > myXiuBet) { effectiveTaiBet = myTaiBet - myXiuBet; effectiveXiuBet = 0; }
        else { effectiveXiuBet = myXiuBet - myTaiBet; effectiveTaiBet = 0; }
    }
    let profit = 0; let winAmount = 0;
    if (outcome === 'TAI' && effectiveTaiBet > 0) { winAmount = Math.floor(effectiveTaiBet * 1.9); balance += winAmount; profit = winAmount - effectiveTaiBet; }
    else if (outcome === 'XIU' && effectiveXiuBet > 0) { winAmount = Math.floor(effectiveXiuBet * 1.9); balance += winAmount; profit = winAmount - effectiveXiuBet; }
    else if (effectiveTaiBet > 0 || effectiveXiuBet > 0) { profit = -(effectiveTaiBet + effectiveXiuBet); }
    if (winAmount > 0) { winStreak++; } else { winStreak = 0; }
    if (myTaiBet > 0 || myXiuBet > 0) {
        betHistory.unshift({ session: sessionID, door: myTaiBet > 0 ? 'TÀI' : 'XỈU', betAmount: myTaiBet + myXiuBet, outcome: outcome, result: winAmount > 0 ? 'THẮNG' : (profit === 0 ? 'HÒA' : 'THUA'), winAmount: winAmount, time: new Date().toLocaleTimeString() });
        if (betHistory.length > 50) betHistory.pop();
    }
    const resultPlate = document.getElementById('resultPlate'); const resultSummaryText = document.getElementById('resultSummaryText'); const refundNoticeText = document.getElementById('refundNoticeText');
    resultSummaryText.innerHTML = `${total} - <b class="${outcome === 'TAI' ? 'text-red-500' : 'text-sky-400'}">${outcome === 'TAI' ? 'TÀI' : 'XỈU'}</b>`;
    if (refundAmount > 0) { refundNoticeText.innerText = `Cân Cửa: Hoàn lại ${refundAmount.toLocaleString()} VNĐ`; } else { refundNoticeText.innerText = ''; }
    resultPlate.classList.remove('hidden');
    roadHistory.push(outcome); if (roadHistory.length > 14) roadHistory.shift(); renderRoadHistory();
    if (debt > 0) {
        let interestRate = 0.05; if (debt > 50000000) interestRate += 0.01;
        debt += Math.floor(debt * interestRate);
        if (debt > 200000000 && balance < 10000000) { showFloatingText("CHỦ NỢ ĐANG ĐẾN! HÃY TRẢ TIỀN NGAY!", '#ff0000'); }
        localStorage.setItem('sx_debt', debt);
    }
    const now = Date.now();
    carList.forEach(c => { if (c.pawned && c.pawnedAt && now - c.pawnedAt > 300000) { c.pawned = false; c.owned = false; c.equipped = false; showFloatingText(`Tịch thu xe: ${c.name}!`, '#e74c3c'); } });
    fashionList.forEach(f => { if (f.pawned && f.pawnedAt && now - f.pawnedAt > 300000) { f.pawned = false; f.owned = false; f.equipped = false; showFloatingText(`Tịch thu đồ: ${f.name}!`, '#e74c3c'); } });
    if (winAmount > 0) { playTone('win'); showFloatingText(`+${winAmount.toLocaleString()}đ (x1.9)!`, '#2ecc71'); }
    else if (effectiveTaiBet > 0 || effectiveXiuBet > 0) { playTone('lose'); showFloatingText(`THUA RỒI!`, '#e74c3c'); }
    updateGameDisplay(); updateToolPrediction(); syncDataToFirestore(false);
    setTimeout(() => { resetSessionForNewRound(); }, 5500);
}

function resetSessionForNewRound() {
    sessionStatus = 'BETTING'; timeLeft = 30; sessionID++;
    document.getElementById('sessionNumber').innerText = sessionID; initSessionPoolTargets();
    myTaiBet = 0; myXiuBet = 0; selectedDoor = null;
    document.getElementById('myTaiBetDisplay').innerText = '0đ'; document.getElementById('myXiuBetDisplay').innerText = '0đ';
    document.getElementById('taiBox').classList.remove('border-yellow-400'); document.getElementById('taiSelectedTag').classList.add('hidden');
    document.getElementById('xiuBox').classList.remove('border-yellow-400'); document.getElementById('xiuSelectedTag').classList.add('hidden');
    const bowl = document.getElementById('bowlCover'); bowl.style.transform = 'translateY(0) scale(1)'; bowl.style.opacity = '1';
    document.getElementById('bowlStatus').innerText = 'ĐẶT CƯỢC'; document.getElementById('resultPlate').classList.add('hidden');
}

function renderRoadHistory() {
    const container = document.getElementById('roadHistoryDots'); if (!container) return; container.innerHTML = '';
    roadHistory.forEach(r => {
        const dot = document.createElement('div');
        dot.className = `w-6 h-6 rounded-full flex items-center justify-center font-black text-[11px] shadow border ${r === 'TAI' ? 'bg-red-600 text-white border-red-300' : 'bg-sky-600 text-white border-sky-300'}`;
        dot.innerText = r === 'TAI' ? 'T' : 'X'; container.appendChild(dot);
    });
}