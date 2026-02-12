import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains([base], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'BaseKit Online',
  projectId: '965f7000e478553259972c8366965671', // Bu ID olmadan MetaMask açılmaz
  chains
});

const wagmiConfig = createConfig({ autoConnect: true, connectors, publicClient });

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
