/**
 * Created by Cral-Gates on 2017/4/27.
 */

'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import Home from './Home';
import Activity from './Note';
import Life from './Setting';
import Setting from './Activity';
import TabNavigator from "react-native-tab-navigator";

class LifeStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
    }

    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    title="首页"
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require('../imgs/home-off.png')} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require('../imgs/home-on.png')} style={styles.iconStyle}/>}
                    onPress={() => this.setState({selectedTab: 'home'})}>
                    <Home {...this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title="生活"
                    selected={this.state.selectedTab === 'life'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require('../imgs/life-off.png')} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require('../imgs/life-on.png')} style={styles.iconStyle}/>}
                    onPress={() => this.setState({selectedTab: 'life'})}>
                    <Life {...this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title="活动"
                    selected={this.state.selectedTab === 'activity'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require('../imgs/activity-off.png')} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require('../imgs/activity-on.png')} style={styles.iconStyle}/>}
                    onPress={() => this.setState({selectedTab: 'activity'})}>
                    <Activity {...this.props}/>
                </TabNavigator.Item>

                <TabNavigator.Item
                    title="设置"
                    selected={this.state.selectedTab === 'setting'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={require('../imgs/person-off.png')} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={require('../imgs/person-on.png')} style={styles.iconStyle}/>}
                    onPress={() => this.setState({selectedTab: 'setting'})}>
                    <Setting {...this.props}/>
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        width: 26,
        height: 26,
    },
    textStyle: {
        color: '#999',
    },
    selectedTextStyle: {
        color: '#FFDE00',
    }
});

export default LifeStyle;