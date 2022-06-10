import { HttpLink } from '@apollo/client/link/http';
import dayjs from 'dayjs';

const mumbaiTestnet = new HttpLink({ uri: 'https://api-mumbai.lens.dev/' });
const localhost = new HttpLink({ uri: 'http://0.0.0.0:8545/' });

export const REDIRECT_URI = 'http://localhost:3000/login';

export const currentYear = new Date().getFullYear();

export const PLACEHOLDER_IMAGE =
    'https://images.unsplash.com/photo-1648737119247-e93f56878edf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60';

export const appId = '0x7C3E6DA7a46D0E4ccB0df7E44a373E456a49099C';
export const appIds = [appId, `${appId}-COMMENT`, `${appId}-POST`];

export const lensHubContractProxyAddress = '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82';
export const lensHubContractAddress = '0x8C1f82e8AAD9399f52DcF224b77f33d5c1719241';
export const lensPeripheryContractAddress = '0xD5037d72877808cdE7F669563e9389930AF404E8';

export const copyright = `© ${currentYear} WeedShare`;

export const apiErrorCodes = {
    handleTaken: 'HANDLE_TAKEN',
    REJECTED: 'REJECTED',
    WRONG_WALLET_SIGNED: 'WRONG_WALLET_SIGNED',
};

export const network = {
    localhost,
    mumbaiTestnet,
};

export const enabledCurrencies = {
    wrappedMatic: {
        name: 'Wrapped Matic',
        symbol: 'WMATIC',
        decimals: 18,
        address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
        __typename: 'Erc20',
    },
    wrappedEth: {
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18,
        address: '0x3C68CE8504087f89c640D02d133646d98e64ddd9',
        __typename: 'Erc20',
    },
    usdc: {
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        address: '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e',
        __typename: 'Erc20',
    },
    dai: {
        name: 'DAI',
        symbol: 'DAI',
        decimals: 18,
        address: '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F',
        __typename: 'Erc20',
    },
};

export const applicationStartDate = dayjs().set('date', 1).set('month', 4).set('year', 2022)
