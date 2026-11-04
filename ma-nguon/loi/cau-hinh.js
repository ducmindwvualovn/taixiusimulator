// ==========================================
// ORIENTATION & VIEWPORT
// ==========================================
function checkOrientation() {
    const rotatePrompt = document.getElementById('rotatePrompt');
    if (!rotatePrompt) return;
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 1024);
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    if (isMobile && isPortrait) { rotatePrompt.classList.add('show'); document.body.style.overflow = 'hidden'; }
    else { rotatePrompt.classList.remove('show'); if (!document.body.classList.contains('modal-open')) document.body.style.overflow = ''; }
}
function setViewportHeight() { document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`); }
window.addEventListener('load', () => { setTimeout(checkOrientation, 100); setViewportHeight(); });
window.addEventListener('orientationchange', () => { setTimeout(() => { checkOrientation(); setViewportHeight(); }, 200); });
window.addEventListener('resize', () => { checkOrientation(); setViewportHeight(); });

function lockBodyScroll() { document.body.classList.add('modal-open'); document.body.style.overflow = 'hidden'; }
function unlockBodyScroll() { document.body.classList.remove('modal-open'); document.body.style.overflow = ''; checkOrientation(); }

// ==========================================
// FIREBASE CONFIG
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyDKHwxV6OkH_tPtCHH3pLaVp78LL9qrCV4",
    authDomain: "taixiusimulator.firebaseapp.com",
    projectId: "taixiusimulator",
    storageBucket: "taixiusimulator.firebasestorage.app",
    messagingSenderId: "96880864669",
    appId: "1:96880864669:web:a959c3794b2a3edfa71374",
    measurementId: "G-P1W0J0V9RL"
};
let auth = null; let db = null; let currentUser = null; let isAuthLoginMode = true;
try { if (!firebase.apps.length) firebase.initializeApp(firebaseConfig); auth = firebase.auth(); db = firebase.firestore(); } catch (err) { console.error(err); }

// ==========================================
// POLICE RULES CONSTANTS
// ==========================================
const POLICE_RULES = {
    MIN_BET: 20_000_000, HIGH_BET: 500_000_000, HUGE_BET: 10_000_000_000,
    RATE_LOW: 0.10, RATE_MID: 0.40, RATE_HIGH: 0.70,
    FINE_RATE: 0.50, BRIBE_RATE: 0.20, TIMEOUT_SEC: 5
};