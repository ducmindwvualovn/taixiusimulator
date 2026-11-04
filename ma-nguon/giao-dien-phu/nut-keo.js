// ==========================================
// FLOATING PHONE BUTTON - DRAG & DROP (FIXED)
// ==========================================
(function initFloatingPhoneDrag() {
    const btn = document.getElementById('floatingPhoneBtn');
    if (!btn) return;

    // --- Khôi phục vị trí đã lưu ---
    const savedPos = localStorage.getItem('sx_phone_btn_pos');
    if (savedPos) {
        try {
            const { x, y } = JSON.parse(savedPos);
            if (x >= 0 && y >= 0 && x < window.innerWidth - 20 && y < window.innerHeight - 20) {
                btn.style.left = x + 'px';
                btn.style.top = y + 'px';
                btn.style.right = 'auto';
                btn.style.bottom = 'auto';
            }
        } catch (e) {}
    }

    let isDragging = false;
    let hasMoved = false;
    let startX = 0, startY = 0;
    let offsetX = 0, offsetY = 0;
    let lastTouchTime = 0;
    const DRAG_THRESHOLD = 8;

    function getPoint(e) {
        if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        return { x: e.clientX, y: e.clientY };
    }

    function onDragStart(e) {
        const rect = btn.getBoundingClientRect();
        const p = getPoint(e);
        startX = p.x; startY = p.y;
        offsetX = p.x - rect.left;
        offsetY = p.y - rect.top;
        hasMoved = false;
        isDragging = true;
        btn.style.left = rect.left + 'px';
        btn.style.top = rect.top + 'px';
        btn.style.right = 'auto';
        btn.style.bottom = 'auto';
    }

    function onDragMove(e) {
        if (!isDragging) return;
        const p = getPoint(e);
        const dx = p.x - startX;
        const dy = p.y - startY;

        if (!hasMoved && Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) {
            hasMoved = true;
            btn.classList.add('dragging');
        }
        if (!hasMoved) return;

        const btnW = btn.offsetWidth;
        const btnH = btn.offsetHeight;
        let newLeft = p.x - offsetX;
        let newTop = p.y - offsetY;

        newLeft = Math.max(8, Math.min(window.innerWidth - btnW - 8, newLeft));
        newTop = Math.max(8, Math.min(window.innerHeight - btnH - 8, newTop));

        btn.style.left = newLeft + 'px';
        btn.style.top = newTop + 'px';

        if (e.cancelable) e.preventDefault();
    }

    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        btn.classList.remove('dragging');

        if (hasMoved) {
            const rect = btn.getBoundingClientRect();
            localStorage.setItem('sx_phone_btn_pos', JSON.stringify({
                x: Math.round(rect.left),
                y: Math.round(rect.top)
            }));
            lastTouchTime = Date.now();

            const preventClick = (ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                ev.stopImmediatePropagation();
            };
            btn.addEventListener('click', preventClick, true);
            setTimeout(() => {
                btn.removeEventListener('click', preventClick, true);
            }, 300);
        }
        hasMoved = false;
    }

    // Chuột (desktop)
    btn.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        onDragStart(e);
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
    });

    // Touch (mobile)
    btn.addEventListener('touchstart', (e) => {
        onDragStart(e);
        document.addEventListener('touchmove', onDragMove, { passive: false });
        document.addEventListener('touchend', onDragEnd);
        document.addEventListener('touchcancel', onDragEnd);
    }, { passive: true });

    // Cleanup
    const cleanup = () => {
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchmove', onDragMove);
        document.removeEventListener('touchend', onDragEnd);
        document.removeEventListener('touchcancel', onDragEnd);
    };
    window.addEventListener('mouseup', cleanup);
    window.addEventListener('touchend', cleanup);
    window.addEventListener('touchcancel', cleanup);

    // Resize (xoay ngang) → giữ nút trong màn hình
    window.addEventListener('resize', () => {
        if (btn.style.left === 'auto' || !btn.style.left) return;
        const rect = btn.getBoundingClientRect();
        const btnW = btn.offsetWidth;
        const btnH = btn.offsetHeight;
        let newLeft = Math.max(8, Math.min(window.innerWidth - btnW - 8, rect.left));
        let newTop = Math.max(8, Math.min(window.innerHeight - btnH - 8, rect.top));
        btn.style.left = newLeft + 'px';
        btn.style.top = newTop + 'px';
        localStorage.setItem('sx_phone_btn_pos', JSON.stringify({
            x: Math.round(newLeft), y: Math.round(newTop)
        }));
    });

    // Double-tap / Double-click → reset về góc phải dưới
    function resetBtnPosition() {
        btn.style.left = 'auto';
        btn.style.top = 'auto';
        btn.style.right = '16px';
        btn.style.bottom = '16px';
        localStorage.removeItem('sx_phone_btn_pos');
        if (typeof showFloatingText === 'function') {
            showFloatingText('📍 Đã reset vị trí nút!', '#3498db');
        }
    }

    btn.addEventListener('dblclick', resetBtnPosition);

    let lastTap = 0;
    btn.addEventListener('touchend', () => {
        const now = Date.now();
        if (!hasMoved && now - lastTap < 300 && now - lastTouchTime > 400) {
            resetBtnPosition();
        }
        lastTap = now;
    });
})();