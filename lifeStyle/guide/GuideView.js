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
            <ScrollView
                contentContainerStyle={styleSheet.container}
                bounces={false}
                pagingEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Image source={require('../imgs/guide/start_i0.png')} style={styleSheet.bgImg}/>
                <Image source={require('../imgs/guide/start_i1.png')} style={styleSheet.bgImg}/>
                <Image source={require('../imgs/guide/start_i2.png')} style={styleSheet.bgImg}>
                    <Text style={styleSheet.text}>{'开启新时代'}</Text>
                </Image>
            </ScrollView>
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
    title: 'Page 1',
    description: 'Description 1',
    img: require('../imgs/guide/start_i0.png'),
    imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
    },
    backgroundColor: '#fa931d',
    fontColor: '#fff',
    level: 10,
}, {
    title: 'Page 2',
    description: 'Description 2',
    img: require('../imgs/guide/start_i1.png'),
    imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
    },
    backgroundColor: '#a4b602',
    fontColor: '#fff',
    level: 10,
}, {
    title: 'Page 3',
    description: 'Description 3',
    img: require('../imgs/guide/start_i2.png'),
    imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
    },
    backgroundColor: '#a4b602',
    fontColor: '#fff',
    level: 10,
}];

const styleSheet = StyleSheet.create({
    container: {
        width: Util.getScreenWidth()*3,
        height: Util.getScreenHeight()
    },
    bgImg: {
        width: Util.getScreenWidth(),
        height: Util.getScreenHeight()
    },
    text: {
        position: 'absolute',
        bottom: 50,
        left: 100,
    }
});

export default GuideView;