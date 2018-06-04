import _ from "lodash";
import Datamap from "datamap-generator";

const generate = address => {
  const range = _.range(0, 1000);

  const sidechain = _.reduce(
    range,
    (chain, n) => {
      const lastValue = chain[n];
      const nextValue = Datamap.sideChain(lastValue);
      return [...chain, nextValue];
    },
    [Datamap.sideChain(address)]
  );

  return sidechain;
};

export default { generate };
