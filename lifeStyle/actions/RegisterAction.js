/**
 * Created by Cral-Gates on 2017/6/25.
 */
import NetUtil from '../utils/NetUtil';
import * as types from '../constants/ActionTypes';
import Global from '../constants/Global';
import Util from '../utils/Util';

export function performRegisterAction(params) {
    return (dispatch) => {
        dispatch(performRegister());
        let url = Global.REGISTER;
        NetUtil.postJson(url, params, function (res) {
            if (res.hasOwnProperty('code')) {
                dispatch(errorRegister(res));
                Util.showToastCenter(res.error);
            } else {
                dispatch(successRegister(res));
                Util.showToastCenter('注册成功');
            }
        })
    }
}

function performRegister() {
    return {
        type: types.REGISTER_PERFORM_ACTION
    }
}

function successRegister(result) {
    return {
        type: types.REGISTER_SUCCESS_ACTION,
        data: result
    }
}

function errorRegister(result) {
    return {
        type: types.REGISTER_ERROR_ACTION,
        data: result
    }
}