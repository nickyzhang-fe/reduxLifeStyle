/**
 * Created by Cral-Gates on 2017/6/25.
 * 程序入口
 */
import React, {Component} from 'react';
import {

} from 'react-native';
import App from '../lifeStyle/App';

import configureStore from '../lifeStyle/store/configureStore';
import {Provider} from 'react-redux';

const store = configureStore();

class root extends Component{
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

export default root;