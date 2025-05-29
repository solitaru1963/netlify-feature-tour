import React, { useState, useEffect } from 'react';

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/user/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const handlePayment = async () => {
    const res = await fetch('http://localhost:5000/api/payment/create', { method: 'POST' });
    const data = await res.json();
    window.open(data.paymentUrl, '_blank');
  };

  return (
    <div>
      <h1>Cloud Mining Dashboard</h1>
      {stats ? (
        <div>
          <p>Hashrate: {stats.hashrate} TH/s</p>
          <p>Balance: {stats.balance} BTC</p>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
      <button onClick={handlePayment}>Buy More Hashrate</button>
    </div>
  );
}

export default App;
