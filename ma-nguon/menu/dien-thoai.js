// ==========================================
// ĐIỆN THOẠI - IPHONE 15 UI
// ==========================================
function togglePhone() {
    playTone('chip');
    const backdrop = document.getElementById('phoneBackdrop');
    if (backdrop.classList.contains('hidden')) {
        backdrop.classList.remove('hidden');
        backdrop.classList.add('flex');
        document.getElementById('phoneHomeBalance').innerText = balance.toLocaleString() + 'đ';
        lockBodyScroll();
    } else {
        backdrop.classList.remove('flex');
        backdrop.classList.add('hidden');
        unlockBodyScroll();
    }
}

function handleBackdropClick(event) {
    if (event.target.id === 'phoneBackdrop') togglePhone();
}

function backToPhoneHome() {
    playTone('chip');
    document.getElementById('phoneHomeScreen').classList.remove('hidden');
    document.getElementById('phoneAppPawn').classList.add('hidden');
    document.getElementById('phoneAppLoan').classList.add('hidden');
    document.getElementById('phoneAppStore').classList.add('hidden');
    document.getElementById('phoneAppTelegram').classList.add('hidden');
    document.getElementById('phoneAppHistory').classList.add('hidden');
    document.getElementById('phoneHomeBalance').innerText = balance.toLocaleString() + 'đ';
}

function openAppInPhone(appName) {
    playTone('chip');
    document.getElementById('phoneHomeScreen').classList.add('hidden');
    document.getElementById('phoneAppPawn').classList.add('hidden');
    document.getElementById('phoneAppLoan').classList.add('hidden');
    document.getElementById('phoneAppStore').classList.add('hidden');
    document.getElementById('phoneAppTelegram').classList.add('hidden');
    document.getElementById('phoneAppHistory').classList.add('hidden');

    // ĐÃ SỬA: Mở thẳng Sòng Tài Xỉu (vì Menu Casino đã bị xóa)
    if (appName === 'sunwin') { 
        togglePhone(); 
        openTaiXiuCasino(); 
    }
    else if (appName === 'pawn') { 
        renderPawnList(); 
        document.getElementById('phoneAppPawn').classList.remove('hidden'); 
    }
    else if (appName === 'loan') {
        document.getElementById('appLoanDebtTotal').innerText = debt.toLocaleString() + ' VNĐ';
        document.getElementById('phoneAppLoan').classList.remove('hidden');
    }
    else if (appName === 'store') { 
        renderStoreList('car'); 
        document.getElementById('phoneAppStore').classList.remove('hidden'); 
    }
    else if (appName === 'telegram') {
        document.getElementById('phoneAppTelegram').classList.remove('hidden');
        renderBotSelectors(); renderBotRentalPlans(); checkToolStatus();
    }
    else if (appName === 'history') { 
        renderHistory(); 
        document.getElementById('phoneAppHistory').classList.remove('hidden'); 
    }
}