/**
 * Created by Cral-Gates on 2017/6/25.
 */
import NetUtil from '../utils/NetUtil';
import * as types from '../constants/ActionTypes';
import Global from '../constants/Global';

export function performLoginAction(username, password) {
    return (dispatch) => {
        dispatch({type: types.PERFORM_LOGIN_ACTION});
        let url = Global.LOGIN + "username=" + username + "&password=" + password;
        NetUtil.get(url, function (res) {
            console.log(res);
        })
    }
}