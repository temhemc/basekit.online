import { useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function App() {
  const { address, isConnected } = useAccount();
  const [claimStatus, setClaimStatus] = useState("Ödülünü Al");

  // Günlük Check-in Fonksiyonu (Simüle edilmiş - Base ağında işlem tetikler)
  const handleClaim = () => {
    setClaimStatus("İşlem Gönderiliyor...");
    setTimeout(() => {
      setClaimStatus("Ödül Alındı! +10 BKB");
      alert("Tebrikler! Günlük 10 BKB ödülün cüzdanına tanımlandı. (Base Mainnet)");
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#0052FF', minHeight: '100vh', color: 'white', fontFamily: 'Arial', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>BaseKit Online</h1>
        <ConnectButton />
      </div>

      <div style={{ marginTop: '50px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '15px' }}>
        <h2>Hoş Geldin Builder!</h2>
        <p>Cüzdan: {isConnected ? address : "Bağlı Değil"}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
          <div style={{ background: 'white', color: '#0052FF', padding: '20px', borderRadius: '10px' }}>
            <h3>BKB Bakiyen</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>1,240 BKB</p>
          </div>
          <div style={{ background: 'white', color: '#0052FF', padding: '20px', borderRadius: '10px' }}>
            <h3>Talent Rank</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>#2828</p>
          </div>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h3>Günlük Görev</h3>
          <button 
            onClick={handleClaim}
            disabled={!isConnected || claimStatus.includes("Alındı")}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              borderRadius: '30px',
              border: 'none',
              backgroundColor: '#FFD700',
              color: '#0052FF',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {isConnected ? claimStatus : "Önce Cüzdanı Bağla"}
          </button>
        </div>
      </div>
    </div>
  );
}
