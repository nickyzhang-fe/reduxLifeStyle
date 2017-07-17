/**
 * Created by Cral-Gates on 2017/6/25.
 */
'use strict';
import * as types from '../constants/ActionTypes';

const initialState = {
    loading: false,
    data: [],
    status: null,
    operate: 'init',
    detail: {}
};

export default function movieList(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case types.HOME_PERFORM_ACTION:
            return Object.assign({}, state, {
                loading: true,
                status: 'doing'
            });
        case types.HOME_MOVIE_INIT_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'success',
                data: action.data.subjects,
                operate: 'init'
            });
        case types.HOME_MOVIE_PULL_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'success',
                data: action.data.subjects,
                operate: 'refresh'
            });
        case types.HOME_MOVIE_MORE_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'success',
                data: action.data.subjects,
                operate: 'loadMore'
            });
        case types.HOME_MOVIE_Detail_ACTION:
            return Object.assign({}, state, {
                loading: false,
                status: 'success',
                detail: action.data,
                operate: 'movie_detail'
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