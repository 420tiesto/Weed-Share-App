import omitDeep from 'omit-deep-lodash';
import { getSigner } from './ethers-service';

export const signedTypeData = (domain, types, value) => {
    const signer = getSigner();
    // remove the __typedname from the signature!
    return signer._signTypedData(
        omitDeep(domain, '__typename'),
        omitDeep(types, '__typename'),
        omitDeep(value, '__typename')
    );
};