declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

export const ON_BOARD_CHAINS = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: "https://mainnet.infura.io/v3/<INFURA_KEY>"
  },
  {
    id: 42161,
    token: 'ARB-ETH',
    label: 'Arbitrum One',
    rpcUrl: 'https://rpc.ankr.com/arbitrum'
  },
  {
    id: '0xa4ba',
    token: 'ARB',
    label: 'Arbitrum Nova',
    rpcUrl: 'https://nova.arbitrum.io/rpc'
  },
  {
    id: '0x2105',
    token: 'ETH',
    label: 'Base',
    rpcUrl: 'https://mainnet.base.org'
  },
  {
    id: '0xa4ec',
    token: 'ETH',
    label: 'Celo',
    rpcUrl: 'https://1rpc.io/celo'
  },
  {
    id: 666666666,
    token: 'DEGEN',
    label: 'Degen',
    rpcUrl: 'https://rpc.degen.tips'
  },
  {
    id: 2192,
    token: 'SNAXETH',
    label: 'SNAX Chain',
    rpcUrl: 'https://mainnet.snaxchain.io'
  }
];

export interface ETHAccountInfo {
  address: string;
  balance: {
    ETH: string;
  };
  ens?: string;
  uns?: string;
}

export interface ETHChain {
  id: string;
  namespace: string;
}

export interface MetamaskWallet {
  accounts: ETHAccountInfo[];
  chains: ETHChain[];
  icon: string;
  instance: any;
  label: string;
  provider: any; // 뭐지...?
  wagmiConnector: any;
}

// EthereumProviderTypes.d.ts

// Interface for provider information following EIP-6963.
interface EIP6963ProviderInfo {
  walletId: string; // Unique identifier for the wallet e.g io.metamask, io.metamask.flask
  uuid: string; // Globally unique ID to differentiate between provider sessions for the lifetime of the page
  name: string; // Human-readable name of the wallet
  icon: string; // URL to the wallet's icon
}

// Interface for Ethereum providers based on the EIP-1193 standard.
interface EIP1193Provider {
  isStatus?: boolean; // Optional: Indicates the status of the provider
  host?: string; // Optional: Host URL of the Ethereum node
  path?: string; // Optional: Path to a specific endpoint or service on the host
  sendAsync?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void; // For sending asynchronous requests
  send?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void; // For sending synchronous requests
  request: (request: { method: string, params?: Array<unknown> }) => Promise<unknown>; // Standard method for sending requests per EIP-1193
}

// Interface detailing the structure of provider information and its Ethereum provider.
interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo; // The provider's info
  provider: EIP1193Provider; // The EIP-1193 compatible provider
}

// Type representing the event structure for announcing a provider based on EIP-6963.
type EIP6963AnnounceProviderEvent = {
  detail: {
    info: EIP6963ProviderInfo; // The provider's info
    provider: EIP1193Provider; // The EIP-1193 compatible provider
  }
}
