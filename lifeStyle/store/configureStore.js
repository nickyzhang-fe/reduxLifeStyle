/**
 * Created by Cral-Gates on 2017/6/25.
 */

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from '../reducers/rootReducers';
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducers, initialState);
    console.log(rootReducers);
    console.log(initialState);
    console.log(store);
    console.log(store.getState());
    return store;
}