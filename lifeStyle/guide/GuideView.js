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

const GuideImg = [require('../imgs/guide/start_i0.png'),
    require('../imgs/guide/start_i1.png'),
    require('../imgs/guide/start_i2.png'),];

class GuideView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guideFlag: false
        }
    }

    render() {
        return (
            <AppIntro
                onNextBtnClick={() => this.nextBtnHandle}
                onDoneBtnClick={() => this.doneBtnHandle}
                onSkipBtnClick={() => this.onSkipBtnHandle}
                onSlideChange={() => this.onSlideChangeHandle}
                showSkipButton={true}
                showDoneButton={true}
                showDots={true}
                doneBtnLabel="完成"
                skipBtnLabel="跳过"
                pageArray={pageArray}/>
        )
    }

    onSkipBtnHandle = (index) => {
        console.log(index);
    };

    doneBtnHandle = () => {
        console.log('down');
        StorageUtil.save('guideFlag', this.state.guideFlag, function () {
            console.log('guideFlag')
        })
    };

    nextBtnHandle = (index) => {
        console.log(index);
    };

    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    };
}
const pageArray = [{
    // title: 'Page 1',
    // description: 'Description 1',
    img: require('../imgs/guide/yingdao1.png'),
    imgStyle: {
        top: 120,
        height: 110 * 2.5,
        width: 110 * 2.5,
    },
    backgroundColor: '#acd6ff',
    fontColor: '#fff',
    level: 10,
}, {
    // title: 'Page 2',
    // description: 'Description 2',
    img: require('../imgs/guide/yingdao2.png'),
    imgStyle: {
        top: 120,
        height: 110 * 2.5,
        width: 110 * 2.5,
    },
    backgroundColor: '#acd6ff',
    fontColor: '#fff',
    level: 10,
}, {
    // title: 'Page 3',
    // description: 'Description 3',
    img: require('../imgs/guide/yingdao3.png'),
    imgStyle: {
        top: 120,
        height: 110 * 2.5,
        width: 110 * 2.5,
    },
    backgroundColor: '#acd6ff',
    fontColor: '#fff',
    level: 10,
}];

const styleSheet = StyleSheet.create({
    container: {
        width: Util.getScreenWidth(),
        height: Util.getScreenHeight()
    },
    bgImg: {
        width: Util.getScreenWidth(),
        height: Util.getScreenHeight()
    }
});

export default GuideView;