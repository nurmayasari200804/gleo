document.addEventListener('DOMContentLoaded', function() {
    // Elemen DOM
    const loginOverlay = document.getElementById('loginOverlay');
    const mainHeader = document.getElementById('mainHeader');
    const mainContainer = document.getElementById('mainContainer');
    const mainFooter = document.getElementById('mainFooter');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const loginError = document.getElementById('loginError');
    const errorMessage = document.getElementById('errorMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const forgotPassword = document.getElementById('forgotPassword');
    const rememberMe = document.getElementById('rememberMe');
    
    // Kredensial login (bisa diganti dengan backend)
    const validCredentials = {
        username: 'mayaa',
        password: 'sateayam'
    };
    
    // Cek jika user sudah login sebelumnya
    checkRememberedLogin();
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Handle form login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        // Reset error
        loginError.style.display = 'none';
        usernameInput.classList.remove('error');
        passwordInput.classList.remove('error');
        
        // Validasi
        let isValid = true;
        
        if (!username) {
            showError(usernameInput, 'Username harus diisi');
            isValid = false;
        }
        
        if (!password) {
            showError(passwordInput, 'Password harus diisi');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Cek kredensial
        if (username === validCredentials.username && password === validCredentials.password) {
            // Simpan ke localStorage jika remember me dicentang
            if (rememberMe.checked) {
                localStorage.setItem('rememberedLogin', 'true');
                localStorage.setItem('username', username);
            } else {
                sessionStorage.setItem('loggedIn', 'true');
                localStorage.removeItem('rememberedLogin');
            }
            
            // Redirect ke halaman utama
            showMainContent();
        } else {
            showLoginError('Username atau password salah');
        }
    });
    
    // Handle forgot password
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Fitur Lupa Password: Silakan hubungi admin untuk reset password.\n\nUsername: 2024510007\nPassword: gleolays');
    });
    
    // Handle logout
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear storage
        localStorage.removeItem('rememberedLogin');
        localStorage.removeItem('username');
        sessionStorage.removeItem('loggedIn');
        
        // Reset form
        loginForm.reset();
        passwordInput.type = 'password';
        togglePassword.querySelector('i').className = 'fas fa-eye';
        
        // Show login
        showLoginForm();
    });
    
    // Fungsi untuk cek remembered login
    function checkRememberedLogin() {
        const remembered = localStorage.getItem('rememberedLogin');
        const sessionLoggedIn = sessionStorage.getItem('loggedIn');
        
        if (remembered === 'true' || sessionLoggedIn === 'true') {
            showMainContent();
        }
    }
    
    // Fungsi untuk show main content
    function showMainContent() {
        loginOverlay.style.display = 'none';
        mainHeader.style.display = 'block';
        mainContainer.style.display = 'block';
        mainFooter.style.display = 'block';
        
        // Inisialisasi navigasi halaman
        initPageNavigation();
    }
    
    // Fungsi untuk show login form
    function showLoginForm() {
        loginOverlay.style.display = 'flex';
        mainHeader.style.display = 'none';
        mainContainer.style.display = 'none';
        mainFooter.style.display = 'none';
    }
    
    // Fungsi untuk show error pada input
    function showError(inputElement, message) {
        inputElement.classList.add('error');
        const errorElement = inputElement.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Fungsi untuk show login error
    function showLoginError(message) {
        errorMessage.textContent = message;
        loginError.style.display = 'flex';
    }
    
    // Inisialisasi navigasi halaman
    function initPageNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        const prevButtons = document.querySelectorAll('[id^="prevBtn"]');
        const nextButtons = document.querySelectorAll('[id^="nextBtn"]');
        
        // Fungsi untuk mengganti halaman
        function switchPage(pageId) {
            // Update halaman aktif
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === pageId) {
                    page.classList.add('active');
                }
            });
            
            // Update navigasi aktif
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });
            
            // Scroll ke atas
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Event listener untuk navigasi
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                switchPage(pageId);
            });
        });
        
        // Event listener untuk tombol sebelumnya
        prevButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const currentPage = document.querySelector('.page.active');
                const currentPageNum = parseInt(currentPage.id.replace('page', ''));
                
                if (currentPageNum > 1) {
                    const prevPageId = 'page' + (currentPageNum - 1);
                    switchPage(prevPageId);
                }
            });
        });
        
        // Event listener untuk tombol selanjutnya
        nextButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const currentPage = document.querySelector('.page.active');
                const currentPageNum = parseInt(currentPage.id.replace('page', ''));
                
                if (currentPageNum < 4) {
                    const nextPageId = 'page' + (currentPageNum + 1);
                    switchPage(nextPageId);
                }
            });
        });
    }
});

