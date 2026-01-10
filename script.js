// Data halaman
const pages = ['page1', 'page2', 'page3', 'page4'];
let currentPageIndex = 0;

// Data login (dalam aplikasi nyata, data ini disimpan di server)
const validCredentials = {
    username: "mayaa",
    password: "sateayam"
};

// Cek apakah user sudah login
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const savedUsername = localStorage.getItem('username');
    
    if (isLoggedIn && savedUsername) {
        showMainContent();
        return true;
    }
    return false;
}

// Tampilkan form login
function showLoginForm() {
    document.getElementById('loginOverlay').style.display = 'flex';
    document.getElementById('mainHeader').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('mainFooter').style.display = 'none';
}

// Tampilkan konten utama setelah login
function showMainContent() {
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('mainHeader').style.display = 'block';
    document.getElementById('mainContainer').style.display = 'block';
    document.getElementById('mainFooter').style.display = 'block';
    
    // Tampilkan username di header jika tersedia
    const username = localStorage.getItem('username');
    if (username) {
        const loginHeader = document.querySelector('.login-header h2');
        if (loginHeader) {
            loginHeader.innerHTML = `Selamat datang, <span style="color: var(--secondary-color);">${username}</span>`;
        }
    }
}

// Fungsi login
function login(username, password, rememberMe) {
    // Validasi sederhana (dalam aplikasi nyata, validasi dilakukan di server)
    if (username === validCredentials.username && password === validCredentials.password) {
        // Simpan status login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
        
        // Tampilkan konten utama
        showMainContent();
        
        // Reset form
        document.getElementById('loginForm').reset();
        document.getElementById('loginError').textContent = '';
        
        return true;
    } else {
        // Tampilkan pesan error
        document.getElementById('loginError').textContent = 'Username atau password salah!';
        return false;
    }
}

// Fungsi logout
function logout() {
    // Hapus data login dari localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    // Kembali ke form login
    showLoginForm();
    
    // Reset form
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').textContent = '';
}

// Fungsi untuk mengganti halaman
function changePage(direction) {
    // Sembunyikan halaman aktif
    document.getElementById(pages[currentPageIndex]).classList.remove('active');
    document.querySelectorAll('.nav-link')[currentPageIndex].classList.remove('active');
    
    // Tentukan halaman baru
    if (direction === 'next' && currentPageIndex < pages.length - 1) {
        currentPageIndex++;
    } else if (direction === 'prev' && currentPageIndex > 0) {
        currentPageIndex--;
    }
    
    // Tampilkan halaman baru
    document.getElementById(pages[currentPageIndex]).classList.add('active');
    document.querySelectorAll('.nav-link')[currentPageIndex].classList.add('active');
    
    // Update status tombol navigasi
    updateNavigationButtons();
}

// Fungsi untuk navigasi langsung ke halaman tertentu
function goToPage(pageId) {
    // Sembunyikan halaman aktif
    document.getElementById(pages[currentPageIndex]).classList.remove('active');
    document.querySelectorAll('.nav-link')[currentPageIndex].classList.remove('active');
    
    // Tentukan halaman baru berdasarkan ID
    currentPageIndex = pages.indexOf(pageId);
    
    // Tampilkan halaman baru
    document.getElementById(pages[currentPageIndex]).classList.add('active');
    document.querySelectorAll('.nav-link')[currentPageIndex].classList.add('active');
    
    // Update status tombol navigasi
    updateNavigationButtons();
}

// Fungsi untuk update status tombol navigasi
function updateNavigationButtons() {
    // Update semua tombol halaman
    const pageButtons = document.querySelectorAll('.page-btn');
    
    // Untuk setiap halaman, perbarui teks dan status tombol
    pages.forEach((pageId, index) => {
        const pageElement = document.getElementById(pageId);
        const pageIndicator = pageElement.querySelector('.page-numbers span');
        
        if (pageIndicator) {
            pageIndicator.textContent = `Halaman ${index + 1} dari ${pages.length}`;
        }
    });
    
    // Update tombol navigasi utama
    updateMainNavigationButtons();
}

// Fungsi untuk update tombol navigasi utama
function updateMainNavigationButtons() {
    // Update tombol "Sebelumnya" untuk semua halaman
    document.querySelectorAll('.page-btn:nth-child(1)').forEach((btn, index) => {
        btn.disabled = index === 0;
        // Update event listener
        btn.onclick = function() { changePage('prev'); };
    });
    
    // Update tombol "Selanjutnya" untuk semua halaman
    document.querySelectorAll('.page-btn:nth-child(3)').forEach((btn, index) => {
        btn.disabled = index === pages.length - 1;
        // Update event listener
        btn.onclick = function() { changePage('next'); };
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Cek status login
    const isLoggedIn = checkLoginStatus();
    
    if (!isLoggedIn) {
        showLoginForm();
    }
    
    // Event listener untuk form login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        login(username, password, rememberMe);
    });
    
    // Event listener untuk tombol logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Event listener untuk toggle password visibility
    document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const icon = this;
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
    
    // Event listener untuk lupa password
    document.getElementById('forgotPassword').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('loginError').textContent = 'Silakan hubungi administrator untuk reset password.';
    });
    
    // Event listener untuk navigasi menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            goToPage(pageId);
        });
    });
    
    // Update status tombol navigasi awal
    updateNavigationButtons();
    
    // Tambahkan event listener untuk tombol keyboard
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            changePage('next');
        } else if (e.key === 'ArrowLeft') {
            changePage('prev');
        }
    });
    
    // Event listener untuk tombol halaman spesifik
    document.getElementById('prevBtn1').onclick = function() { changePage('prev'); };
    document.getElementById('nextBtn1').onclick = function() { changePage('next'); };
    document.getElementById('prevBtn2').onclick = function() { changePage('prev'); };
    document.getElementById('nextBtn2').onclick = function() { changePage('next'); };
    document.getElementById('prevBtn3').onclick = function() { changePage('prev'); };
    document.getElementById('nextBtn3').onclick = function() { changePage('next'); };
    document.getElementById('prevBtn4').onclick = function() { changePage('prev'); };
    document.getElementById('nextBtn4').onclick = function() { changePage('next'); };
});