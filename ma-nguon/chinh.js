// File chinh.js - Khởi tạo sau cùng
window.addEventListener('load', () => {
    setTimeout(() => {
        try {
            // Khởi tạo giao diện ban đầu
            if (typeof initSessionPoolTargets === 'function') initSessionPoolTargets();
            if (typeof calcTotalLuckAndRender === 'function') calcTotalLuckAndRender();
            if (typeof updateGameDisplay === 'function') updateGameDisplay();
            if (typeof renderRoadHistory === 'function') renderRoadHistory();
            if (typeof updateRoomAndCharacterVisual === 'function') updateRoomAndCharacterVisual();
            if (typeof renderBotSelectors === 'function') renderBotSelectors();
            if (typeof renderBotRentalPlans === 'function') renderBotRentalPlans();
            if (typeof updateToolPrediction === 'function') updateToolPrediction();
            if (typeof checkToolStatus === 'function') checkToolStatus();

            // KÍCH HOẠT VÒNG LẶP
            if (typeof startGameLoops === 'function') {
                startGameLoops();
            } else {
                console.error("❌ Lỗi: Không tìm thấy hàm startGameLoops trong file song-bac.js!");
            }
            
            console.log("✅ Đã khởi động vòng lặp game!");
        } catch (e) {
            console.error("❌ Lỗi khởi tạo game:", e);
        }
    }, 100); // Đợi 100ms cho các file load xong
});