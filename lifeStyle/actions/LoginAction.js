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
            dispatch(successLogin(res));
        })
    }
}

function performLogin() {
    return {
        type: types.LOGIN_PERFORM_ACTION
    }
}

function successLogin(result) {
    console.log(result);
    return {
        type: types.LOGIN_SUCCESS_ACTION,
        data: result
    }
}

function errorLogin(result) {
    return {
        type: types.LOGIN_ERROR_ACTION,
        data: result
    }
}