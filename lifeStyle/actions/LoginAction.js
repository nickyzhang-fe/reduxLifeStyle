/**
 * Created by Cral-Gates on 2017/6/25.
 */
import NetUtil from '../utils/NetUtil';
import * as types from '../constants/ActionTypes';
import Global from '../constants/Global';

export function performLoginAction(username, password) {
    return (dispatch) => {
        dispatch(performLogin());
        let url = Global.LOGIN + "username=" + username + "&password=" + password;
        NetUtil.get(url, function (res) {
            if (res.hasOwnProperty('code')) {
                dispatch(errorAction(res));
            } else {
                dispatch(successLogin(res))
            }
        })
    }
}

function performLogin() {
    return {
        type: types.PERFORM_ACTION
    }
}

function successLogin(result) {
    return {
        type: types.LOGIN_ACTION,
        data: result
    }
}

function errorAction(result) {
    return {
        type: types.ERROR_ACTION,
        data: result
    }
}