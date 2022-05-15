import pinataSDK from '@pinata/sdk';

const pinataKey = process.env.PINATA_KEY || '';
const pinataSecret = process.env.PINATA_API_SECRET || '';
export const pinata = pinataSDK(pinataKey, pinataSecret);

const uploadFile = (fileData: string, fileName: string) => {
    const options = {
        pinataMetadata: {
            name: fileName,
            keyvalues: {
                appName: 'prnts',
            },
        },
    };
};
