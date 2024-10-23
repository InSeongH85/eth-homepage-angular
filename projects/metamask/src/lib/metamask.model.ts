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
  // provider: any; // 뭐지...?
  wagmiConnector: any;
}
