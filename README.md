<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MineCloud - Cloud Mining Dashboard</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      background: #f4f6fa;
      margin: 0;
      padding: 0;
      color: #222;
    }
    header {
      background: #232f3e;
      color: #fff;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    header h1 {
      margin: 0;
      font-size: 1.8rem;
      letter-spacing: 1px;
    }
    nav a {
      color: #fff;
      text-decoration: none;
      margin-left: 2rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    nav a:hover {
      color: #ffd700;
    }
    .container {
      max-width: 1100px;
      margin: 2rem auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      padding: 2rem;
    }
    .dashboard-cards {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }
    .card {
      flex: 1 1 220px;
      background: #f9fafb;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
      text-align: center;
    }
    .card h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
      color: #555;
    }
    .card .value {
      font-size: 2rem;
      font-weight: bold;
      color: #232f3e;
    }
    .mining-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 2rem;
    }
    .mining-table th, .mining-table td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
    }
    .mining-table th {
      background: #f4f6fa;
      color: #333;
    }
    .mining-table td.status {
      font-weight: bold;
    }
    .status-active {
      color: #27ae60;
    }
    .status-inactive {
      color: #c0392b;
    }
    .withdraw-btn {
      background: #ffd700;
      color: #232f3e;
      border: none;
      padding: 0.7rem 1.5rem;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .withdraw-btn:hover {
      background: #ffb700;
    }
    .chart-container {
      background: #f9fafb;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .user-info {
      float: right;
      font-size: 1rem;
      color: #ffd700;
      margin-left: 2rem;
    }
    .login-container {
      max-width: 400px;
      margin: 5rem auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
      padding: 2rem 2.5rem;
      text-align: center;
    }
    .login-container h2 {
      margin-bottom: 1.5rem;
      color: #232f3e;
    }
    .login-container input[type="text"],
    .login-container input[type="password"] {
      width: 90%;
      padding: 0.7rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
    }
    .login-container button {
      background: #232f3e;
      color: #fff;
      border: none;
      padding: 0.7rem 2rem;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .login-container button:hover {
      background: #ffd700;
      color: #232f3e;
    }
    .error-message {
      color: #c0392b;
      margin-bottom: 1rem;
    }
    footer {
      text-align: center;
      color: #888;
      padding: 2rem 0 1rem 0;
      font-size: 0.95rem;
    }
    @media (max-width: 800px) {
      .dashboard-cards {
        flex-direction: column;
        gap: 1rem;
      }
      .container {
        padding: 1rem;
      }
      .user-info {
        float: none;
        display: block;
        margin: 1rem 0 0 0;
        text-align: right;
      }
    }
  </style>
</head>
<body>
  <!-- Login Page -->
  <div id="loginPage" class="login-container" style="display:block;">
    <h2>MineCloud Login</h2>
    <div id="loginError" class="error-message" style="display:none;"></div>
    <input type="text" id="loginUser" placeholder="Username" autocomplete="username"><br>
    <input type="password" id="loginPass" placeholder="Password" autocomplete="current-password"><br>
    <button onclick="login()">Login</button>
  </div>

  <!-- Dashboard Page -->
  <div id="dashboardPage" style="display:none;">
    <header>
      <h1>MineCloud Dashboard</h1>
      <div>
        <span class="user-info" id="userInfo"></span>
        <nav>
          <a href="#" onclick="showSection('dashboard')">Dashboard</a>
          <a href="#" onclick="showSection('plans')">Mining Plans</a>
          <a href="#" onclick="showSection('transactions')">Transactions</a>
          <a href="#" onclick="showSection('support')">Support</a>
          <a href="#" onclick="logout()">Logout</a>
        </nav>
      </div>
    </header>
    <div class="container" id="dashboardSection">
      <section class="dashboard-cards">
        <div class="card">
          <h2>Total Balance</h2>
          <div class="value" id="balance">0.045 BTC</div>
        </div>
        <div class="card">
          <h2>Active Hashrate</h2>
          <div class="value" id="hashrate">120 TH/s</div>
        </div>
        <div class="card">
          <h2>Daily Earnings</h2>
          <div class="value" id="earnings">0.00015 BTC</div>
        </div>
        <div class="card">
          <h2>Withdrawable</h2>
          <div class="value" id="withdrawable">0.012 BTC</div>
          <button class="withdraw-btn" onclick="withdraw()">Withdraw</button>
        </div>
      </section>
      <div class="chart-container">
        <h2>Mining Earnings (Last 7 Days)</h2>
        <canvas id="earningsChart" height="80"></canvas>
      </div>
      <h2>Mining Contracts</h2>
      <table class="mining-table">
        <thead>
          <tr>
            <th>Contract</th>
            <th>Coin</th>
            <th>Hashrate</th>
            <th>Start Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SHA-256 Pro</td>
            <td>Bitcoin</td>
            <td>100 TH/s</td>
            <td>2025-04-01</td>
            <td class="status status-active">Active</td>
          </tr>
          <tr>
            <td>ETHash Basic</td>
            <td>Ethereum</td>
            <td>20 GH/s</td>
            <td>2025-03-15</td>
            <td class="status status-inactive">Expired</td>
          </tr>
        </tbody>
      </table>
      <h2>Recent Transactions</h2>
      <table class="mining-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-05-28</td>
            <td>Withdrawal</td>
            <td>0.010 BTC</td>
            <td class="status status-active">Completed</td>
          </tr>
          <tr>
            <td>2025-05-27</td>
            <td>Mining Payout</td>
            <td>0.00015 BTC</td>
            <td class="status status-active">Credited</td>
          </tr>
          <tr>
            <td>2025-05-25</td>
            <td>Deposit</td>
            <td>0.020 BTC</td>
            <td class="status status-active">Confirmed</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Placeholder for other sections -->
    <div class="container" id="plansSection" style="display:none;">
      <h2>Available Mining Plans</h2>
      <table class="mining-table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Coin</th>
            <th>Hashrate</th>
            <th>Price</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SHA-256 Pro</td>
            <td>Bitcoin</td>
            <td>100 TH/s</td>
            <td>0.02 BTC</td>
            <td>1 Year</td>
            <td><button class="withdraw-btn" onclick="alert('Demo: Purchase Plan')">Purchase</button></td>
          </tr>
          <tr>
            <td>ETHash Basic</td>
            <td>Ethereum</td>
            <td>20 GH/s</td>
            <td>0.01 BTC</td>
            <td>6 Months</td>
            <td><button class="withdraw-btn" onclick="alert('Demo: Purchase Plan')">Purchase</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container" id="transactionsSection" style="display:none;">
      <h2>All Transactions</h2>
      <table class="mining-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-05-28</td>
            <td>Withdrawal</td>
            <td>0.010 BTC</td>
            <td class="status status-active">Completed</td>
          </tr>
          <tr>
            <td>2025-05-27</td>
            <td>Mining Payout</td>
            <td>0.00015 BTC</td>
            <td class="status status-active">Credited</td>
          </tr>
          <tr>
            <td>2025-05-25</td>
            <td>Deposit</td>
            <td>0.020 BTC</td>
            <td class="status status-active">Confirmed</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container" id="supportSection" style="display:none;">
      <h2>Support</h2>
      <p>For any issues or questions, please contact us at <a href="mailto:support@minecloud.com">support@minecloud.com</a>.</p>
      <p>Our support team is available 24/7.</p>
    </div>
    <footer>
      &copy; 2025 MineCloud. For support, contact <a href="mailto:support@minecloud.com">support@minecloud.com</a>
    </footer>
  </div>
  <script>
    // Simple demo login (username: user, password: pass)
    function login() {
      var user = document.getElementById('loginUser').value.trim();
      var pass = document.getElementById('loginPass').value.trim();
      var error = document.getElementById('loginError');
      if (user === "user" && pass === "pass") {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardPage').style.display = 'block';
        document.getElementById('userInfo').textContent = "Welcome, " + user;
        setTimeout(drawChart, 300); // Wait for canvas to be visible
      } else {
        error.textContent = "Invalid username or password.";
        error.style.display = "block";
      }
    }
    function logout() {
      document.getElementById('dashboardPage').style.display = 'none';
      document.getElementById('loginPage').style.display = 'block';
      document.getElementById('loginUser').value = '';
      document.getElementById('loginPass').value = '';
      document.getElementById('loginError').style.display = 'none';
    }
    function withdraw() {
      alert("Withdrawal request submitted! (This is a demo.)");
    }
    // Section navigation
    function showSection(section) {
      document.getElementById('dashboardSection').style.display = (section === 'dashboard') ? 'block' : 'none';
      document.getElementById('plansSection').style.display = (section === 'plans') ? 'block' : 'none';
      document.getElementById('transactionsSection').style.display = (section === 'transactions') ? 'block' : 'none';
      document.getElementById('supportSection').style.display = (section === 'support') ? 'block' : 'none';
      if (section === 'dashboard') setTimeout(drawChart, 300);
    }
    // Chart.js earnings chart
    function drawChart() {
      var ctx = document.getElementById('earningsChart').getContext('2d');
      if (window.myChart) window.myChart.destroy();
      window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['May 22', 'May 23', 'May 24', 'May 25', 'May 26', 'May 27', 'May 28'],
          datasets: [{
            label: 'BTC Earned',
            data: [0.00012, 0.00013, 0.00014, 0.00015, 0.00015, 0.00016, 0.00015],
            borderColor: '#ffd700',
            backgroundColor: 'rgba(255,215,0,0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#232f3e'
          }]
        },
        options: {
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: { color: '#232f3e' }
            },
            x: {
              ticks: { color: '#232f3e' }
            }
          }
        }
      });
    }
  </script>
</body>
</html>
