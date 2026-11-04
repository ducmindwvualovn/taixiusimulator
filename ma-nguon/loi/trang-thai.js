// ==========================================
// STATE - TRẠNG THÁI GAME
// ==========================================
let balance = localStorage.getItem('sx_balance') ? parseInt(localStorage.getItem('sx_balance')) : 1000000;
let debt = localStorage.getItem('sx_debt') ? parseInt(localStorage.getItem('sx_debt')) : 0;
let totalLuck = 0;
let betHistory = JSON.parse(localStorage.getItem('sx_bet_history')) || [];

// LƯU Ý: Biến roomFurniture đã được chuyển sang file do-dac.js để tránh khai báo trùng lặp

// Biến trạng thái sòng bạc
let selectedDoor = null; 
let currentChip = 50000; 
let myTaiBet = 0; 
let myXiuBet = 0;
let timeLeft = 30; 
let sessionStatus = 'BETTING'; 
let sessionID = 3312877;
let roadHistory = ['TAI', 'XIU', 'TAI', 'TAI', 'XIU', 'TAI', 'XIU', 'XIU', 'TAI', 'TAI', 'XIU', 'TAI'];
let taiPool = 0; 
let xiuPool = 0; 
let targetTaiPool = 0; 
let targetXiuPool = 0;
let winStreak = 0;

let pendingPoliceBet = { amount: 0, door: null };
let policeCountdownInterval = null;
let policeTimeoutTimer = null;

let isProcessingBet = false;

// Tool bot state
let selectedBotId = localStorage.getItem('tx_selected_bot') || 'bot_cheap';
let activeBotModel = null; // gán trong tool-bot.js
let toolActiveUntil = localStorage.getItem('tx_tool_expiry') ? parseInt(localStorage.getItem('tx_tool_expiry')) : 0;
let rentedBotId = localStorage.getItem('tx_rented_bot_id') || selectedBotId;
let currentToolPrediction = { door: 'TAI', displayConfidence: 50, actualRate: 50 };

// Chat lines
const spicyChatLines = [
    { user: "namnatday", text: "20tr đéo lên tí nào, cay vcl anh em ơi" }, { user: "vlxx2999", text: "Cầu bệt Tài 5 tay rồi, tay này có ai bẻ không?" },
    { user: "ghgggdggd", text: "Bẻ Xỉu đi, tay này không ra Xỉu chặt cu tao!" }, { user: "hoimau8", text: "Cháy mẹ nick rồi ae ơi, vcl cái game bịp này" },
    { user: "dangcaps1laanhh", text: "6 mã rồi đéo cho bố ăn một đồng nào" }, { user: "boy_haiphong", text: "Địt cụ admin trả tao 50M coi, nuốt nước người ta à" },
    { user: "kute_boy99", text: "Húp trọn 120M Tài ae ơiiii! Đỉnh nóc kịch trần!!" }, { user: "chuyengiasoicau", text: "Theo tool telegram kìa anh em, chuẩn phết đấy" },
    { user: "thanh_nien_ngheo", text: "Còn cái nịt, vừa cầm con wave chiến được 3 củ xong" }, { user: "dola_thanhtrieu", text: "Nhẹ nhàng theo Tài 30 củ, bú chắc tiếng này" },
    { user: "trum_soc_dia", text: "Cân cửa trả lại bố 40 triệu cay thế nhờ" }, { user: "minh_beo_88", text: "Ai theo Xỉu húp cháo gà nhé, Tài cứng cựa" },
    { user: "anh_ba_saigon", text: "Vl xúc xắc ra 1-1-2 thế kia thì đỡ bằng niềm tin à" }, { user: "ha_noi_pho", text: "Vừa gỡ lại được con SH, thôi té ngủ đây ae ơi" },
    { user: "ti_do_102", text: "Admin bẻ cầu trắng trợn vcc!" }, { user: "bupbe_barbie", text: "Huhu bay luôn tiền đóng học phí tháng này rồi :(" }
];