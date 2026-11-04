// ==========================================
// VAY NÓ - VAY NÓNG 24/7
// ==========================================
function borrowMoney(amount) {
    debt += Math.floor(amount * 1.1);
    balance += amount;
    playTone('win');
    showFloatingText(`Vay nóng +${amount.toLocaleString()}đ`, '#2ecc71');
    localStorage.setItem('sx_debt', debt);
    document.getElementById('appLoanDebtTotal').innerText = debt.toLocaleString() + ' VNĐ';
    updateGameDisplay(); syncDataToFirestore(false);
}

function payDebtFull() {
    if (debt <= 0) return showFloatingText('BẠN KHÔNG CÓ KHOẢN NỢ NÀO!', '#f39c12');
    if (balance < debt) return showFloatingText('KHÔNG ĐỦ TIỀN TRẢ NỢ!', '#e74c3c');
    balance -= debt;
    showFloatingText(`Đã trả hết nợ!`, '#2ecc71');
    debt = 0;
    localStorage.setItem('sx_debt', debt);
    document.getElementById('appLoanDebtTotal').innerText = '0 VNĐ';
    updateGameDisplay(); playTone('win'); syncDataToFirestore(false);
}