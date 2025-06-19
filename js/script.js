// Data Motor
const motorData = {
    Honda: ['Beat', 'Vario', 'PCX', 'Scoopy'],
    Yamaha: ['Mio', 'NMAX', 'Aerox', 'Lexi'],
    Suzuki: ['Address', 'NEX', 'Burgman']
};

// Data Testimoni
const testimoniData = [
    {
        nama: "Budi Santoso",
        text: "Pelayanan sangat memuaskan! Motor dalam kondisi prima dan proses sewa sangat mudah. Harga juga terjangkau.",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        nama: "Siti Rahayu",
        text: "Sudah beberapa kali sewa di sini, selalu puas. Motor bersih, bensin selalu full, dan staffnya ramah.",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        nama: "Ahmad Fauzi",
        text: "Recommended banget! Proses cepat, tidak ribet, dan motornya bagus-bagus semua.",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        nama: "Dewi Kartika",
        text: "Pertama kali sewa motor online, ternyata mudah sekali. Terima kasih RentalMotor!",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        nama: "Eko Prasetyo",
        text: "Harga kompetitif, motor terawat dengan baik. Pasti akan sewa lagi di masa depan.",
        rating: "⭐⭐⭐⭐⭐"
    },
    {
        nama: "Maya Sari",
        text: "Pelayanan 24 jam sangat membantu. Motor selalu siap pakai, tidak pernah mengecewakan.",
        rating: "⭐⭐⭐⭐⭐"
    }
];

// Load testimoni saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    loadTestimoni();
    setMinDate();
});

// Fungsi untuk memuat testimoni
function loadTestimoni() {
    const testimoniGrid = document.getElementById('testimoniGrid');
    if (!testimoniGrid) return;
    
    testimoniGrid.innerHTML = '';
    
    testimoniData.forEach(testimoni => {
        const testimoniCard = document.createElement('div');
        testimoniCard.className = 'testimoni-card';
        testimoniCard.innerHTML = `
            <div class="testimoni-text">${testimoni.text}</div>
            <div class="testimoni-author">- ${testimoni.nama}</div>
            <div class="testimoni-rating">${testimoni.rating}</div>
        `;
        testimoniGrid.appendChild(testimoniCard);
    });
}

// Fungsi untuk membuka popup reservasi
function openReservasiPopup(merk = '', tipe = '') {
    const popup = document.getElementById('reservasiPopup');
    const merkSelect = document.getElementById('merkMotor');
    const tipeSelect = document.getElementById('tipeMotor');
    
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Pre-fill jika ada parameter
        if (merk) {
            merkSelect.value = merk;
            updateTipeMotor();
            if (tipe) {
                setTimeout(() => {
                    tipeSelect.value = tipe;
                }, 100);
            }
        }
    }
}

// Fungsi untuk menutup popup reservasi
function closeReservasiPopup() {
    const popup = document.getElementById('reservasiPopup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset form
        document.getElementById('reservasiForm').reset();
        document.getElementById('tipeMotor').innerHTML = '<option value="">Pilih Tipe</option>';
    }
}

// Fungsi untuk update tipe motor berdasarkan merk
function updateTipeMotor() {
    const merkSelect = document.getElementById('merkMotor');
    const tipeSelect = document.getElementById('tipeMotor');
    const selectedMerk = merkSelect.value;
    
    tipeSelect.innerHTML = '<option value="">Pilih Tipe</option>';
    
    if (selectedMerk && motorData[selectedMerk]) {
        motorData[selectedMerk].forEach(tipe => {
            const option = document.createElement('option');
            option.value = tipe;
            option.textContent = tipe;
            tipeSelect.appendChild(option);
        });
    }
}

