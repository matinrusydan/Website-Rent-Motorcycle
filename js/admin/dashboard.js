// js/admin/dashboard.js

// Pure JavaScript Implementation (No jQuery Required)
(function() {
    "use strict";

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeDashboard();
    });

    function initializeDashboard() {
        setupSidebarToggle();
        setupScrollToTop();
        loadDashboardData();
        setupNavigationHandlers();
        setupWindowResize();
    }

    // Sidebar Toggle Functionality - SIMPLIFIED (No Content Wrapper Toggle)
    function setupSidebarToggle() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarToggleTop = document.getElementById('sidebarToggleTop');
        const sidebar = document.querySelector('.sidebar');
        const body = document.body;

        function toggleSidebar() {
            // Only toggle sidebar classes, NOT content-wrapper
            body.classList.toggle('sidebar-toggled');
            sidebar.classList.toggle('toggled');
            
            if (sidebar.classList.contains('toggled')) {
                // Hide any open collapses when sidebar is toggled
                const collapses = sidebar.querySelectorAll('.collapse.show');
                collapses.forEach(collapse => {
                    collapse.classList.remove('show');
                });
            }
        }

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }
        
        if (sidebarToggleTop) {
            sidebarToggleTop.addEventListener('click', toggleSidebar);
        }
    }

    // Scroll to Top Functionality
    function setupScrollToTop() {
        const scrollToTop = document.querySelector('.scroll-to-top');
        
        if (!scrollToTop) return;

        // Show/hide scroll to top button
        function handleScroll() {
            if (window.pageYOffset > 100) {
                scrollToTop.style.display = 'block';
                scrollToTop.style.opacity = '1';
            } else {
                scrollToTop.style.display = 'none';
                scrollToTop.style.opacity = '0';
            }
        }

        // Smooth scroll to top
        function scrollToTopHandler(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Add event listeners
        window.addEventListener('scroll', handleScroll);
        scrollToTop.addEventListener('click', scrollToTopHandler);

        // Initial check
        handleScroll();
    }

    // Window Resize Handler
    function setupWindowResize() {
        window.addEventListener('resize', function() {
            const sidebar = document.querySelector('.sidebar');
            const body = document.body;

            if (window.innerWidth < 768) {
                // Hide collapses on small screens
                const collapses = sidebar.querySelectorAll('.collapse.show');
                collapses.forEach(collapse => {
                    collapse.classList.remove('show');
                });
            }
            
            // Auto-toggle sidebar on very small screens
            if (window.innerWidth < 480 && !sidebar.classList.contains('toggled')) {
                body.classList.add('sidebar-toggled');
                sidebar.classList.add('toggled');
                // Hide collapses when sidebar is auto-toggled
                const collapses = sidebar.querySelectorAll('.collapse.show');
                collapses.forEach(collapse => {
                    collapse.classList.remove('show');
                });
            }

            // Resize charts if they exist
            if (window.Chart && Chart.instances) {
                Chart.instances.forEach(function(instance) {
                    instance.resize();
                });
            }
        });
    }

    // Navigation Handlers
    function setupNavigationHandlers() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                // Don't prevent default for actual navigation
                // Just update active states
                updateActiveNavigation(this);
            });
        });
    }

    function updateActiveNavigation(clickedLink) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(function(item) {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        clickedLink.parentElement.classList.add('active');
    }

})();

// Chart Data and Configuration
const chartData = {
    // Area Chart Data (Monthly Reservations)
    monthlyReservations: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [12, 19, 8, 15, 22, 18, 25, 28, 32, 24, 18, 15]
    },
    
    // Pie Chart Data (Motor Status)
    motorStatus: {
        labels: ['Tersedia', 'Disewa', 'Maintenance'],
        data: [28, 15, 5],
        colors: ['#4e73df', '#1cc88a', '#36b9cc']
    },
    
    // Bar Chart Data (Testimonials & User Activity)
    userActivity: {
        labels: ['Testimoni Pending', 'Testimoni Approved', 'User Aktif', 'User Baru', 'Pembayaran Sukses'],
        data: [8, 45, 156, 23, 89]
    }
};

