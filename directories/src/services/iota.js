import IOTA from "iota.lib.js";
import { IOTA_API_PROVIDER } from "../config";

const Iota = new IOTA();

const IotaProvider = new IOTA({
  provider: IOTA_API_PROVIDER
});

//'address': 'SSEWOZSDXOVIURQRBTBDLQXWIXOLEUXHYBGAVASVPZ9HBTYJJEWBR9PDTGMXZGKPTGSUDW9QLFPJHTIEQZNXDGNRJE',
//'value': 0,
//'message': 'SOMECOOLMESSAGE',
//'tag': 'SOMECOOLTAG'

const prepareTransfers = (iotaProvider, seed, data) =>
  new Promise((resolve, reject) => {
    iotaProvider.api.prepareTransfers(seed, [{
      'address': data.address,
      'value': data.value,
      'message': data.message,
      'tag': data.tag
    }]);
  });

export default {
  utils: Iota.utils,
  provider: IotaProvider,
  prepareTransfers
};