// Fungsi untuk set minimum date (hari ini)
function setMinDate() {
    const dateInput = document.getElementById('tanggalSewa');
    if (dateInput) {
        const today = new Date();
        const minDate = today.toISOString().split('T')[0];
        dateInput.min = minDate;
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const reservasiForm = document.getElementById('reservasiForm');
    if (reservasiForm) {
        reservasiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validasi form
            const merkMotor = document.getElementById('merkMotor').value;
            const tipeMotor = document.getElementById('tipeMotor').value;
            const namaLengkap = document.getElementById('namaLengkap').value;
            const noHp = document.getElementById('noHp').value;
            const tanggalSewa = document.getElementById('tanggalSewa').value;
            const lamaSewa = document.getElementById('lamaSewa').value;
            
            if (!merkMotor || !tipeMotor || !namaLengkap || !noHp || !tanggalSewa || !lamaSewa) {
                alert('Mohon lengkapi semua field yang diperlukan!');
                return;
            }
            
            // Validasi nomor HP
            const phonePattern = /^[0-9]{10,13}$/;
            if (!phonePattern.test(noHp.replace(/[^0-9]/g, ''))) {
                alert('Nomor HP tidak valid! Masukkan 10-13 digit angka.');
                return;
            }
            
            // Simpan data ke localStorage (simulasi)
            const reservasiData = {
                merkMotor,
                tipeMotor,
                namaLengkap,
                noHp,
                tanggalSewa,
                lamaSewa,
                timestamp: new Date().toISOString()
            };
            
            // Simulate saving to localStorage (in real app)
            console.log('Data Reservasi:', reservasiData);
            
            // Redirect ke halaman pembayaran
            alert('Data reservasi berhasil disimpan! Akan dialihkan ke halaman pembayaran.');
            window.location.href = 'pembayaran.html';
        });
    }
    
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                alert('Mohon isi email dan password!');
                return;
            }
            
            // Simulasi login
            if (email === 'admin@rentalmotor.com' && password === 'admin123') {
                alert('Login berhasil sebagai Admin!');
                window.location.href = 'admin/dashboard.html';
            } else if (email.includes('@') && password.length >= 6) {
                alert('Login berhasil sebagai User!');
                window.location.href = 'index.html';
            } else {
                alert('Email atau password salah!');
            }
        });
    }
    
    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const namaLengkap = document.getElementById('regNamaLengkap').value;
            
            // Validasi
            if (!email || !password || !confirmPassword || !namaLengkap) {
                alert('Mohon lengkapi semua field yang diperlukan!');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak cocok!');
                return;
            }
            
            if (password.length < 6) {
                alert('Password minimal 6 karakter!');
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Format email tidak valid!');
                return;
            }
            
            // Simulasi registrasi berhasil
            alert('Registrasi berhasil! Silakan login dengan akun Anda.');
            window.location.href = 'login.html';
        });
    }
    
    // Pembayaran form handler
    const pembayaranForm = document.getElementById('pembayaranForm');
    if (pembayaranForm) {
        pembayaranForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const buktiPembayaran = document.getElementById('buktiPembayaran').files[0];
            
            if (!buktiPembayaran) {
                alert('Mohon upload bukti pembayaran!');
                return;
            }
            
            // Simulasi upload berhasil
            alert('Bukti pembayaran berhasil di-upload!');
            
            // Simulasi konfirmasi pembayaran
            setTimeout(() => {
                if (confirm('Konfirmasi bahwa Anda sudah melakukan pembayaran sesuai dengan jumlah yang tertera?')) {
                    const phoneNumber = '6281234567890'; // Nomor WA dummy
                    const message = encodeURIComponent('Halo, saya sudah melakukan pembayaran untuk rental motor. Mohon dikonfirmasi. Terima kasih!');
                    const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                    
                    alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk konfirmasi lebih lanjut.');
                    window.open(waUrl, '_blank');
                }
            }, 1000);
        });
    }
});

// Fungsi untuk menampilkan nama file yang dipilih
function displayFileName(input, displayId) {
    const display = document.getElementById(displayId);
    if (input.files && input.files[0] && display) {
        display.textContent = input.files[0].name;
        display.style.color = '#28a745';
    }
}

// Fungsi untuk menutup popup dengan ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeReservasiPopup();
    }
});

// Fungsi untuk menutup popup saat klik overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-overlay')) {
        closeReservasiPopup();
    }
});

// Smooth scrolling untuk navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Fungsi untuk menghitung total harga (bisa digunakan di halaman pembayaran)
function hitungTotalHarga(tipeMotor, lamaSewa) {
    const hargaPerHari = {
        'Beat': 80000,
        'Vario': 90000,
        'PCX': 120000,
        'Mio': 75000,
        'NMAX': 110000,
        'Aerox': 100000,
        'Address': 85000,
        'NEX': 70000
    };
    
    const harga = hargaPerHari[tipeMotor] || 0;
    return harga * parseInt(lamaSewa);
}