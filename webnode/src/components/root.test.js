import Storage from "components/storage/";
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const storage = renderer.create(
    <Storage />
  ).toJSON();
  expect(storage).toMatchSnapshot();
});
