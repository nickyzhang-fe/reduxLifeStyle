/**
 * Created by Cral-Gates on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import Toast from 'react-native-root-toast';

class Util extends Component {
    /*
     * 判断字符
     * */
    static isEmpty(v) {
        switch (typeof v) {
            case 'date':
                return true;
            case 'undefined' :
                return true;
            case 'string' :
                if (v.trim().length === 0)
                    return true;
                break;
            case 'boolean' :
                if (!v)
                    return true;
                break;
            case 'number' :
                if (0 === v)
                    return true;
                break;
            case 'object' :
                if (null === v) {
                    return true;
                }
                else if (undefined !== v.length && v.length === 0) {
                    return true;
                }
                else {
                    return false;
                }
                break;
        }
        return false;
    }

    /*
     * toast
     * */
    static showToastCenter(value) {
        Toast.show(value, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
        return false;
    }

    /*
     * 返回
     * */
    static goBack(navigator) {
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    }

    /*
     * 屏幕宽高
     * */
    static getScreenWidth() {
        return Dimensions.get('window').width;
    }
    static getScreenHeight(){
        return Dimensions.get('window').height
    }


    static Format(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
}

export default Util;