// WalletGenerator.js
import { useState } from 'react';
import axios from 'axios';

export default function Wallet() {
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('user'); // 'doctor' or 'patient'

  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const generateWallet = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/wallet/generate', { userId, userType });
      setWalletAddress(res.data.walletAddress);
      alert('Wallet generated successfully');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error generating wallet');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h3 style={{ marginBottom: '10px' }}>Blockchain Wallet</h3>

      {walletAddress ? (
        <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '6px' }}>
          <b>Wallet Address:</b> <br />
          <span style={{ wordBreak: 'break-word' }}>{walletAddress}</span>
        </div>
      ) : (
        <button onClick={generateWallet}
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px' }}>
          {loading ? 'Generating...' : 'Generate Wallet'}
        </button>
      )}
    </div>
  );
}
