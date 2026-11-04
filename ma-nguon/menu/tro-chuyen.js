// ==========================================
// CHAT TRỰC TUYẾN
// ==========================================
function toggleChatWindow() {
    playTone('chip');
    document.getElementById('liveChatSidebar').classList.toggle('hidden');
}

function sendChatMessage() {
    const input = document.getElementById('chatInputBox');
    const text = input.value.trim(); if (!text) return;
    playTone('chip');
    const myDisplayName = currentUser ? currentUser.email.split('@')[0] : "Minh Sinh Viên (Bạn)";
    addLiveChatMessage(myDisplayName, escapeHtml(text));
    input.value = '';
    setTimeout(() => {
        const replies = ["Bác nói chuẩn vcl!", "Đánh ngược lại đi ông giáo ơi!", "Bú đẫm chưa bác ơi?", "Theo bác gãy mẹ tay này rồi", "Cùng máu rồi, tất tay thôi!"];
        const r = replies[Math.floor(Math.random() * replies.length)];
        const u = "gamer_" + Math.floor(Math.random() * 899 + 100);
        addLiveChatMessage(u, r);
    }, 1200);
}