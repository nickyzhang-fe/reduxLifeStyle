/**
 * Created by Cral-Gates on 2017/6/29.
 */

import * as types from '../constants/ActionTypes';

const initialState = {
    loading: false,
    status: null,
    data: {}
};

export default function register(state = initialState, action) {
    switch (action.type){
        case types.REGISTER_PERFORM_ACTION:
            return Object.assign({}, state, {
                loading:true,
                status: 'doing'
            });
        case types.REGISTER_SUCCESS_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'success',
                data: action.data
            });
        case types.REGISTER_ERROR_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'failed',
                data: action.data
            });
        default:
            return state;
    }
}