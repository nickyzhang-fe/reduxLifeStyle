/**
 * Created by Cral-Gates on 2017/7/6.
 */
import React, {Component} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    View
} from 'react-native';
import Util from '../utils/Util';
import ViewPager from 'react-native-viewpager';
import AppIntro from 'react-native-app-intro';
import StorageUtil from '../utils/StorageUtil';
import Login from '../containers/Login';

const GuideImg = [require('../imgs/guide/start_i0.png'),
    require('../imgs/guide/start_i1.png'),
    require('../imgs/guide/start_i2.png'),];

class GuideView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guideFlag: true
        }
    }

    render() {
        return (
            <AppIntro
                onNextBtnClick={(index) => this.nextBtnHandle(index)}
                onDoneBtnClick={() => this.doneBtnHandle()}
                onSkipBtnClick={(index) => this.onSkipBtnHandle(index)}
                onSlideChange={(index, total) => this.onSlideChangeHandle(index, total)}
                showSkipButton={true}
                showDoneButton={true}
                showDots={true}
                doneBtnLabel="完成"
                skipBtnLabel="跳过"
                pageArray={pageArray}/>
        )
    }

    onSkipBtnHandle = (index) => {
        StorageUtil.save('guideFlag', this.state.guideFlag, function () {
            console.log('guideFlag')
        });
        this._goLogin();
    };

    doneBtnHandle = () => {
        StorageUtil.save('guideFlag', this.state.guideFlag, function () {
            console.log('guideFlag');
        });
        this._goLogin();
    };

    nextBtnHandle = (index) => {
        console.log(index);
    };

    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    };

    _goLogin = () => {
        const {navigator} = this.props;
        navigator.push({
            name: 'login',
            component: Login
        })
    }
}
const pageArray = [{
    img: require('../imgs/guide/yingdao1.png'),
    imgStyle: {
        top: 120,
        height: 110 * 2.5,
        width: 110 * 2.5,
    },
    backgroundColor: '#ffde00',
    fontColor: '#000',
    level: 10,
}, {
    img: require('../imgs/guide/yingdao2.png'),
    imgStyle: {
        top: 120,
        height: 110 * 2.5,
        width: 110 * 2.5,
    },
    backgroundColor: '#ffde00',
    fontColor: '#000',
    level: 10,
}, {
    img: require('../imgs/guide/yingdao3.png'),
    imgStyle: {
        top: 120,
        height: 110 * 2.5,
        width: 110 * 2.5,
    },
    backgroundColor: '#ffde00',
    fontColor: '#000',
    level: 10,
}];

export default GuideView;