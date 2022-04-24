import axios from "axios";

export const pinImageToIPFS = async (file: any) => {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const data = new FormData();
    data.append("file", file);
    const pinataApiKey = process.env.REACT_APP_PINATA_KEY || '';
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_API_SECRET || '';
    try {
      const res = await axios.post(url, data, {
        maxContentLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return {}
    }
};
