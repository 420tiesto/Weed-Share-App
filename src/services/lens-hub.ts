// Original code provided from https://docs.lens.dev/docs/dispatcher

import { ethers } from 'ethers';
import { getSigner } from './ethers-service';

import LensHubAbi from '../artifacts/Lens.json';
import LensPeripheryAbi from '../artifacts/Periphery.json';
import { lensHubContractProxyAddress, lensPeripheryContractAddress } from '../app/constants';

export const lensHub = new ethers.Contract(lensHubContractProxyAddress, LensHubAbi, getSigner());

export const lensPeriphery = new ethers.Contract(
    lensPeripheryContractAddress,
    LensPeripheryAbi,
    getSigner()
);
