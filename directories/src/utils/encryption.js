import CryptoJS from "crypto-js";
import uuidv4 from "uuid/v4";
import { sha3_256 } from "js-sha3";
import forge from "node-forge";
import _ from "lodash";

const parseEightCharsOfFilename = fileName => {
  fileName = fileName + "________";
  fileName = fileName.substr(0, 8);

  return fileName;
};

const getSalt = numChars => {
  let array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  let salt = array[0];

  return salt.toString(36).substr(2, numChars);
};

const getPrimordialHash = () => {
  const entropy = uuidv4();
  return CryptoJS.SHA256(entropy).toString();
};

const obfuscate = hash => CryptoJS.SHA384(hash).toString();

// Returns [obfuscatedHash, nextHash]
const hashChain = hash => {
  const obfuscatedHash = CryptoJS.SHA384(hash).toString();
  const nextHash = CryptoJS.SHA256(hash).toString();

  return [obfuscatedHash, nextHash];
};

// Genesis hash is not yet obfuscated.
const genesisHash = handle => {
  const [_obfuscatedHash, genHash] = hashChain(handle);

  return genHash;
};

const sideChain = address => sha3_256(address).toString();

const encrypt = (text, secretKey) =>
  CryptoJS.AES.encrypt(text, secretKey).toString();

const decrypt = (text, secretKey) => {
  try {
    return CryptoJS.AES.decrypt(text, secretKey).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return "";
  }
};

const decryptTest = (text, secretKey) => {
  //TODO temporary for debugging
  try {
    return CryptoJS.AES.decrypt(text, secretKey).toString();
  } catch (e) {
    return "";
  }
};

const forgeEncrypt = (key, secret, nonce) => {
  let nonceInBytes = forge.util.hexToBytes(nonce.substring(0, 24));
  const cipher = forge.cipher.createCipher(
    "AES-GCM",
    forge.util.hexToBytes(key)
  );

  cipher.start({
    iv: nonceInBytes,
    output: null
  });

  cipher.update(forge.util.createBuffer(forge.util.hexToBytes(secret)));

  cipher.finish();

  const encrypted = cipher.output;

  const tag = cipher.mode.tag;

  return encrypted.toHex() + tag.toHex();
};

const forgeDecrypt = (key, secret, nonce) => {
  let nonceInBytes = forge.util.hexToBytes(nonce.substring(0, 24));
  const decipher = forge.cipher.createDecipher(
    "AES-GCM",
    forge.util.hexToBytes(key)
  );

  decipher.start({
    iv: nonceInBytes,
    output: null,
    tag: forge.util.hexToBytes(secret.substring(64, 96))
  });
  // an eth private seed key is 64 characters and our tags are 32 characters

  decipher.update(
    forge.util.createBuffer(forge.util.hexToBytes(secret.substring(0, 64)))
  );
  if (!decipher.finish()) {
    // it failed, do something
  }

  const decrypted = decipher.output;

  return decrypted.toHex();
};

export default {
  decrypt,
  decryptTest, //TODO
  encrypt,
  genesisHash,
  getPrimordialHash,
  getSalt,
  hashChain,
  obfuscate,
  parseEightCharsOfFilename,
  sideChain,
  forgeEncrypt,
  forgeDecrypt
};
