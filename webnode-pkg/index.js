const _ = require("lodash");

const array = [1, 2, 3];
const double = _.map(array, x => x * 2);
console.log("heyyyyyyyy: ", double);

exports.run = () => {};
