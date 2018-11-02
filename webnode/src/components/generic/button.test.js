import React from "react";
import Button from "./button";

test("Button test", () => {
  const tree = renderer.create(<Button color="red" />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule("color", "red");
  expect(tree).toHaveStyleRule("border-radius", "8px", {
    media: "(max-width:1200px)"
  });
});
