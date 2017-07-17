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

export function getMovieDetailAction(id) {
    return (dispatch => {
        dispatch(performAction());
        fetch(NetUtil.movieDetail + id)
            .then((response) => (response.json()))
            .then((responseData) => {
                if (!responseData.hasOwnProperty('code')) {
                    dispatch(GetMovieDetail(responseData));
                }
            })
    })
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

function GetMovieDetail(result) {
    return {
        type: types.HOME_MOVIE_Detail_ACTION,
        data: result
    }
}

function errorAction() {
    return {
        type: types.ERROR_ACTION
    }
}