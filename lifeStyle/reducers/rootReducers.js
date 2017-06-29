/**
 * Created by Cral-Gates on 2017/6/25.
 */
import {combineReducers} from 'redux';
import loginReducer from './LoginReducer';
import registerReducer from './RegisterReducer';

const rootReducers = combineReducers({
    loginReducer,
    registerReducer
});
export default rootReducers;