// ==========================================
// TOOL BOT - TELEGRAM HACK
// ==========================================
const botModels = [
    { id: 'bot_cheap', name: 'Bot Cỏ', tag: 'Giá Rẻ', desc: 'Tỉ lệ hên xui 50%.', actualMinRate: 48, actualMaxRate: 52, plans: [ { minutes: 5, price: 30000 }, { minutes: 15, price: 75000 }, { minutes: 60, price: 180000 }, { minutes: 180, price: 450000 } ] },
    { id: 'bot_mid', name: 'Bot MD5', tag: 'Tầm Trung', desc: 'Phân tích sơ cấp, chuẩn 55-59%.', actualMinRate: 55, actualMaxRate: 59, plans: [ { minutes: 5, price: 150000 }, { minutes: 15, price: 360000 }, { minutes: 60, price: 1050000 }, { minutes: 180, price: 2400000 } ] },
    { id: 'bot_vip', name: 'AI Quantum', tag: 'VIP', desc: 'Bot cao cấp, chuẩn 60-70%.', actualMinRate: 60, actualMaxRate: 70, plans: [ { minutes: 5, price: 900000 }, { minutes: 15, price: 2250000 }, { minutes: 60, price: 6000000 }, { minutes: 180, price: 15000000 } ] }
];

// Gán activeBotModel sau khi botModels có sẵn
activeBotModel = botModels.find(b => b.id === selectedBotId) || botModels[0];

function renderBotSelectors() {
    const container = document.getElementById('botSelectorGrid'); if (!container) return; container.innerHTML = '';
    botModels.forEach(bot => {
        const isSelected = (bot.id === selectedBotId); const isCurrentRented = (toolActiveUntil > Date.now() && rentedBotId === bot.id);
        const btn = document.createElement('button'); btn.onclick = () => selectBotModel(bot.id);
        btn.className = `p-2 rounded-xl text-left border transition relative flex flex-col justify-between ${isSelected ? 'bg-sky-900/90 border-yellow-400 shadow-lg ring-1 ring-yellow-400' : 'bg-[#0f172a] hover:bg-sky-950 border-sky-700/40 text-gray-300'}`;
        btn.innerHTML = `
            <div class="text-[9px] font-bold uppercase tracking-wider text-amber-300">${bot.tag}</div>
            <div class="font-extrabold text-[11px] text-white my-0.5 leading-tight">${bot.name}</div>
            <div class="text-[9px] text-gray-400">${bot.id === 'bot_cheap' ? 'Random hên xui' : (bot.id === 'bot_mid' ? 'Chuẩn ~55-59%' : 'Chuẩn 60-70%')}</div>
            ${isCurrentRented ? `<span class="mt-1 text-[8px] bg-emerald-950 text-emerald-300 px-1 py-0.5 rounded text-center border border-emerald-500 font-bold">Đang Thuê</span>` : ''}
        `; container.appendChild(btn);
    });
}

function selectBotModel(botId) {
    playTone('chip'); selectedBotId = botId;
    activeBotModel = botModels.find(b => b.id === botId) || botModels[0];
    localStorage.setItem('tx_selected_bot', botId);
    document.getElementById('activeBotNameLabel').innerText = activeBotModel.name;
    document.getElementById('activeBotDescLabel').innerText = activeBotModel.desc;
    renderBotSelectors(); renderBotRentalPlans(); syncDataToFirestore(false);
}

function renderBotRentalPlans() {
    const container = document.getElementById('botRentalPlansContainer'); if (!container) return; container.innerHTML = '';
    activeBotModel.plans.forEach(plan => {
        const btn = document.createElement('button'); btn.onclick = () => rentToolPlan(plan.price, plan.minutes, activeBotModel.id);
        btn.className = "bg-[#0b1329] hover:bg-sky-900 border border-sky-500/50 p-2 rounded-xl text-left transition active:scale-95 group";
        btn.innerHTML = `<div class="flex justify-between items-center"><span class="font-bold text-sky-300 text-[11px] group-hover:text-yellow-300">${plan.minutes} Phút</span><i class="fa-solid fa-cart-plus text-sky-400 text-xs"></i></div><div class="text-[11px] text-yellow-400 font-mono font-bold mt-0.5">${plan.price.toLocaleString()}đ</div>`;
        container.appendChild(btn);
    });
}

function rentToolPlan(price, minutes, botId) {
    if (balance < price) return showFloatingText(`THIẾU TIỀN THUÊ TOOL!`, '#e74c3c');
    balance -= price; const now = Date.now();
    if (toolActiveUntil > now && rentedBotId === botId) { toolActiveUntil += minutes * 60 * 1000; }
    else { toolActiveUntil = now + minutes * 60 * 1000; rentedBotId = botId; }
    localStorage.setItem('tx_tool_expiry', toolActiveUntil); localStorage.setItem('tx_rented_bot_id', rentedBotId);
    playTone('win'); showFloatingText(`Thuê ${botId} thành công!`, '#2ecc71');
    updateGameDisplay(); renderBotSelectors(); checkToolStatus(); updateToolPrediction(); syncDataToFirestore(false);
}

