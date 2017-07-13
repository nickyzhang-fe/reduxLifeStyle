/**
 * Created by Cral-Gates on 2017/7/9.
 */
import NetUtil from '../utils/NetUtil';
import * as types from '../constants/ActionTypes';
import Global from '../constants/Global';

export function getMovieListAction(pageStart, pageEnd) {
    return (dispatch) => {
        dispatch(performAction());
        let params = 'start=' + pageStart + '&count=' + pageEnd;
        fetch(NetUtil.DouB_Api + NetUtil.movie_Top250 + params)
            .then((response) => (response.json()))
            .then((res) => {
                if (res.hasOwnProperty('code')) {
                    dispatch(errorAction());
                } else {
                    dispatch(MovieList(res));
                }
            })
    }
}

export function pullRefreshMovieListAction(pageStart, pageEnd) {
    return (dispatch) => {
        dispatch(performAction());
        let params = 'start=' + pageStart + '&count=' + pageEnd;
        fetch(NetUtil.DouB_Api + NetUtil.movie_Top250 + params)
            .then((response) => (response.json()))
            .then((res) => {
                if (res.hasOwnProperty('code')) {
                    dispatch(errorAction());
                } else {
                    dispatch(PullRefresh(res));
                }
            })
    }
}

export function loadMoreMovieListAction(pageStart, pageEnd) {
    return (dispatch) => {
        dispatch(performAction());
        let params = 'start=' + pageStart + '&count=' + pageEnd;
        fetch(NetUtil.DouB_Api + NetUtil.movie_Top250 + params)
            .then((response) => (response.json()))
            .then((res) => {
                if (res.hasOwnProperty('code')) {
                    dispatch(errorAction());
                } else {
                    dispatch(LoadMore(res));
                }
            })
    }
}

function performAction() {
    return {
        type: types.HOME_PERFORM_ACTION
    }
}

function MovieList(result) {
    return {
        type: types.HOME_MOVIE_INIT_ACTION,
        data: result
    }
}

function PullRefresh(result) {
    return {
        type: types.HOME_MOVIE_PULL_ACTION,
        data: result
    }
}

function LoadMore(result) {
    return {
        type: types.HOME_MOVIE_MORE_ACTION,
        data: result
    }
}

function GoMovieDetail(result) {
    return {
        type: types.HOME_MOVIE_GO_ACTION,
        data: result
    }
}

function errorAction() {
    return {
        type: types.ERROR_ACTION
    }
}