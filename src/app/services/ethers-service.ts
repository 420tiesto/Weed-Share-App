import { getStorageValue, setStorageValue } from '../utils/local-storage';
import { ethers, Signature, utils } from 'ethers';
import { JsonRpcSigner } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { Deferrable } from 'ethers/lib/utils';

export const ethersProvider = window?.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : new ethers.providers.JsonRpcProvider(process.env.VITE_ALCHEMY_KEY);

export const getSigner = (): Wallet | JsonRpcSigner => {
    if (window?.ethereum) {
        return ethersProvider.getSigner();
    }

    /**
     * No wallet flow
     */
    let signer;
    const storedPrivateKey = getStorageValue('PRIVATE_KEY');
    if (!!storedPrivateKey) {
        signer = new ethers.Wallet(storedPrivateKey, ethersProvider);
    } else {
        signer = ethers.Wallet.createRandom();
        signer.connect(ethersProvider);
        setStorageValue('PRIVATE_KEY', signer.privateKey);
    }
    return signer;
};

export const getAddressFromSigner = async () => {
    return await getSigner().getAddress();
};

export const init = async () => {
    const accounts = window?.ethereum
        ? await window.ethereum.request({ method: 'eth_requestAccounts' })
        : [await getSigner().getAddress()];
    return accounts[0];
};

export const signText = (text: string): Promise<string> => {
    return getSigner().signMessage(text);
};

export const splitSignature = (signature: string): Signature => {
    return utils.splitSignature(signature);
};

export const sendTx = (transaction: Deferrable<TransactionRequest>) => {
    const signer = ethersProvider.getSigner();
    return signer.sendTransaction(transaction);
};
