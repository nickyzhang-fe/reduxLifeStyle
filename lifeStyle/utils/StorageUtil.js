/**
 * Created by Cral-Gates on 2017/5/2.
 */
'use strict';
import {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';
import JsonUtil from '../utils/JsonUtil'

class StorageUtil extends Component {
    /*
     * 保存
     * */
    static save(key, value, callback) {
        return AsyncStorage.setItem(key, JsonUtil.jsonToStr(value), callback);
    }
    /*
     * 获取
     * */
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JsonUtil.strToJson(value);
            return jsonValue;
        })
    }
    /*
     * 更新
     * */
    static update(key, value) {
        StorageUtil.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JsonUtil.jsonToStr(value));
        })
    }
    /*
     * 删除
     * */
    static delete(key, callback) {
        AsyncStorage.removeItem(key, callback);
    }
}

export default StorageUtil;