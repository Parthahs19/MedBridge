// backend/utils/ipfs.js
const axios = require('axios');
require('dotenv').config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET = process.env.PINATA_SECRET;

exports.uploadToIPFS = async (file) => {
  const data = new FormData();
  data.append('file', file.buffer, file.originalname);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
    maxContentLength: 'Infinity',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET,
    }
  });

  return res.data.IpfsHash;
};
