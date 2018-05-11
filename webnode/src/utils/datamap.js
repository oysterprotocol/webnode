import _ from "lodash";
import iota from "redux/services/iota";
import Encryption from "utils/encryption";

const rawGenerate = (handle, size) => {
  const keys = _.range(0, size + 1);

  const [dataMap, _hash] = _.reduce(
    keys,
    ([dataM, hash], i) => {
      const [_obfuscatedHash, nextHash] = Encryption.hashChain(hash);
      dataM[i] = nextHash;

      return [dataM, nextHash];
    },
    //TODO [{}, Encryption.genesisHash(handle)]
    [{}, handle]
  );

  return dataMap;
};

const generate = (handle, size) => {
  //TODO remove this later on
  const keys = _.range(0, size + 1);

  const [dataMap, _hash] = _.reduce(
    keys,
    ([dataM, hash], i) => {
      const [obfuscatedHash, nextHash] = Encryption.hashChain(hash);
      dataM[i] = iota.toAddress(iota.utils.toTrytes(obfuscatedHash));

      return [dataM, nextHash];
    },
    //TODO [{}, Encryption.genesisHash(handle)]
    [{}, handle]
  );

  return dataMap;
};

export default { rawGenerate, generate };
