import { HttpLink } from '@apollo/client/link/http';

const mumbaiTestnet = new HttpLink({ uri: 'https://api-mumbai.lens.dev/' });
const localhost = new HttpLink({ uri: 'http://0.0.0.0:8545/' });

export const REDIRECT_URI = 'http://localhost:3000/login';

export const currentYear = new Date().getFullYear();

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
