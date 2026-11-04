// ==========================================
// ĐỒNG BỘ FIRESTORE - SYNC DATA
// ==========================================
async function syncDataToFirestore(showToast = false) {
    if (!db || !currentUser) { saveAllStorage(); return; }
    const payload = {
        uid: currentUser.uid,
        email: currentUser.email,
        balance: balance,
        debt: debt,
        roomFurniture: roomFurniture,
        carList: carList,
        fashionList: fashionList,
        houseList: houseList,
        toolActiveUntil: toolActiveUntil,
        rentedBotId: rentedBotId,
        selectedBotId: selectedBotId,
        betHistory: betHistory,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    try {
        await db.collection("players").doc(currentUser.uid).set(payload, { merge: true });
        saveAllStorage();
        if (showToast) { playTone('win'); showFloatingText("Đã lưu Cloud!", "#2ecc71"); }
    } catch (err) {
        console.error("Lỗi lưu Firestore:", err);
    }
}

async function loadDataFromFirestore(uid) {
    if (!db) return;
    try {
        const doc = await db.collection("players").doc(uid).get();
        if (doc.exists) {
            const data = doc.data();
            if (data.balance !== undefined) balance = data.balance;
            if (data.debt !== undefined) debt = data.debt;
            if (data.roomFurniture) roomFurniture = data.roomFurniture;
            if (data.carList) carList = data.carList;
            if (data.fashionList) fashionList = data.fashionList;
            if (data.houseList) houseList = data.houseList;
            if (data.toolActiveUntil) toolActiveUntil = data.toolActiveUntil;
            if (data.rentedBotId) rentedBotId = data.rentedBotId;
            if (data.selectedBotId) selectedBotId = data.selectedBotId;
            if (data.betHistory) betHistory = data.betHistory;
            saveAllStorage();
            calcTotalLuckAndRender();
            updateGameDisplay();
            updateRoomAndCharacterVisual();
            renderBotSelectors();
            renderBotRentalPlans();
            checkToolStatus();
            showFloatingText("Dữ liệu Cloud đã tải!", "#3498db");
        } else {
            syncDataToFirestore(false);
        }
    } catch (err) {
        console.error("Lỗi đọc Firestore:", err);
    }
}