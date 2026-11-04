// ==========================================
// ĐĂNG NHẬP / ĐĂNG KÝ FIREBASE AUTH
// ==========================================
if (auth) {
    auth.onAuthStateChanged(user => {
        currentUser = user;
        const cloudIcon = document.getElementById('cloudStatusIcon');
        const cloudText = document.getElementById('cloudStatusText');
        const cloudEmail = document.getElementById('cloudUserEmailDisplay');
        const authBtnText = document.getElementById('authBtnText');
        const authLogged = document.getElementById('authLoggedInState');
        const authForm = document.getElementById('authFormState');
        if (user) {
            cloudIcon.className = "w-2 h-2 rounded-full bg-emerald-400 animate-pulse";
            cloudText.innerText = "Cloud Firestore: Đã Đồng Bộ Online";
            cloudEmail.innerText = user.email;
            authBtnText.innerText = user.email.split('@')[0];
            document.getElementById('currentUserEmailText').innerText = user.email;
            document.getElementById('currentUserUidText').innerText = `UID: ${user.uid}`;
            authLogged.classList.remove('hidden');
            authForm.classList.add('hidden');
            loadDataFromFirestore(user.uid);
        } else {
            cloudIcon.className = "w-2 h-2 rounded-full bg-amber-400";
            cloudText.innerText = "Chế độ Khách (Offline Storage)";
            cloudEmail.innerText = "Chưa đăng nhập";
            authBtnText.innerText = "Đăng Nhập";
            authLogged.classList.add('hidden');
            authForm.classList.remove('hidden');
        }
    });
}

function openAuthModal() {
    playTone('chip');
    document.getElementById('authErrorMsg').classList.add('hidden');
    document.getElementById('authModal').classList.remove('hidden');
    document.getElementById('authModal').classList.add('flex');
    lockBodyScroll();
}
function closeAuthModal() {
    playTone('chip');
    document.getElementById('authModal').classList.remove('flex');
    document.getElementById('authModal').classList.add('hidden');
    unlockBodyScroll();
}

function toggleAuthMode() {
    playTone('chip');
    isAuthLoginMode = !isAuthLoginMode;
    document.getElementById('authErrorMsg').classList.add('hidden');
    const title = document.getElementById('authModalTitle');
    const primaryBtnText = document.getElementById('authPrimaryBtnText');
    const prompt = document.getElementById('authSwitchPrompt');
    const switchBtn = document.getElementById('authSwitchBtn');
    if (isAuthLoginMode) {
        title.innerText = "Đăng Nhập Tài Khoản";
        primaryBtnText.innerText = "Đăng Nhập";
        prompt.innerText = "Chưa có tài khoản?";
        switchBtn.innerText = "Đăng ký mới";
    } else {
        title.innerText = "Đăng Ký Tài Khoản Mới";
        primaryBtnText.innerText = "Tạo Tài Khoản";
        prompt.innerText = "Đã có tài khoản?";
        switchBtn.innerText = "Đăng nhập ngay";
    }
}

async function handleAuthAction() {
    if (!auth) return showAuthError("Firebase Auth chưa khởi tạo!");
    const email = document.getElementById('authEmailInput').value.trim();
    const password = document.getElementById('authPasswordInput').value;
    if (!email || !password) return showAuthError("Vui lòng điền Email và Mật khẩu!");
    const errorBox = document.getElementById('authErrorMsg'); errorBox.classList.add('hidden');
    try {
        if (isAuthLoginMode) {
            await auth.signInWithEmailAndPassword(email, password);
            playTone('win'); showFloatingText("Đăng nhập thành công!", "#2ecc71");
            closeAuthModal();
        } else {
            await auth.createUserWithEmailAndPassword(email, password);
            playTone('win'); showFloatingText("Đăng ký thành công!", "#2ecc71");
            await syncDataToFirestore(false);
            closeAuthModal();
        }
    } catch (err) {
        let message = err.message;
        if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') message = "Email hoặc mật khẩu không chính xác.";
        else if (err.code === 'auth/email-already-in-use') message = "Email này đã được đăng ký.";
        else if (err.code === 'auth/weak-password') message = "Mật khẩu quá yếu (ít nhất 6 ký tự).";
        showAuthError(message);
    }
}

function showAuthError(msg) {
    const errorBox = document.getElementById('authErrorMsg');
    errorBox.innerText = msg;
    errorBox.classList.remove('hidden');
    playTone('lose');
}

async function handleFirebaseLogout() {
    if (auth) {
        try {
            await auth.signOut();
            playTone('chip'); showFloatingText("Đã đăng xuất!", "#f39c12");
            closeAuthModal();
        } catch (e) {}
    }
}