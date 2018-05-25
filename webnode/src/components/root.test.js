import Storage from "./storage/index";
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const storage = renderer.create(
    <Storage />
  ).toJSON();
  expect(storage).toMatchSnapshot();
});
