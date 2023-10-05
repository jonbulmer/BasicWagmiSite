import {
  useNetwork,
  useChainId,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi';
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TimeDividendEth
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export const timeDividendEthABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: 'supply', internalType: 'uint256', type: 'uint256' }],
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'HasAdmin',
  },
  { type: 'error', inputs: [], name: 'OutOfBounds' },
  { type: 'error', inputs: [], name: 'SupplyMissing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ClaimDividend',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'weiAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DistributeDividend',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'accumulativeDividendOf',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address payable', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimDividend',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'claimableDividendOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'clamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'cumulativeDividendClaimed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'magDividendPerShare', internalType: 'uint256', type: 'uint256' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'correction', internalType: 'int256', type: 'int256' },
    ],
    name: 'dividendFrom',
    outputs: [
      { name: 'claimableDividend', internalType: 'uint256', type: 'uint256' },
      { name: 'productRemainder', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'magnifiedDividendCorrections',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'magnifiedDividendPerShare',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'magnitude',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export const timeDividendEthAddress = {
  1: '0xd08481058399490B83a72676901d4e9dB70E75aC',
  56: '0x8734022D0fdBF1faeCE14cE077Edfcb936543E25',
  369: '0xCA35638A3fdDD02fEC597D8c1681198C06b23F58',
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export const timeDividendEthConfig = {
  address: timeDividendEthAddress,
  abi: timeDividendEthABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"accumulativeDividendOf"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthAccumulativeDividendOf<
  TFunctionName extends 'accumulativeDividendOf',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'accumulativeDividendOf',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"claimableDividendOf"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthClaimableDividendOf<
  TFunctionName extends 'claimableDividendOf',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'claimableDividendOf',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"clamp"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthClamp<
  TFunctionName extends 'clamp',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'clamp',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"cumulativeDividendClaimed"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthCumulativeDividendClaimed<
  TFunctionName extends 'cumulativeDividendClaimed',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'cumulativeDividendClaimed',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"decimals"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"dividendFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthDividendFrom<
  TFunctionName extends 'dividendFrom',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'dividendFrom',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"magnifiedDividendCorrections"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthMagnifiedDividendCorrections<
  TFunctionName extends 'magnifiedDividendCorrections',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'magnifiedDividendCorrections',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"magnifiedDividendPerShare"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthMagnifiedDividendPerShare<
  TFunctionName extends 'magnifiedDividendPerShare',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'magnifiedDividendPerShare',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"magnitude"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthMagnitude<
  TFunctionName extends 'magnitude',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'magnitude',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof timeDividendEthABI, TFunctionName>
>(
  config: Omit<
    UseContractReadConfig<
      typeof timeDividendEthABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof timeDividendEthABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<
        typeof timeDividendEthABI,
        TFunctionName,
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof timeDividendEthABI, TFunctionName, TMode>({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof timeDividendEthABI, 'approve', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'approve';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof timeDividendEthABI, 'approve', TMode>({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'approve',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthBurn<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'burn'
        >['request']['abi'],
        'burn',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burn' }
    : UseContractWriteConfig<typeof timeDividendEthABI, 'burn', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'burn';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof timeDividendEthABI, 'burn', TMode>({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'burn',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"burnFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthBurnFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'burnFrom'
        >['request']['abi'],
        'burnFrom',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'burnFrom' }
    : UseContractWriteConfig<typeof timeDividendEthABI, 'burnFrom', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'burnFrom';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof timeDividendEthABI, 'burnFrom', TMode>({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'burnFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"claimDividend"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthClaimDividend<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'claimDividend'
        >['request']['abi'],
        'claimDividend',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'claimDividend';
      }
    : UseContractWriteConfig<
        typeof timeDividendEthABI,
        'claimDividend',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'claimDividend';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof timeDividendEthABI, 'claimDividend', TMode>({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'claimDividend',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'decreaseAllowance';
      }
    : UseContractWriteConfig<
        typeof timeDividendEthABI,
        'decreaseAllowance',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'decreaseAllowance';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<
    typeof timeDividendEthABI,
    'decreaseAllowance',
    TMode
  >({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'increaseAllowance';
      }
    : UseContractWriteConfig<
        typeof timeDividendEthABI,
        'increaseAllowance',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'increaseAllowance';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<
    typeof timeDividendEthABI,
    'increaseAllowance',
    TMode
  >({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"multicall"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthMulticall<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'multicall'
        >['request']['abi'],
        'multicall',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'multicall' }
    : UseContractWriteConfig<typeof timeDividendEthABI, 'multicall', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'multicall';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof timeDividendEthABI, 'multicall', TMode>({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'multicall',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'renounceOwnership';
      }
    : UseContractWriteConfig<
        typeof timeDividendEthABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'renounceOwnership';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<
    typeof timeDividendEthABI,
    'renounceOwnership',
    TMode
  >({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof timeDividendEthABI, 'transfer', TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'transfer';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof timeDividendEthABI, 'transfer', TMode>({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'transfer',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'transferFrom';
      }
    : UseContractWriteConfig<
        typeof timeDividendEthABI,
        'transferFrom',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'transferFrom';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof timeDividendEthABI, 'transferFrom', TMode>({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'transferFrom',
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof timeDividendEthAddress
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof timeDividendEthABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address;
        chainId?: TChainId;
        functionName?: 'transferOwnership';
      }
    : UseContractWriteConfig<
        typeof timeDividendEthABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: 'transferOwnership';
      } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<
    typeof timeDividendEthABI,
    'transferOwnership',
    TMode
  >({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof timeDividendEthABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'approve'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthBurn(
  config: Omit<
    UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'burn'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'burn',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'burn'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"burnFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthBurnFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'burnFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'burnFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'burnFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"claimDividend"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthClaimDividend(
  config: Omit<
    UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'claimDividend'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'claimDividend',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'claimDividend'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof timeDividendEthABI,
      'decreaseAllowance'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'decreaseAllowance'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof timeDividendEthABI,
      'increaseAllowance'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'increaseAllowance'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"multicall"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthMulticall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'multicall'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'multicall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'multicall'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof timeDividendEthABI,
      'renounceOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'renounceOwnership'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'transfer'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'transferFrom'>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link timeDividendEthABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function usePrepareTimeDividendEthTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof timeDividendEthABI,
      'transferOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof timeDividendEthABI, 'transferOwnership'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link timeDividendEthABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof timeDividendEthABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    ...config,
  } as UseContractEventConfig<typeof timeDividendEthABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link timeDividendEthABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof timeDividendEthABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof timeDividendEthABI, 'Approval'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link timeDividendEthABI}__ and `eventName` set to `"ClaimDividend"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthClaimDividendEvent(
  config: Omit<
    UseContractEventConfig<typeof timeDividendEthABI, 'ClaimDividend'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    eventName: 'ClaimDividend',
    ...config,
  } as UseContractEventConfig<typeof timeDividendEthABI, 'ClaimDividend'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link timeDividendEthABI}__ and `eventName` set to `"DistributeDividend"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthDistributeDividendEvent(
  config: Omit<
    UseContractEventConfig<typeof timeDividendEthABI, 'DistributeDividend'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    eventName: 'DistributeDividend',
    ...config,
  } as UseContractEventConfig<typeof timeDividendEthABI, 'DistributeDividend'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link timeDividendEthABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof timeDividendEthABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof timeDividendEthABI, 'OwnershipTransferred'>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link timeDividendEthABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xd08481058399490B83a72676901d4e9dB70E75aC)
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x8734022D0fdBF1faeCE14cE077Edfcb936543E25)
 * - [__View Contract on Pulsechain Etherscan__](https://scan.pulsechain.com/address/0xCA35638A3fdDD02fEC597D8c1681198C06b23F58)
 */
export function useTimeDividendEthTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof timeDividendEthABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof timeDividendEthAddress } = {} as any
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: timeDividendEthABI,
    address:
      timeDividendEthAddress[chainId as keyof typeof timeDividendEthAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof timeDividendEthABI, 'Transfer'>);
}
