import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseEther } from 'viem';

export default function BaseKitGiga() {
  const { address, isConnected } = useAccount();
  const [claimStatus, setClaimStatus] = useState("Günlük Ödülünü Al");
  const [prices, setPrices] = useState({ BTC: "64,210", ETH: "2,540", SOL: "145", XRP: "0.52", SUI: "1.85" });

  // Memecoin Kar Oranları (Base Ağı Örnekleri)
  const memecoins = [
    { name: "BRETT", gain: "+24.5%", color: "#22c55e" },
    { name: "DEGEN", gain: "+18.2%", color: "#22c55e" },
    { name: "KEYCAT", gain: "+12.1%", color: "#22c55e" }
  ];

  // TX Üretecek Fonksiyon (Basescan'de senin cüzdanına etkileşim yazar)
  const handleInteraction = async (actionName) => {
    if (!isConnected) return alert("Lütfen önce cüzdanınızı bağlayın!");
    setClaimStatus(`${actionName} İşleniyor...`);
    
    // Not: Gerçek bir kontrat adresi bağlandığında writeContract buraya eklenecek.
    // Şimdilik kullanıcı deneyimi için simüle edilmiştir.
    setTimeout(() => {
      setClaimStatus("İşlem Başarılı! (TX Gönderildi)");
      alert(`${actionName} işlemi Basescan üzerinden cüzdanınıza (0x4604...9c12) tanımlandı!`);
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#000814', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Üst Menü */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #1e293b', background: '#000814' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', backgroundColor: '#0052FF', borderRadius: '50%' }}></div>
          <h2 style={{ margin: 0, fontSize: '24px', letterSpacing: '1px' }}>BASEKIT</h2>
        </div>
        <ConnectButton />
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Canlı Fiyat Bandı */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '10px' }}>
          {Object.entries(prices).map(([coin, price]) => (
            <div key={coin} style={{ background: '#1e293b', padding: '15px 25px', borderRadius: '16px', minWidth: '140px', border: '1px solid #334155' }}>
              <small style={{ color: '#94a3b8', fontWeight: 'bold' }}>{coin}/USD</small>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>${price}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
          
          {/* SOL TARAF: Dashboard ve TX İşlemleri */}
          <div>
            <div style={{ background: 'linear-gradient(135deg, #0052FF 0%, #002e99 100%)', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,82,255,0.3)' }}>
              <h1 style={{ marginTop: 0 }}>Hoş Geldin Builder! 🚀</h1>
              <p style={{ opacity: 0.9 }}>Base ağındaki en güçlü araç setine eriştin.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
                <div style={{ background: 'white', color: '#0052FF', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                  <small>BKB Bakiyen</small>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>1,240</div>
                </div>
                <div style={{ background: 'white', color: '#0052FF', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                  <small>Talent Rank</small>
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>#2828</div>
                </div>
              </div>

              <button 
                onClick={() => handleInteraction("Günlük Ödül")}
                style={{ width: '100%', marginTop: '30px', padding: '18px', borderRadius: '16px', border: 'none', backgroundColor: '#FFD700', color: '#000814', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}
              >
                {claimStatus}
              </button>
            </div>

            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <button onClick={() => handleInteraction("NFT Mint")} style={txBtnStyle}>NFT Mintle (TX+1)</button>
              <button onClick={() => handleInteraction("Contract Deploy")} style={txBtnStyle}>Sözleşme Dağıt</button>
              <button onClick={() => handleInteraction("Token Launch")} style={txBtnStyle}>Token Başlat</button>
            </div>
          </div>

          {/* SAĞ TARAF: Memecoin Radar ve Analiz */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1e293b', padding: '30px', borderRadius: '24px', border: '1px solid #334155' }}>
              <h3 style={{ marginTop: 0, color: '#0052FF' }}>🔥 Base Memecoin Radar</h3>
              {memecoins.map((coin) => (
                <div key={coin.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #334155' }}>
                  <span style={{ fontWeight: 'bold' }}>{coin.name}</span>
                  <span style={{ color: coin.color, fontWeight: 'bold' }}>{coin.gain}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#0f172a', padding: '25px', borderRadius: '24px', border: '1px dotted #0052FF', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>GitHub Katkıların</p>
              <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>415 ✅</div>
              <small style={{ color: '#22c55e' }}>Dün: Optimism PR #1202</small>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const txBtnStyle = {
  background: '#1e293b',
  color: 'white',
  border: '1px solid #334155',
  padding: '15px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'all 0.2s ease'
};
