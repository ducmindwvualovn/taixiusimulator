// ==========================================
// SÒNG BẠC - VÒNG LẶP CHÍNH
// ==========================================
function startGameLoops() {
    // 1. Cập nhật pool cược liên tục
    setInterval(() => {
        if (sessionStatus === 'BETTING') {
            if (taiPool < targetTaiPool) { 
                const stepTai = Math.floor((targetTaiPool - taiPool) / Math.max(1, timeLeft * 2.2)) + Math.floor(Math.random() * 3000000); 
                taiPool = Math.min(targetTaiPool, taiPool + stepTai); 
            } else { 
                taiPool += (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 1500000); 
            }
            if (xiuPool < targetXiuPool) { 
                const stepXiu = Math.floor((targetXiuPool - xiuPool) / Math.max(1, timeLeft * 2.2)) + Math.floor(Math.random() * 3000000); 
                xiuPool = Math.min(targetXiuPool, xiuPool + stepXiu); 
            } else { 
                xiuPool += (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 1500000); 
            }
            if (taiPool < 0) taiPool = 0; 
            if (xiuPool < 0) xiuPool = 0;
            
            const taiEl = document.getElementById('taiPoolNumber'); 
            const xiuEl = document.getElementById('xiuPoolNumber');
            if (taiEl) taiEl.innerText = Math.floor(taiPool).toLocaleString(); 
            if (xiuEl) xiuEl.innerText = Math.floor(xiuPool).toLocaleString();
        }
    }, 200);

    // 2. Đếm ngược thời gian (MỖI 1 GIÂY)
    setInterval(() => {
        if (typeof checkToolStatus === 'function') checkToolStatus();
        if (sessionStatus === 'BETTING') {
            timeLeft--; 
            const timerEl = document.getElementById('countdownTimer'); 
            if (timerEl) timerEl.innerText = timeLeft < 10 ? '0' + timeLeft : timeLeft;
            if (timeLeft <= 5 && timeLeft > 0 && typeof playTone === 'function') playTone('tick');
            if (timeLeft <= 0) {
                if (typeof startShakingAndResolve === 'function') startShakingAndResolve();
            }
        }
    }, 1000);

    // 3. Chat tự động
    setInterval(() => { 
        if (Math.random() < 0.75 && typeof spicyChatLines !== 'undefined') { 
            const item = spicyChatLines[Math.floor(Math.random() * spicyChatLines.length)]; 
            if (typeof addLiveChatMessage === 'function') addLiveChatMessage(item.user, item.text); 
        } 
    }, 1800);
}

function addLiveChatMessage(user, text) {
    const list = document.getElementById('chatMessageList'); if (!list) return;
    const colors = ['text-yellow-400', 'text-amber-400', 'text-sky-400', 'text-orange-400', 'text-red-400', 'text-emerald-400', 'text-pink-400'];
    const randColor = colors[Math.floor(Math.random() * colors.length)];
    const div = document.createElement('div');
    div.innerHTML = `<span class="font-bold ${randColor}">${user}:</span> <span class="text-gray-200">${text}</span>`;
    list.appendChild(div); list.scrollTop = list.scrollHeight;
    if (list.children.length > 50) list.removeChild(list.children[0]);
}