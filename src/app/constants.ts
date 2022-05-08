import { HttpLink } from '@apollo/client/link/http';

const mumbaiTestnet = new HttpLink({ uri: 'https://api-mumbai.lens.dev/' });
const localhost = new HttpLink({ uri: 'http://0.0.0.0:8545/' });

export const REDIRECT_URI = 'http://localhost:3000/login';

export const currentYear = new Date().getFullYear();

export const appId = "0xC5623EeFA1f097b47be8A5Da6f229A51B1c72D44";

export const lensHubContractProxyAddress = '0x4BF0c7AD32Fd2d32089790a54485e23f5C7736C0';
export const lensHubContractAddress = '0x9BB30adbE65991A35B55839D98A66514b1c40f08';
export const lensPeripheryContractAddress = '0x702C22BFCD705c42B46Df8512b51311a2B5e6036';

export const copyright = `© ${currentYear} Prnts`;

export const apiErrorCodes = {
    handleTaken: 'HANDLE_TAKEN',
    REJECTED: 'REJECTED',
    WRONG_WALLET_SIGNED: 'WRONG_WALLET_SIGNED',
  };

export const network = {
    localhost,
    mumbaiTestnet,
};
