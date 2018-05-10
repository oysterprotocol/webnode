// Polyfill to make Web Worker API work with Jest.
import "jsdom-worker";

import { performTask } from "../bg-worker";

test("bg worker - simple task", done => {
  performTask(() => 12345).then(res => {
    expect(res).toEqual(12345);
    done();
  });
});

test("bg worker - works with Promise", done => {
  performTask(() => new Promise(resolve => resolve(12345))).then(res => {
    expect(res).toEqual(12345);
    done();
  });
});
