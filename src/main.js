// App State
let state = {
    user: {
        name: '',
        businessName: '',
        path: '' // 'formal' or 'informal'
    },
    creditScore: 450, // Initial baseline
    transactions: [],
    currentScreen: 'splash-screen'
};

// Navigation Logic
function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        state.currentScreen = screenId;

        // Contextual updates
        if (screenId === 'dashboard-screen') updateDashboard();
        if (screenId === 'score-breakdown-screen') {
            const inf = document.getElementById('informal-factor');
            const btn = document.getElementById('endorsement-btn');
            if (state.user.path === 'informal') {
                inf.style.display = 'block';
                btn.style.display = 'block';
            } else {
                inf.style.display = 'none';
                btn.style.display = 'none';
            }
        }
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

function handleLoanApplication() {
    const amount = document.getElementById('loan-amount').value;
    const overlay = document.getElementById('loan-decision');
    const title = document.getElementById('decision-title');
    const msg = document.getElementById('decision-msg');

    overlay.style.display = 'flex';
    title.innerText = 'Analyzing Data...';
    msg.innerText = 'Evaluating your transaction consistency and business growth.';

    setTimeout(() => {
        if (amount == "100000" && state.creditScore < 700) {
            title.innerText = 'Referral Required';
            msg.innerText = 'Your score is almost there! For ₦100k, we need a manual review of your latest receipts. Please visit our Akure office.';
        } else if (state.creditScore > 500) {
            title.innerText = '🎉 Approved!';
            msg.innerText = `Great news! You are eligible for a ₦${parseInt(amount).toLocaleString()} loan at 5% monthly interest. Funds will be sent to your wallet immediately.`;
            title.style.color = 'var(--success-color)';
        } else {
            title.innerText = 'Not Yet Eligible';
            msg.innerText = 'Keep logging transactions! You need a score of at least 500 for an instant loan. You are currently at ' + state.creditScore + '.';
        }
    }, 2000);
}

function closeDecision() {
    document.getElementById('loan-decision').style.display = 'none';
}

function sendRequest(btn) {
    btn.innerText = 'Request Sent';
    btn.classList.add('btn-outline');
    btn.disabled = true;

    // Simulate approval and score bump
    setTimeout(() => {
        state.creditScore += 10;
        updateDashboard();
        alert('Mama Shade approved your endorsement! Score +10');
    }, 3000);
}

// Initial update if landing on dashboard (for dev)
if (state.currentScreen === 'dashboard-screen') updateDashboard();

// Registration Path Selection
function selectPath(path) {
    state.user.path = path;

    // Update UI selection
    document.querySelectorAll('.path-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Using a bit of a hack for prototype simplicity
    const selectedCard = [...document.querySelectorAll('.path-card')].find(c =>
        c.innerText.toLowerCase().includes(path)
    );
    if (selectedCard) selectedCard.classList.add('selected');
}

function handleRegistration() {
    const name = document.getElementById('user-name').value;
    const business = document.getElementById('business-name').value;

    if (!name || !business || !state.user.path) {
        alert('Please fill in all details and select a path.');
        return;
    }

    state.user.name = name;
    state.user.businessName = business;

    updateDashboard();
    navigateTo('dashboard-screen');
}

function updateDashboard() {
    document.getElementById('display-name').innerText = state.user.name;
    document.getElementById('display-business').innerText = state.user.businessName;
    document.getElementById('current-score').innerText = state.creditScore;
    document.getElementById('stat-transactions').innerText = state.transactions.length;

    // Update status based on score
    const statusEl = document.getElementById('stat-status');
    if (state.creditScore < 500) {
        statusEl.innerText = 'Building';
        statusEl.style.color = '#ff9800';
    } else if (state.creditScore < 700) {
        statusEl.innerText = 'Good';
        statusEl.style.color = '#00796b';
    } else {
        statusEl.innerText = 'Excellent';
        statusEl.style.color = '#388e3c';
    }

    drawGauge(state.creditScore);
}

function drawGauge(score) {
    const canvas = document.getElementById('score-gauge');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set display size
    const size = 220;
    canvas.width = size * 2; // High DPI
    canvas.height = size * 2;
    ctx.scale(2, 2);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 90;

    ctx.clearRect(0, 0, size, size);

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0.8 * Math.PI, 0.2 * Math.PI);
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Score arc
    const startAngle = 0.8 * Math.PI;
    const scoreRange = 850 - 300;
    const normalizedScore = (score - 300) / scoreRange;
    const endAngle = startAngle + (normalizedScore * 1.4 * Math.PI);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);

    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, size, 0);
    gradient.addColorStop(0, '#ff9800');
    gradient.addColorStop(1, '#004d40');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function handleLogTransaction() {
    const type = document.getElementById('trans-type').value;
    const amount = document.getElementById('trans-amount').value;
    const desc = document.getElementById('trans-desc').value;

    if (!amount || !desc) {
        alert('Please enter amount and description.');
        return;
    }

    const transaction = {
        type,
        amount: parseFloat(amount),
        desc,
        date: new Date().toLocaleDateString()
    };

    state.transactions.push(transaction);

    // Simulate score improvement
    // Sales improve score more than expenses
    let improvement = 0;
    if (type === 'sale') {
        improvement = Math.floor(Math.random() * 5) + 2; // +2 to +7
    } else {
        improvement = Math.ceil(Math.random() * 2); // +1 to +2
    }

    state.creditScore = Math.min(850, state.creditScore + improvement);

    // Show success message
    const msg = document.getElementById('log-success-msg');
    msg.style.display = 'block';

    // Clear form
    document.getElementById('trans-amount').value = '';
    document.getElementById('trans-desc').value = '';

    // Update dashboard in background
    updateDashboard();

    // After 2 seconds, go back to dashboard
    setTimeout(() => {
        msg.style.display = 'none';
        navigateTo('dashboard-screen');
    }, 2000);
}

// Initial update if landing on dashboard (for dev)
if (state.currentScreen === 'dashboard-screen') updateDashboard();

// Initial Navigation (for dev)
// navigateTo('registration-screen');

// Expose functions to global scope for HTML onclick handlers
window.navigateTo = navigateTo;
window.selectPath = selectPath;
window.handleRegistration = handleRegistration;
window.handleLogTransaction = handleLogTransaction;
window.handleLoanApplication = handleLoanApplication;
window.closeDecision = closeDecision;
window.sendRequest = sendRequest;
