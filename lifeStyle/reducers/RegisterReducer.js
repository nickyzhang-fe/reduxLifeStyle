/**
 * Created by Cral-Gates on 2017/6/29.
 */

import * as types from '../constants/ActionTypes';

const initialState = {
    registerLoading: false,
    status: null,
    data: {}
};

export default function register(state = initialState, action) {
    switch (action.type){
        case types.PERFORM_ACTION:
            return Object.assign({}, state, {
                registerLoading:true,
                status: 'doing'
            });
        case types.REGISTER_ACTION:
            return Object.assign({}, state, {
                registerLoading: false,
                status: 'success',
                data: action.data
            });
        case types.ERROR_ACTION:
            return Object.assign({}, state, {
                registerLoading: false,
                status: 'failed',
                data: action.data
            });
        default:
            return state;
    }
}