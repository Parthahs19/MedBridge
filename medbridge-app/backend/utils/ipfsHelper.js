import { create } from 'ipfs-http-client';
import mime from 'mime-types';

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export const uploadToIPFS = async (file) => {
  const result = await ipfs.add(file.data);
  const fileType = mime.lookup(file.name) || 'application/octet-stream';
  return { cid: result.path, fileType };
};
