import IOTA from "iota.lib.js";
import { IOTA_API_PROVIDER } from "../config";

const Iota = new IOTA();

const providerIota = new IOTA({
  provider: IOTA_API_PROVIDER
});

export default {
  utilsIota: Iota.utils,
  providerIota: providerIota
};
