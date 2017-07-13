/**
 * Created by Cral-Gates on 2017/7/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import LoadingView from '../components/LoadingView';
import LongLine from '../components/LongLine';
import TextButton from '../components/TextButton';
import NavigationBar from '../components/NavigationBar';

import Util from '../utils/Util';

class MovieDetail extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }
    render(){
        return(
            <View style={styleSheet.container}>
                <NavigationBar
                    showLeftState={true}
                    onPress={() => this._goBack()}/>
            </View>
        )
    }
    componentDidMount(){
        console.log(this.props.movie);
    }

    _goBack = () => {
        const {navigator} = this.props;
        Util.goBack(navigator);
    };
    /*
     * 数据之间添加 '/'
     * */
    getMovieCasts = (type, casts) => {
        let castsName = '';
        if (type === 1) {
            for (var i in casts) {
                castsName = castsName + casts[i].name + '/';
            }
        } else if (type === 2) {
            for (var i in casts) {
                castsName = castsName + casts[i] + '/';
            }
        }
        return castsName.substring(0, castsName.length - 1);
    };
}

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    movie_Detail_row: {
        flexDirection: 'row'
    },
    movie_detail_col: {
        flexDirection: 'column'
    },
    movie_Detail_Bg: {
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 4,
    },
    movie_Detail_Img: {
        height: 120,
        width: 90,
        marginRight: 6,
        marginLeft: 6,
        marginTop: 6
    },
    movie_fontSize: {
        fontSize: 16,
        color: '#333',
    },
    movie_fontSize_14: {
        fontSize: 14,
        color: '#333',
        margin: 4
    },
    movie_Detail_Intro: {
        fontSize: 14,
        color: '#666',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 4,
        lineHeight: 20
    },
    movieSummary: {
        marginLeft: 4,
        marginTop: 4,
        marginBottom: 4,
        fontSize: 14,
        color: '#666',
        flexWrap: 'nowrap',
        width: Util.getScreenWidth() - 136,
    },
    movie_detail_view_item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        flex: 1
    },
    movie_detail_view: {
        flexDirection: 'column',
    },
    movie_detail_view_img: {
        height: 120,
        width: 90,
        margin: 2
    }
});

export default MovieDetail;