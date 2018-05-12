import { createEpicMiddleware } from "redux-observable";
import epics from "../epics";

const epicMiddleware = createEpicMiddleware(epics);
export default epicMiddleware;