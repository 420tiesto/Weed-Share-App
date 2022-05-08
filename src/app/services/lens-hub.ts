// Original code provided from https://docs.lens.dev/docs/dispatcher

import { ethers } from 'ethers';
import { getSigner } from './ethers-service';

import { lensHubContractProxyAddress, lensPeripheryContractAddress } from '../constants';
import LensHubAbi from '../artifacts/Lens.json';
import LensPeripheryAbi from '../artifacts/Periphery.json';

export const lensHub = new ethers.Contract(
    lensHubContractProxyAddress,
    LensHubAbi,
    getSigner()
)

export const lensPeriphery = new ethers.Contract(
    lensPeripheryContractAddress,
    LensPeripheryAbi,
    getSigner()
);
