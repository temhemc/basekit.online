import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead } from 'wagmi';

export default function BaseKitDashboard() {
  const { address, isConnected } = useAccount();

  // Senin BKB Kontratından (0xc47e...) veri çekiyoruz
  const { data: bkbName } = useContractRead({
    address: '0xc47e3a33d838f321415259972750337f79c2999c',
    abi: [{ name: 'name', type: 'function', inputs: [], outputs: [{ type: 'string' }] }],
    functionName: 'name',
  });

  return (
    <div style={{
      padding: '20px', 
      backgroundColor: '#0052FF', // Base Mavisi
      minHeight: '100vh', 
      color: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '1.5rem' }}>🔵 BaseKit</h1>
        <ConnectButton label="Bağlan" />
      </header>

      <main style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '25px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ marginBottom: '10px' }}>Hoş Geldin Builder!</h2>
          <p style={{ opacity: 0.8 }}>{isConnected ? `Cüzdan: ${address.slice(0,6)}...${address.slice(-4)}` : "Başlamak için cüzdanını bağla"}</p>
          
          <div style={{ margin: '25px 0', padding: '15px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px' }}>
            <h3 style={{ margin: 0 }}>Token: {bkbName || "Yükleniyor..."}</h3>
          </div>

          <button 
            style={{ 
              width: '100%', 
              padding: '18px', 
              borderRadius: '12px', 
              border: 'none', 
              backgroundColor: 'white', 
              color: '#0052FF', 
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => alert("Günlük BKB ödülün yakında aktif!")}
          >
            🚀 Daily Check-in (BKB Kazan)
          </button>
        </div>

        <div style={{ marginTop: '30px', fontSize: '0.9rem', opacity: 0.7 }}>
          <p>Talent Protocol Skorun: <b>#2828</b></p>
          <p>GitHub Katkıların: <b>415 (+%13.733)</b> 📈</p>
        </div>
      </main>
    </div>
  );
}
