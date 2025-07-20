import { WagmiProvider } from 'wagmi'
import { XellarKitProvider, darkTheme, defaultConfig } from '@xellar/kit'
import { Provider } from '../tanstack-query/root-provider'
import { lisk, liskSepolia } from 'viem/chains'

export const wagmiConfig = defaultConfig({
  appName: 'Xellar',
  walletConnectProjectId: '383bde0d30cde408c7f223876495f1b1',
  xellarAppId: 'cc1ec5df-f51b-4b65-adef-6ce93a1430dc',
  xellarEnv: 'sandbox',
  ssr: false,
  chains: [lisk, liskSepolia],
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <Provider>
        <XellarKitProvider theme={darkTheme}>{children}</XellarKitProvider>
      </Provider>
    </WagmiProvider>
  )
}
