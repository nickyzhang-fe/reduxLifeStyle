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

const GuideImg = [require('../imgs/guide/start_i0.png'),
    require('../imgs/guide/start_i1.png'),
    require('../imgs/guide/start_i2.png'),];

class GuideView extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});
        this.state = {
            viewPagerDataSource: dataSource.cloneWithPages(GuideImg),
        }
    }

    render() {
        return (
            <View style={styleSheet.container}>
                <ViewPager
                    ref={(viewpager) => {this.viewpager = viewpager}}
                    dataSource={this.state.viewPagerDataSource}
                    renderPage={this._renderPage}
                    onChangePage={(pageId)=> this._onChangePage(pageId)}
                    isLoop={false}
                    autoPlay={false}/>
            </View>
        )
    }
    _renderPage(data, pageID) {
        // console.log(data);
        console.log(pageID);
        return (
            <Image
                source={data}
                style={styleSheet.bgImg}/>
        );
    }
    _onChangePage = (page) => {
        console.log(page);
    }
}
const styleSheet = StyleSheet.create({
    container: {
        width: Util.getScreenWidth() ,
        height: Util.getScreenHeight()
    },
    bgImg: {
        width: Util.getScreenWidth(),
        height: Util.getScreenHeight()
    }
});

export default GuideView;