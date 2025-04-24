// Tab switching functionality
function showContent(tabIndex) {
    const tabs = document.querySelectorAll('.tab');
    const footerMessages = [
        'A light scan with the Website Vulnerability Scanner runs basic security checks...',
        'A deep scan performs comprehensive vulnerability assessment...',
        'CLI scan allows for automated and customized security testing...'
    ];

    // Update active tab
    tabs.forEach((tab, index) => {
        if (index === tabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update footer message
    const footer = document.querySelector('.footer span');
    footer.innerHTML = `<i class="fas fa-info-circle"></i> ${footerMessages[tabIndex]}`;
}

// Form validation and URL scanning
document.querySelector('.scan-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const targetUrl = document.getElementById('target-url').value;
    const protocol = document.getElementById('protocol').value;
    const scanType = document.querySelector('.tab.active').textContent.trim().toLowerCase();

    if (!targetUrl) {
        alert('Please enter a target URL');
        return;
    }

    // Here you would typically make an API call to start the scan
    console.log(`Starting ${scanType} scan on ${protocol}://${targetUrl}`);
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';

    // Simulate scan results (in real app, replace with actual API response)
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-play"></i> Start scan';
        displayScanResults(targetUrl, protocol, scanType);
    }, 2000);
});

function displayScanResults(url, protocol, scanType) {
    // Create or update scan details section
    let scanDetails = document.querySelector('.scan-details');
    if (!scanDetails) {
        scanDetails = document.createElement('div');
        scanDetails.className = 'scan-details';
        document.querySelector('.card').appendChild(scanDetails);
    }

    // Generate scan results (simulated)
    const results = {
        url: `${protocol}://${url}`,
        scanType: scanType,
        status: 'Completed',
        vulnerabilities: Math.floor(Math.random() * 10),
        lastScan: new Date().toLocaleString(),
        securityScore: Math.floor(Math.random() * 100),
        scanDuration: `${Math.floor(Math.random() * 5) + 1} minutes`
    };

    // Update scan details HTML
    scanDetails.innerHTML = `
        <h3><i class="fas fa-shield-alt"></i> Scan Results</h3>
        <div class="detail-item">
            <span class="detail-label">Target URL</span>
            <span class="detail-value">${results.url}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Scan Type</span>
            <span class="detail-value">${results.scanType}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Status</span>
            <span class="detail-value">${results.status}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Vulnerabilities Found</span>
            <span class="detail-value">${results.vulnerabilities}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Security Score</span>
            <span class="detail-value">${results.securityScore}/100</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Scan Duration</span>
            <span class="detail-value">${results.scanDuration}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Last Scan</span>
            <span class="detail-value">${results.lastScan}</span>
        </div>
    `;
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.querySelector('.fa-chevron-down').style.transform = 'rotate(180deg)';
    });

    link.addEventListener('mouseleave', function() {
        this.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
    });
});

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(22,29,37,0.98)';
    } else {
        nav.style.backgroundColor = 'rgba(22,29,37,0.95)';
    }
});

// Initialize the first tab
showContent(0);