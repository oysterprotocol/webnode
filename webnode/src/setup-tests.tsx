import nock from "nock";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// // Make Enzyme functions available in all test files without importing
declare const global:any;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

// Mock globals
global.Math.random = () => 0.123456789;

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};

nock.disableNetConnect();
