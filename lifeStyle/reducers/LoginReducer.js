/**
 * Created by Cral-Gates on 2017/6/25.
 */
'use strict';
import * as types from '../constants/ActionTypes';

const initialState = {
    loading : false,
    data:''
};

export default function login(state = initialState, action){
    console.log('13');
    console.log(action);
    switch (action.type) {
        case types.LOGIN_PERFORM_ACTION:
            return Object.assign({}, state, {
                loading: true
            });
            break;
        case types.LOGIN_SUCCESS_ACTION:
            return Object.assign({}, state, {
                loading: false,
                data: action.result
            });
            break;
        case types.LOGIN_ERROR_ACTION:
            return Object.assign({}, state, {
                loading: false,
                data: action.result
            });
            break;
        default:
            return state;
    }
}