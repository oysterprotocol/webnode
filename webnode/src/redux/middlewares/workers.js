import createWorkerMiddleware from "redux-worker-middleware";

const FindTreasureWorker = require("worker-loader!redux/workers/findTreasureWorker"); // eslint-disable-line import/no-webpack-loader-syntax
const findTreasureWorker = new FindTreasureWorker();

const workerMiddleware = createWorkerMiddleware(findTreasureWorker);
export default workerMiddleware;