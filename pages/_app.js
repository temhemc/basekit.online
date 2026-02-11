import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Sadece Base ağını yapılandırıyoruz
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base],
  [publicProvider()]
);

// MetaMask ve diğer cüzdanlar için gerekli yapılandırma
const { connectors } = getDefaultWallets({
  appName: 'BaseKit Online',
  projectId: '965f7000e478553259972c8366965671', // Standart bir ProjectID ekledim, MetaMask'ı tetikler
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains} 
        theme={darkTheme({
          accentColor: '#0052FF', // Base Mavisi
          accentColorForeground: 'white',
        })}
        modalSize="compact"
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
