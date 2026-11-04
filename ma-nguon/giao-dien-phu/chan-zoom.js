// ==========================================================
// CHỐNG ZOOM & BÔI ĐEN (CHẠY SỚM - KHÔNG DEFER)
// ==========================================================
(function preventZoomAndSelect() {
    // Chặn pinch zoom (2 ngón) trên iOS Safari
    document.addEventListener('gesturestart', e => e.preventDefault(), { passive: false });
    document.addEventListener('gesturechange', e => e.preventDefault(), { passive: false });
    document.addEventListener('gestureend', e => e.preventDefault(), { passive: false });

    // Chặn double-tap zoom (iOS + Android)
    let lastTouch = 0;
    document.addEventListener('touchend', function (e) {
        const now = Date.now();
        if (now - lastTouch <= 300) { e.preventDefault(); }
        lastTouch = now;
    }, { passive: false });

    // Chặn Ctrl + wheel zoom (desktop)
    document.addEventListener('wheel', function (e) {
        if (e.ctrlKey) e.preventDefault();
    }, { passive: false });

    // Chặn Ctrl + / - / 0
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && ['+', '-', '=', '0'].includes(e.key)) {
            e.preventDefault();
        }
    });

    // Chặn double-click bôi đen (desktop)
    document.addEventListener('mousedown', function (e) {
        if (e.detail > 1) e.preventDefault();
    });

    // Chặn bôi đen bằng kéo chuột/ngón tay (trừ input/textarea)
    document.addEventListener('selectstart', function (e) {
        if (!e.target.closest('input, textarea, [contenteditable="true"]')) {
            e.preventDefault();
        }
    });

    // Chặn menu chuột phải (trừ input/textarea)
    document.addEventListener('contextmenu', e => {
        if (!e.target.closest('input, textarea, [contenteditable="true"]')) {
            e.preventDefault();
        }
    });

    // Chặn copy / cut
    document.addEventListener('copy', e => {
        if (!e.target.closest('input, textarea, [contenteditable="true"]')) {
            e.preventDefault();
        }
    });
    document.addEventListener('cut', e => {
        if (!e.target.closest('input, textarea, [contenteditable="true"]')) {
            e.preventDefault();
        }
    });

    // Chặn kéo ảnh
    document.addEventListener('dragstart', e => e.preventDefault());
})();