function checkToolStatus() {
    const now = Date.now(); const isActive = toolActiveUntil > now;
    const lockEl = document.getElementById('toolLockOverlay'); const liveEl = document.getElementById('toolLiveContent');
    const badgeEl = document.getElementById('toolExpiryBadge'); const subTitle = document.getElementById('toolStatusSubtitle');
    const remainEl = document.getElementById('toolRemainingTime'); const headerTitle = document.getElementById('activeBotHeaderTitle');
    const realAccText = document.getElementById('botRealAccuracyText');
    const currentRentedBot = botModels.find(b => b.id === rentedBotId) || botModels[0];
    if (isActive) {
        if (lockEl) lockEl.classList.add('hidden'); if (liveEl) liveEl.classList.remove('hidden');
        if (badgeEl) { badgeEl.className = "text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500 animate-pulse"; badgeEl.innerText = "VIP Active"; }
        if (subTitle) { subTitle.className = "text-[9px] text-emerald-400 font-semibold"; subTitle.innerText = `● Đang Chạy: ${currentRentedBot.name} (tham khảo)`; }
        if (headerTitle) { headerTitle.innerHTML = `<i class="fa-solid fa-microchip"></i> ${currentRentedBot.name.toUpperCase()}`; }
        if (realAccText) { realAccText.innerText = `* Chỉ tham khảo, không can thiệp`; }
        if (remainEl) { const diffSec = Math.floor((toolActiveUntil - now) / 1000); const m = Math.floor(diffSec / 60); const s = diffSec % 60; remainEl.innerText = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`; }
    } else {
        if (lockEl) lockEl.classList.remove('hidden'); if (liveEl) liveEl.classList.add('hidden');
        if (badgeEl) { badgeEl.className = "text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded-full font-bold border border-red-700"; badgeEl.innerText = "Hết Hạn"; }
        if (subTitle) { subTitle.className = "text-[9px] text-amber-400 font-semibold"; subTitle.innerText = "● Chưa Kích Hoạt Bản Quyền Tool"; }
    }
}

function updateToolPrediction() {
    const currentRentedBot = botModels.find(b => b.id === rentedBotId) || botModels[0];
    const displayConf = Math.floor(Math.random() * 101);
    const actualSuccessRate = Math.floor(Math.random() * (currentRentedBot.actualMaxRate - currentRentedBot.actualMinRate + 1)) + currentRentedBot.actualMinRate;
    currentToolPrediction.displayConfidence = displayConf; currentToolPrediction.actualRate = actualSuccessRate;
    if (currentRentedBot.id === 'bot_cheap') { currentToolPrediction.door = (Math.random() > 0.5) ? 'TAI' : 'XIU'; }
    else if (currentRentedBot.id === 'bot_mid') {
        const last3 = roadHistory.slice(-3); const allSame = last3.length === 3 && last3.every(x => x === last3[0]);
        if (allSame) currentToolPrediction.door = (last3[0] === 'TAI') ? 'XIU' : 'TAI';
        else currentToolPrediction.door = (Math.random() > 0.5) ? 'TAI' : 'XIU';
    } else {
        const last2 = roadHistory.slice(-2); const sameStreak = last2.length === 2 && last2[0] === last2[1];
        if (sameStreak) currentToolPrediction.door = last2[0];
        else currentToolPrediction.door = (Math.random() > 0.5) ? 'TAI' : 'XIU';
    }
    const sessEl = document.getElementById('toolSessionLabel'); const doorEl = document.getElementById('toolPredictionDoor');
    const confEl = document.getElementById('toolConfidenceDisplay'); const accBadge = document.getElementById('toolAccuracyBadge');
    const dynamicTip = document.getElementById('telegramDynamicTip');
    if (sessEl) sessEl.innerText = `#${sessionID}`;
    if (doorEl) { doorEl.innerText = currentToolPrediction.door === 'TAI' ? 'TÀI' : 'XỈU'; doorEl.className = `font-black text-xl ${currentToolPrediction.door === 'TAI' ? 'text-red-500' : 'text-sky-400'}`; }
    if (confEl) { confEl.innerText = `${displayConf}%`; if (displayConf >= 75) confEl.className = "text-emerald-400 font-mono text-base font-black"; else if (displayConf <= 30) confEl.className = "text-red-400 font-mono text-base font-black"; else confEl.className = "text-yellow-400 font-mono text-base font-black"; }
    if (accBadge) { accBadge.innerText = `Tham Khảo`; accBadge.className = `bg-amber-950 text-amber-300 border border-amber-600 px-2 py-0.5 rounded-full text-[9px] font-extrabold`; }
    if (dynamicTip) { dynamicTip.innerHTML = `⚡ <b>GỢI Ý TỪ ${currentRentedBot.name}:</b> Có thể ra <b>${currentToolPrediction.door === 'TAI' ? 'TÀI' : 'XỈU'}</b> (tự tin ${displayConf}%). <span class="text-gray-400 italic">Chỉ mang tính tham khảo!</span>`; }
}