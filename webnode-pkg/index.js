import _ from "lodash";
import redux from "./src/redux";

exports.myFunction = () => {
  console.log("when loaded as an npm module and called");
};

if (!module.parent) {
  console.log("when loaded as a script");
}
