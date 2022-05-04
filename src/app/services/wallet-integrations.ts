import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

/**
 * Add the proper keys here
 */
export const CoinbaseWallet = new WalletLinkConnector({
 url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
 appName: "Web3-react Demo",
 supportedChainIds: [1, 3, 4, 5, 42],
});

/**
 * Add the proper keys here
 */
export const WalletConnect = new WalletConnectConnector({
 rpc: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
 bridge: "https://bridge.walletconnect.org",
 infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
 qrcode: true,
});

/**
 * Add the proper keys here
 */
export const Injected = new InjectedConnector({
 supportedChainIds: [1, 3, 4, 5, 42]
});