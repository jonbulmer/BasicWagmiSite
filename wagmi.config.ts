import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

import { TimeDividendEthAbi } from './contracts/TIMEDividendEthAbi'

export default defineConfig(() => {
  return {
    out: 'src/generated.ts',
    contracts: [
      {
        abi: TimeDividendEthAbi,
        name: 'TimeDividendEth',
        address: {
          [chains.mainnet.id]: '0xd08481058399490B83a72676901d4e9dB70E75aC',
          [chains.bsc.id]:'0x8734022D0fdBF1faeCE14cE077Edfcb936543E25',
          [chains.pulsechain.id]:'0xCA35638A3fdDD02fEC597D8c1681198C06b23F58',
        },
      },

    ],
    plugins: [react()],
  }
})