// Initialize Charts
function initializeCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded. Charts will not be displayed.');
        return;
    }

    // Area Chart
    const areaCtx = document.getElementById('myAreaChart');
    if (areaCtx) {
        new Chart(areaCtx, {
            type: 'line',
            data: {
                labels: chartData.monthlyReservations.labels,
                datasets: [{
                    label: 'Reservasi',
                    data: chartData.monthlyReservations.data,
                    backgroundColor: 'rgba(78, 115, 223, 0.1)',
                    borderColor: 'rgba(78, 115, 223, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Pie Chart
    const pieCtx = document.getElementById('myPieChart');
    if (pieCtx) {
        new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: chartData.motorStatus.labels,
                datasets: [{
                    data: chartData.motorStatus.data,
                    backgroundColor: chartData.motorStatus.colors,
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                cutout: '60%'
            }
        });
    }

    // Bar Chart
    const barCtx = document.getElementById('myBarChart');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: chartData.userActivity.labels,
                datasets: [{
                    label: 'Jumlah',
                    data: chartData.userActivity.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// Update Dashboard Statistics
function updateDashboardStats() {
    const stats = {
        totalUsers: 245,
        totalMotors: 48,
        totalReservations: 156,
        totalPayments: 'Rp 15.750.000'
    };

    // Update stat cards
    const totalUsersEl = document.getElementById('totalUsers');
    const totalMotorsEl = document.getElementById('totalMotors');
    const totalReservationsEl = document.getElementById('totalReservations');
    const totalPaymentsEl = document.getElementById('totalPayments');

    if (totalUsersEl) totalUsersEl.textContent = stats.totalUsers;
    if (totalMotorsEl) totalMotorsEl.textContent = stats.totalMotors;
    if (totalReservationsEl) totalReservationsEl.textContent = stats.totalReservations;
    if (totalPaymentsEl) totalPaymentsEl.textContent = stats.totalPayments;

    // Animate numbers (optional)
    animateNumbers();
}

// Animate numbers function
function animateNumbers() {
    const numbers = document.querySelectorAll('.h5.mb-0.font-weight-bold.text-gray-800');
    
    numbers.forEach(function(number) {
        const text = number.textContent;
        const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (numericValue && numericValue > 0) {
            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(function() {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                
                if (text.includes('Rp')) {
                    number.textContent = 'Rp ' + Math.floor(currentValue).toLocaleString('id-ID');
                } else {
                    number.textContent = Math.floor(currentValue);
                }
            }, 20);
        }
    });
}

// Load dashboard data (simulate API call)
function loadDashboardData() {
    // Simulate loading state
    const loadingElements = document.querySelectorAll('.h5.mb-0.font-weight-bold.text-gray-800');
    loadingElements.forEach(function(el) {
        el.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    });

    // Simulate API delay
    setTimeout(function() {
        updateDashboardStats();
        initializeCharts();
    }, 1000);
}

// Refresh dashboard data
function refreshDashboard() {
    console.log('Refreshing dashboard data...');
    loadDashboardData();
}

// Auto refresh every 5 minutes
setInterval(refreshDashboard, 300000);

// Utility functions
const DashboardUtils = {
    // Show notification
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 5000);
    },
    
    // Confirm dialog
    confirm: function(message, callback) {
        if (confirm(message)) {
            callback();
        }
    },
    
    // Loading state
    setLoading: function(element, loading = true) {
        if (loading) {
            element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            element.disabled = true;
        } else {
            element.innerHTML = element.getAttribute('data-original-text') || 'Submit';
            element.disabled = false;
        }
    }
};

// Export for use in other files
window.DashboardUtils = DashboardUtils;
window.chartData = chartData;