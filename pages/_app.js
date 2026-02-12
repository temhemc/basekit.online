import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains([base], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'BaseKit Online',
  projectId: '965f7000e478553259972c8366965671', // Bu ID olmadan MetaMask yeni sürümlerde çalışmaz
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true, // Sayfa yenilendiğinde otomatik bağlanma
  connectors,
  publicClient
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains} 
        theme={darkTheme({
          accentColor: '#0052FF',
          accentColorForeground: 'white',
          borderRadius: 'medium',
        })}
        modalSize="compact" // Daha sade bir menü MetaMask'ın açılmasını kolaylaştırır
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
