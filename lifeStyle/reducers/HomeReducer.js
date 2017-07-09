/**
 * Created by Cral-Gates on 2017/6/25.
 */
'use strict';
import * as types from '../constants/ActionTypes';

const initialState = {
    loading : false,
    data:{},
    status: null
};

export default function movieList(state = initialState, action){
    switch (action.type) {
        case types.PERFORM_ACTION:
            return Object.assign({}, state, {
                loading: true,
                status: 'doing'
            });
        case types.HOME_MOVIE_INIT_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'success',
                data: action.data
            });
        case types.HOME_MOVIE_PULL_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'success',
                data: action.data
            });
        case types.HOME_MOVIE_MORE_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'success',
                data: action.data
            });
        case types.ERROR_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'failed',
                data: action.data
            });
        default:
            return state;
    }
}