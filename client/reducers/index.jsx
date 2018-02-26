import {combineReducers} from 'redux';
import PageReducer from './page/PageReducer';

const allReducers = combineReducers({
    page: PageReducer,
});

export default allReducers
