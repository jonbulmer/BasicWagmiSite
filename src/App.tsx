import ContractCall from './ContractCall';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  goerli,
  mainnet,
  bsc,
  pulsechain,
  pulsechainV4
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { infuraProvider } from '@wagmi/core/providers/infura'
import 'react-tooltip/dist/react-tooltip.css';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    bsc,
    pulsechain,
    pulsechainV4,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_WC_ALCHEMY_ID || '' }),
    infuraProvider({ apiKey: process.env.REACT_APP_WC_INFURA_ID || '' }),    
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: process.env.REACT_APP_WC_PRODUCT_ID || '',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={1}>
        <ContractCall></ContractCall>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}