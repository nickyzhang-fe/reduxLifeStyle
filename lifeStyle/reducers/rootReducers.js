/**
 * Created by Cral-Gates on 2017/6/25.
 */
import {combineReducers} from 'redux';
import loginReducer from './LoginReducer';
import registerReducer from './RegisterReducer';
import homeReducer from './HomeReducer';

const rootReducers = combineReducers({
    loginReducer,
    registerReducer,
    homeReducer
});
export default rootReducers;