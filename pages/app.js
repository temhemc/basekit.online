import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function BaseKitVegasFull() {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState(1240); // BKB Bakiyesi

  // --- BLACKJACK DURUMLARI ---
  const [pHand, setPHand] = useState([]);
  const [dHand, setDHand] = useState([]);
  const [bjMsg, setBjMsg] = useState("Lady Luck Masasına Hoş Geldiniz!");
  const [gameState, setGameState] = useState('bet'); // bet, play, dealer, end

  // --- OYUN FONKSİYONLARI ---
  const dealCard = () => Math.floor(Math.random() * 11) + 1;

  const startBJ = () => {
    if(!isConnected) return alert("Cüzdan bağlamadan masaya oturamazsınız!");
    setPHand([dealCard(), dealCard()]);
    setDHand([dealCard()]);
    setBjMsg("Kurpiyer bekliyor: Kart Çek mi? Dur mu?");
    setGameState('play');
  };

  const hit = () => {
    const newHand = [...pHand, dealCard()];
    const score = newHand.reduce((a,b) => a+b, 0);
    setPHand(newHand);
    if(score > 21) { 
      setBjMsg("Yandınız! (Bust) 💀"); 
      setGameState('end'); 
    }
  };

  const stay = () => {
    setGameState('dealer');
    let dealerH = [...dHand];
    while(dealerH.reduce((a,b) => a+b,0) < 17) { dealerH.push(dealCard()); }
    setDHand(dealerH);
    const pS = pHand.reduce((a,b) => a+b,0);
    const dS = dealerH.reduce((a,b) => a+b,0);
    
    if(dS > 21 || pS > dS) { 
      setBjMsg("TEBRİKLER! Kazandınız! 🎉"); 
      setBalance(b => b + 100); 
    } else if (pS === dS) {
      setBjMsg("Berabere! (Push)");
    } else { 
      setBjMsg("Kurpiyer Kazandı. 💀"); 
    }
    setGameState('end');
  };

  // --- TERMİNAL BUTONLARI (MetaMask Tetikleyici) ---
  const handleTx = (action) => {
    if(!isConnected) return alert("Lütfen önce cüzdanınızı bağlayın!");
    // Bu uyarı MetaMask'ın işlem imzalama sürecini simüle eder
    alert(`${action} işlemi için MetaMask onayı bekleniyor... (Basescan TX Sinyali Gönderildi)`);
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', background: '#0f172a', borderBottom: '2px solid #0052FF' }}>
        <h2 style={{ letterSpacing: '2px', margin: 0 }}>🔵 BASEKIT <span style={{color:'#FFD700'}}>VEGAS PRO</span></h2>
        <ConnectButton />
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px' }}>
        
        {/* Üst İstatistik Barı */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
           <div style={statBox}>BKB BAKİYE: {balance}</div>
           <div style={statBox}>TALENT RANK: #2828</div>
           <div style={statBox}>KATKI: 415 ✅</div>
           <div style={statBox}>AĞ: Base Mainnet</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
          
          {/* 🃏 BLACKJACK MASASI - KURPİYERLİ */}
          <div style={{ ...tableCard, backgroundImage: 'url("https://img.freepik.com/free-photo/beautiful-girl-casino-playing-blackjack_1157-25167.jpg")', backgroundSize: 'cover' }}>
            <div style={{ background: 'rgba(0,0,0,0.85)', padding: '30px', borderRadius: '25px', height: '100%' }}>
              <h3 style={{color: '#FFD700', fontSize: '24px'}}>LADY LUCK BLACKJACK</h3>
              <p style={{fontStyle: 'italic', color: '#94a3b8'}}>{bjMsg}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-around', margin: '40px 0' }}>
                <div style={handStyle}>Kurpiyer (Ev): <br/> <span style={{fontSize:'32px', color:'#ef4444'}}>{dHand.join(' - ') || "?" }</span></div>
                <div style={handStyle}>Senin Elin: <br/> <span style={{fontSize:'32px', color:'#22c55e'}}>{pHand.join(' - ') || "?" }</span></div>
              </div>

              <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
                {gameState === 'bet' && <button onClick={startBJ} style={actionBtn}>OYUNA BAŞLA (TX+1)</button>}
                {gameState === 'play' && (
                  <>
                    <button onClick={hit} style={actionBtn}>KART ÇEK (HIT)</button>
                    <button onClick={stay} style={{...actionBtn, background:'#ef4444'}}>DUR (STAY)</button>
                  </>
                )}
                {gameState === 'end' && <button onClick={()=>{setGameState('bet'); setPHand([]); setDHand([]);}} style={actionBtn}>YENİ EL</button>}
              </div>
            </div>
          </div>

          {/* 🎡 RULET MASASI */}
          <div style={tableCard}>
            <div style={{ marginBottom: '20px' }}>
              <img src="https://media.istockphoto.com/id/1141675121/vector/roulette-wheel-on-green-table-top-view.jpg?s=612x612&w=0&k=20&c=K-f06S3W_08V_2D1v_0Xo_X7I0O-qL1H4U-5F7D0z_Q=" 
                   style={{ width: '100%', borderRadius: '50%', border: '5px solid #334155' }} />
            </div>
            <h4>PROFESYONEL RULET</h4>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={()=>handleTx("Roulette Red")} style={{...colorBtn, background: '#
