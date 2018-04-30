import _ from "lodash";
import iota from "redux/services/iota";
import Encryption from "utils/encryption";

const generate = address => {
  const keys = _.range(0, 1000);

  const sidechain = _.reduce(
    keys,
    (chain, n) => {
      const lastValue = chain[n];
      const nextValue = Encryption.sideChain(lastValue);
      return [...chain, nextValue];
    },
    [Encryption.sideChain(address)]
  );

  return sidechain;
};

export default { generate };
