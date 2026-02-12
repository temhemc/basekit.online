import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

export default function BaseKitVegasFinal() {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState(1240);
  
  // --- METAMASK TETİKLEYİCİ (Basescan TX Sistemi) ---
  const { config } = usePrepareSendTransaction({
    to: '0x4604a0FD65843F8b6E7cD8E67C5E3dFf7B0c9c12', // Senin Base adresin
    value: parseEther('0'), // 0 ETH göndererek TX kasar (Gas dışında masrafsız)
    enabled: isConnected,
  });
  const { sendTransaction } = useSendTransaction(config);

  const handleTx = (action) => {
    if (!isConnected) return alert("Lütfen önce cüzdanınızı bağlayın!");
    try {
      // Bu fonksiyon doğrudan MetaMask onay penceresini açar
      sendTransaction?.(); 
      alert(`${action} için MetaMask onayı istendi! Onayladığında Basescan skorun artacak.`);
    } catch (e) {
      console.error(e);
      alert("Bağlantı hatası!");
    }
  };

  // --- BLACKJACK OYUNU ---
  const [pHand, setPHand] = useState([]);
  const [dHand, setDHand] = useState([]);
  const [bjMsg, setBjMsg] = useState("Lady Luck Masasına Hoş Geldiniz!");
  const [gameState, setGameState] = useState('bet');

  const dealCard = () => Math.floor(Math.random() * 11) + 1;

  const startBJ = () => {
    if(!isConnected) return alert("Cüzdan bağla!");
    setPHand([dealCard(), dealCard()]);
    setDHand([dealCard()]);
    setBjMsg("Kurpiyer: Kart mı, Dur mu?");
    setGameState('play');
    handleTx("Blackjack Başlat"); // Oyun başladığında TX tetikler
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
    } else { setBjMsg("Kurpiyer Kazandı. 💀"); }
    setGameState('end');
  };

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', background: '#0f172a', borderBottom: '2px solid #0052FF' }}>
        <h2 style={{ letterSpacing: '2px', margin: 0 }}>🔵 BASEKIT <span style={{color:'#FFD700'}}>VEGAS PRO</span></h2>
        <ConnectButton />
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
           <div style={statBox}>BKB: {balance}</div>
           <div style={statBox}>RANK: #2828</div>
           <div style={statBox}>KATKI: 415 ✅</div>
           <div style={statBox}>AĞ: Base</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
          {/* BLACKJACK */}
          <div style={{ ...tableCard, backgroundImage: 'url("https://img.freepik.com/free-photo/beautiful-girl-casino-playing-blackjack_1157-25167.jpg")', backgroundSize: 'cover' }}>
            <div style={{ background: 'rgba(0,0,0,0.85)', padding: '30px', borderRadius: '25px', height: '100%' }}>
              <h3 style={{color: '#FFD700'}}>LADY LUCK BLACKJACK</h3>
              <p>{bjMsg}</p>
              <div style={{ display: 'flex', justifyContent: 'space-around', margin: '40px 0' }}>
                <div style={handStyle}>Kurpiyer: <br/> <span style={{fontSize:'32px', color:'#ef4444'}}>{dHand.join(' - ') || "?"}</span></div>
                <div style={handStyle}>Senin: <br/> <span style={{fontSize:'32px', color:'#22c55e'}}>{pHand.join(' - ') || "?"}</span></div>
              </div>
              <div style={{display:'flex', gap:'15px', justifyContent:'center'}}>
                {gameState === 'bet' && <button onClick={startBJ} style={actionBtn}>OYUNA BAŞLA (TX+1)</button>}
                {gameState === 'play' && (
                  <>
                    <button onClick={() => setPHand([...pHand, dealCard()])} style={actionBtn}>HIT</button>
                    <button onClick={stay} style={{...actionBtn, background:'#ef4444'}}>STAY</button>
                  </>
                )}
                {gameState === 'end' && <button onClick={()=>{setGameState('bet'); setPHand([]); setDHand([]);}} style={actionBtn}>YENİ EL</button>}
              </div>
            </div>
          </div>

          {/* ROULETTE */}
          <div style={tableCard}>
            <img src="https://media.istockphoto.com/id/1141675121/vector/roulette-wheel-on-green-table-top-view.jpg" style={{ width: '100%', borderRadius: '50%' }} />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={()=>handleTx("Roulette Red")} style={{...colorBtn, background: '#ef4444'}}>KIRMIZI</button>
              <button onClick={()=>handleTx("Roulette Black")} style={{...colorBtn, background: '#1e293b'}}>SİYAH</button>
            </div>
          </div>
        </div>

        {/* TERMİNAL (Cüzdan Tetikleyicili) */}
        <div style={{ marginTop: '30px', background: '#0f172a', padding: '30px', borderRadius: '25px', border: '1px solid #0052FF' }}>
          <h4>🛠️ Professional Deployment Terminal (TX Sinyali)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
            <button onClick={() => handleTx("NFT Mint")} style={termBtn}>NFT Mint (TX+1)</button>
            <button onClick={() => handleTx("Token Deploy")} style={termBtn}>Token Deploy</button>
            <button onClick={() => handleTx("Verify")} style={termBtn}>Verify Contract</button>
            <button onClick={() => handleTx("Basescan")} style={termBtn}>Basescan TX</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const statBox = { background: '#1e293b', padding: '15px', borderRadius: '15px', textAlign: 'center', fontWeight: 'bold' };
const tableCard = { background: '#0f172a', padding: '25px', borderRadius: '30px', border: '1px solid #1e293b', textAlign: 'center', minHeight: '450px' };
const handStyle = { background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', width: '45%' };
const actionBtn = { background: '#0052FF', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' };
const colorBtn = { border: 'none', padding: '15px 25px', color: 'white', borderRadius: '10px', cursor: 'pointer', flex: 1 };
const termBtn = { background: 'rgba(0,82,255,0.1)', color: '#0052FF', border: '1px solid #0052FF', padding: '15px', borderRadius: '10px', cursor: 'pointer' };
