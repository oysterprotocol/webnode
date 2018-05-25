import _ from "lodash";
import Encryption from "./encryption";

const generate = address => {
  const range = _.range(0, 1000);

  const sidechain = _.reduce(
    range,
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
