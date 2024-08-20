import { BaseProvider } from '@metamask/providers';
import { Maybe } from '@metamask/providers/dist/utils';
import { Hex } from 'viem';

declare module '@metamask/providers/dist/BaseProvider' {
  interface RequestArguments {
    from?: Maybe<unknown>;
  }
}

declare global {
  interface Window {
    ethereum: BaseProvider;
    dataLayer: Array<object>;
  }

  // 	BinanceMainnet = '0x38',
  // 	BinanceTestnet = '0x61',
  // 	MaticPolygonTestnet = '0x13881',
  // 	TEthereumMainnet = '0x1',
  // 	TMaticPolygonMainnet = '0x89'
  //  KlaytnBaobab = '0x3e9'
  //  'Ropsten (Ethereum)' = '0x3'
  //  Sepolia = 0xaa36a7
  type BlockchainType = Hex;
}
