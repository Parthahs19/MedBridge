// ipfsUploader.js

import { create } from 'ipfs-http-client';
import mime from 'mime-types';

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export const uploadToIPFS = async (file) => {
  const result = await ipfs.add(file.buffer);  // <-- USE buffer here
  const fileType = mime.lookup(file.originalname) || 'application/octet-stream';
  return { cid: result.path, fileType };
};
