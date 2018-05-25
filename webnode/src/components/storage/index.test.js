import configureStore from 'redux-mock-store'
import Storage, { onGenesisHashChange, onNumberOfChunksChange } from "components/storage/";

const initialState = {}; 
const mockStore = configureStore();
let wrapper;
let store;

test('redux store', () => {
  beforeEach(() => {
	store = mockStore(initialState);
	wrapper = shallow(<Storage store={store}/>);
	})
});
