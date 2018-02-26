import { createStore, compose, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from 'redux/reducers';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'directories',
  storage
};

export const store = createStore(
  persistReducer(persistConfig, reducer),
  compose(applyMiddleware(thunk))
);

export const persistor = persistStore(store, {}, () => {
});

;
