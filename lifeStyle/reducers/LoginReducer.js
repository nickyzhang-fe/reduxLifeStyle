/**
 * Created by Cral-Gates on 2017/6/25.
 */
'use strict';
import * as types from '../constants/ActionTypes';

const initialState = {
    loading : false,
    data:'',
    status: null
};

export default function login(state = initialState, action){
    switch (action.type) {
        case types.LOGIN_PERFORM_ACTION:
            return Object.assign({}, state, {
                loading: true,
                status: 'doing'
            });
        case types.LOGIN_SUCCESS_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'success',
                data: action.result
            });
        case types.LOGIN_ERROR_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'failed',
                data: action.result
            });
        default:
            return state;
    }
}