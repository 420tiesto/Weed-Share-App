import axios from 'axios';

export const pinJSONToIPFS = async (json: object, pinataMetadata?: object) => {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    const data = {
        pinataContent: json,
        pinataMetadata: {},
    };
    if (pinataMetadata) {
        data.pinataMetadata = pinataMetadata;
    }
    const pinataApiKey = process.env.REACT_APP_PINATA_KEY || '';
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_API_SECRET || '';
    try {
        const res = await axios.post(url, data, {
            maxContentLength: Infinity,
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey,
            },
        });
        console.log(res.data);
        return res.data;
    } catch (err) {
        const e = err as any;
        console.log(e.message);
        return {};
    }
};
