// pembayaran.js - Payment Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load reservation data
    loadReservationData();
    
    // Setup file upload
    setupFileUpload();
    
    // Setup form submission
    setupFormSubmission();
    
    // Setup copy functionality
    setupCopyFunctionality();
});

// Load reservation data (simulated - would normally come from localStorage or API)
function loadReservationData() {
    const sampleData = {
        motor: 'Honda Beat',
        nama: 'Budi Santoso',
        tanggal: '21 Juni 2025',
        lama: '3 hari',
        total: 'Rp 240.000'
    };
    
    // Update DOM elements
    document.getElementById('motorDetail').textContent = sampleData.motor;
    document.getElementById('namaDetail').textContent = sampleData.nama;
    document.getElementById('tanggalDetail').textContent = sampleData.tanggal;
    document.getElementById('lamaDetail').textContent = sampleData.lama;
    document.getElementById('totalHarga').textContent = sampleData.total;
}

// Setup file upload functionality
function setupFileUpload() {
    const fileInput = document.getElementById('buktiPembayaran');
    const uploadArea = document.getElementById('fileUploadArea');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const fileName = document.getElementById('fileName');
    const uploadPlaceholder = uploadArea.querySelector('.upload-placeholder');

    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('File terlalu besar. Maksimal 5MB.', 'error');
                fileInput.value = '';
                return;
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                showNotification('Format file tidak didukung. Gunakan JPG, PNG, atau PDF.', 'error');
                fileInput.value = '';
                return;
            }

            // Show success state
            fileName.textContent = file.name;
            uploadPlaceholder.style.display = 'none';
            uploadSuccess.style.display = 'flex';
            uploadArea.style.borderColor = 'var(--success-color)';
            uploadArea.style.backgroundColor = '#f0fff4';
        }
    });

    // Handle drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
        uploadArea.style.backgroundColor = 'var(--gray-100)';
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--gray-300)';
        uploadArea.style.backgroundColor = 'transparent';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--gray-300)';
        uploadArea.style.backgroundColor = 'transparent';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            fileInput.dispatchEvent(new Event('change'));
        }
    });
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('pembayaranForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-icon">⏳</span>Memproses...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessModal();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Validate form
function validateForm() {
    const fileInput = document.getElementById('buktiPembayaran');
    
    if (!fileInput.files || fileInput.files.length === 0) {
        showNotification('Silakan upload bukti pembayaran terlebih dahulu.', 'error');
        return false;
    }
    
    return true;
}

// Setup copy functionality
function setupCopyFunctionality() {
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Nomor rekening berhasil disalin!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Nomor rekening berhasil disalin!', 'success');
        });
    };
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
        max-width: 400px;
        transform: translateX(100%);
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.8;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Get notification color
function getNotificationColor(type) {
    const colors = {
        success: '#48BB78',
        error: '#F56565',
        warning: '#ED8936',
        info: '#4299E1'
    };
    return colors[type] || colors.info;
}

// Show success modal
function showSuccessModal() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">✅</div>
            <h2 class="modal-title">Pembayaran Berhasil Dikonfirmasi!</h2>
            <p class="modal-message">
                Terima kasih! Bukti pembayaran Anda telah berhasil diunggah. 
                Tim kami akan memverifikasi pembayaran dalam 1-2 jam kerja.
            </p>
            <div class="modal-info">
                <div class="info-item">
                    <strong>📱 Notifikasi:</strong> Anda akan menerima konfirmasi via WhatsApp
                </div>
                <div class="info-item">
                    <strong>🏍️ Motor:</strong> Siap diambil setelah verifikasi
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="window.location.href='index.html'">
                    Kembali ke Beranda
                </button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2.5rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    `;
    
    // Add additional styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
        }
        .modal-title {
            color: var(--primary-color);
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        .modal-message {
            color: var(--secondary-color);
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        .modal-info {
            background: var(--gray-100);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: left;
        }
        .modal-info .info-item {
            margin-bottom: 1rem;
            color: var(--secondary-color);
        }
        .modal-info .info-item:last-child {
            margin-bottom: 0;
        }
        .modal-actions {
            display: flex;
            justify-content: center;
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Add to DOM
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Trigger animations
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    function closeModal() {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        setTimeout(() => {
            overlay.remove();
            modalStyle.remove();
        }, 300);
    }
}

// Format currency (utility function)
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Smooth scroll to element (utility function)
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}