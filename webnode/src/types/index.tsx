import { StateType } from 'typesafe-actions';
import rootReducer from '../redux/reducers';

export type RootState = StateType<typeof rootReducer>;
