/**
 * Created by Cral-Gates on 2017/6/25.
 */
import React, {Component} from 'react';
import {
    Navigator
} from 'react-native';
import Login from '../lifeStyle/containers/Login';
import GuideView from '../lifeStyle/guide/GuideView';
import StorageUtil from './utils/StorageUtil';

class App extends Component {


    initialRoute = {
        name: 'GuideView',
        component: GuideView,
    };

    configureScene = (route) => {
        return Navigator.SceneConfigs.FloatFromRight;
    };

    //第一次调用的时候，第一个参数route就是initialRoute
    renderScene = (route, navigator) => {
        let Component = route.component;
        return <Component {...route.params} navigator={navigator}/>
    };

    render() {
        return (
            <Navigator
                initialRoute={this.initialRoute}
                renderScene={this.renderScene}
                configureScene={this.configureScene}/>
        );
    }
}
export default App;