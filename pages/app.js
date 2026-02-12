import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function BaseKitVegas() {
  const { isConnected } = useAccount();
  const [balance, setBalance] = useState(1240); // BKB Bakiyesi

  // --- BLACKJACK STATE ---
  const [playerScore, setPlayerScore] = useState(0);
  const [bjMessage, setBjMessage] = useState("Blackjack Masasına Hoş Geldin!");

  // --- ROULETTE STATE ---
  const [lastRoulette, setLastRoulette] = useState(null);
  const [rouletteMessage, setRouletteMessage] = useState("Bahsini yap ve çarkı çevir!");

  // BLACKJACK FONKSİYONU
  const playBlackjack = () => {
    if (!isConnected) return alert("Önce cüzdan bağla!");
    const card = Math.floor(Math.random() * 11) + 1;
    const newScore = playerScore + card;
    if (newScore > 21) {
      setBjMessage(`Yandın! Skor: ${newScore} 💀`);
      setPlayerScore(0);
    } else if (newScore === 21) {
      setBjMessage("BLACKJACK! 🎉 +100 BKB");
      setBalance(b => b + 100);
      setPlayerScore(0);
    } else {
      setPlayerScore(newScore);
      setBjMessage(`Kart Çektin: ${card}. Toplam: ${newScore}`);
    }
  };

  // ROULETTE FONKSİYONU
  const spinRoulette = (betType) => {
    if (!isConnected) return alert("Cüzdan bağlamadan rulet dönemez!");
    setRouletteMessage("Çark dönüyor... 🎡");
    setTimeout(() => {
      const num = Math.floor(Math.random() * 37);
      const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(num);
      setLastRoulette(num);
      
      if ((betType === 'red' && isRed) || (betType === 'black' && !isRed && num !== 0)) {
        setRouletteMessage(`KAZANDIN! Sayı: ${num} 🎉`);
        setBalance(b => b + 50);
      } else {
        setRouletteMessage(`KAYBETTİN! Sayı: ${num} 💀`);
      }
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#f8fafc', fontFamily: "'Inter', sans-serif", paddingBottom: '50px' }}>
      
      {/* Header */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', background: '#0f172a', borderBottom: '3px solid #0052FF' }}>
        <h2 style={{ color: '#0052FF', margin: 0 }}>🔵 BASEKIT <span style={{color:'white'}}>VEGAS</span></h2>
        <ConnectButton />
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px' }}>
        
        {/* Üst Bilgi Barı */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', background: '#1e293b', padding: '15px', borderRadius: '15px' }}>
          <div>Bakiyen: <strong>{balance} BKB</strong></div>
          <div>Rank: <strong>#2828</strong></div>
          <div style={{ color: '#22c55e' }}>GitHub Katkıların: <strong>415 ✅</strong></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* 🃏 BLACKJACK MASASI */}
          <div style={gameCard}>
            <h3 style={{color: '#ef4444'}}>🃏 Blackjack 21</h3>
            <div style={displayBox}>
              <div style={{fontSize: '40px'}}>{playerScore}</div>
              <p style={{fontSize: '14px', color: '#94a3b8'}}>{bjMessage}</p>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button onClick={playBlackjack} style={btnStyle}>KART ÇEK (TX+1)</button>
              <button onClick={() => {setPlayerScore(0); setBjMessage("Yeni el başladı!");}} style={{...btnStyle, background: '#334155'}}>PAS</button>
            </div>
          </div>

          {/* 🎡 ROULETTE MASASI */}
          <div style={gameCard}>
            <h3 style={{color: '#22c55e'}}>🎡 European Roulette</h3>
            <div style={displayBox}>
              <div style={{fontSize: '40px', color: '#FFD700'}}>{lastRoulette ?? "?"}</div>
              <p style={{fontSize: '14px', color: '#94a3b8'}}>{rouletteMessage}</p>
            </div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
              <button onClick={() => spinRoulette('red')} style={{...btnStyle, background: '#ef4444'}}>KIRMIZI</button>
              <button onClick={() => spinRoulette('black')} style={{...btnStyle, background: '#1e293b', border: '1px solid #334155'}}>SİYAH</button>
            </div>
          </div>

        </div>

        {/* Builder Araçları Alt Panel */}
        <div style={{ ...gameCard, marginTop: '30px', background: 'linear-gradient(90deg, #0f172a, #0052FF)' }}>
          <h3 style={{marginBottom: '20px'}}>🚀 Professional Deployment Terminal</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <button style={toolBtn}>NFT Mint</button>
            <button style={toolBtn}>Token Deploy</button>
            <button style={toolBtn}>Verify Contract</button>
            <button style={toolBtn}>Basescan TX</button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Tasarım Nesneleri
const gameCard = { background: '#0f172a', padding: '30px', borderRadius: '24px', border: '1px solid #1e293b', textAlign: 'center' };
const displayBox = { background: '#020617', padding: '20px', borderRadius: '15px', margin: '20px 0', border: '1px solid #334155' };
const btnStyle = { background: '#0052FF', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', flex: 1 };
const toolBtn = { background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' };
