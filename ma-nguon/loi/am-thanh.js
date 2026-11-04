// ==========================================
// ÂM THANH
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    if (type === 'chip') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(800, now); osc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);
        gain.gain.setValueAtTime(0.2, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        osc.start(); osc.stop(now + 0.06);
    } else if (type === 'tick') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(1000, now);
        gain.gain.setValueAtTime(0.08, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(); osc.stop(now + 0.03);
    } else if (type === 'win') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((f, i) => {
            const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
            o.connect(g); g.connect(audioCtx.destination);
            o.frequency.setValueAtTime(f, now + i * 0.09);
            g.gain.setValueAtTime(0.2, now + i * 0.09); g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.09 + 0.25);
            o.start(now + i * 0.09); o.stop(now + i * 0.09 + 0.25);
        });
    } else if (type === 'lose') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(280, now); osc.frequency.exponentialRampToValueAtTime(85, now + 0.35);
        gain.gain.setValueAtTime(0.25, now); gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(); osc.stop(now + 0.35);
    }
}

function playUrgentTick() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    osc.type = 'square';
    osc.frequency.setValueAtTime(1500, now); osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.start(); osc.stop(now + 0.08);
}