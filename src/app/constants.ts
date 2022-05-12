import { HttpLink } from '@apollo/client/link/http';

const mumbaiTestnet = new HttpLink({ uri: 'https://api-mumbai.lens.dev/' });
const localhost = new HttpLink({ uri: 'http://0.0.0.0:8545/' });

export const REDIRECT_URI = 'http://localhost:3000/login';

export const currentYear = new Date().getFullYear();

export const appId = "0xC5623EeFA1f097b47be8A5Da6f229A51B1c72D44";

export const lensHubContractProxyAddress = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';
export const lensHubContractAddress = '0x8C1f82e8AAD9399f52DcF224b77f33d5c1719241';
export const lensPeripheryContractAddress = '0xD5037d72877808cdE7F669563e9389930AF404E8';

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
