/**
 * Created by Cral-Gates on 2017/7/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import LoadingView from '../components/LoadingView';
import LongLine from '../components/LongLine';
import TextButton from '../components/TextButton';
import NavigationBar from '../components/NavigationBar';

import {getMovieDetailAction} from '../actions/HomeAction';
import {connect} from 'react-redux';

import Util from '../utils/Util';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: this.props.movie
        };
    }

    componentWillMount(){
        // this.getMovieDetail(this.props.movie.id);
    }
    render() {
        let movieContent = this.state.movie;
        const {dispatch, homeReducer} = this.props;
        let movieDetail = homeReducer.detail;
        console.log(movieDetail);
        let original_title = movieContent.original_title;
        let movie_title = movieContent.title;
        if (movie_title === original_title) {
            movie_title = '';
        }
        var images = [];
        var director = [];
        console.log(movieDetail.casts);
        console.log(movieDetail.directors);
        if (!Util.isEmpty(movieDetail.casts) && !Util.isEmpty(movieDetail.directors)) {
            console.log('执行到这里');
            for (var i = 0; i < movieDetail.casts.length; i++) {
                images.push(
                    <View key={movieDetail.casts[i].avatars.medium} style={styleSheet.movie_detail_view}>
                        <Image style={styleSheet.movie_detail_view_img} source={{uri: movieDetail.casts[i].avatars.medium}}></Image>
                    </View>
                )
            }
            for (var i = 0; i < movieDetail.directors.length; i++) {
                director.push(
                    <View key={movieDetail.directors[i].avatars.medium} style={styleSheet.movie_detail_view}>
                        <Image style={styleSheet.movie_detail_view_img} source={{uri: movieDetail.directors[i].avatars.medium}}></Image>
                    </View>
                )
            }
        }

        return (
            <View style={styleSheet.container}>
                <NavigationBar
                    title={this.state.movie.title}
                    showLeftState={true}
                    onPress={() => this._goBack()}/>
                <ScrollView>
                    <View style={[styleSheet.movie_Detail_Bg, {justifyContent: 'center'}]}>
                        <Text style={styleSheet.movie_fontSize}>{movie_title}&nbsp;{original_title}</Text>
                    </View>
                    <View style={styleSheet.movie_Detail_Bg}>
                        <View>
                            <Image source={{uri: this.state.movie.images.medium}} style={styleSheet.movie_Detail_Img}></Image>
                        </View>
                        <View style={styleSheet.movie_detail_col}>
                            <Text
                                style={styleSheet.movieSummary}>{'导演：'}{this.getMovieCasts(1, movieContent.directors)}</Text>
                            <Text
                                style={styleSheet.movieSummary}>{'主演：'}{this.getMovieCasts(1, movieContent.casts)}</Text>
                            <Text
                                style={styleSheet.movieSummary}>{'类型：'}{this.getMovieCasts(2, movieContent.genres)}</Text>
                            <Text
                                style={styleSheet.movieSummary}>{'制片国家/地区：'}{this.getMovieCasts(2, movieDetail.countries)}</Text>
                            <Text
                                style={styleSheet.movieSummary}>{'又名：'}{this.getMovieCasts(2, movieDetail.aka)}</Text>
                            <Text style={styleSheet.movieSummary}>{'年份：' + movieContent.year}</Text>
                        </View>
                    </View>

                    <View style={[styleSheet.movie_Detail_Bg, {flexDirection: 'column'}]}>
                        <View style={styleSheet.movie_Detail_row}>
                            <Text style={styleSheet.movie_fontSize_14}>{movieContent.title}&nbsp;&nbsp;{'剧情简介'}</Text>
                        </View>
                        <View style={styleSheet.movie_Detail_row}>
                            <Text style={styleSheet.movie_Detail_Intro}>&nbsp;&nbsp;{movieDetail.summary}</Text>
                        </View>
                    </View>


                    <View style={[styleSheet.movie_Detail_Bg, {flexDirection: 'column'}]}>
                        <Text style={styleSheet.movie_fontSize}>{'主演'}</Text>
                        <View style={styleSheet.movie_detail_view_item}>
                            {images}
                        </View>
                    </View>

                    <View style={[styleSheet.movie_Detail_Bg, {flexDirection: 'column'}]}>
                        <Text style={styleSheet.movie_fontSize}>{'导演'}</Text>
                        <View style={styleSheet.movie_detail_view_item}>
                            {director}
                        </View>
                    </View>
                    <LoadingView
                        showLoading={homeReducer.loading}/>
                </ScrollView>
            </View>
        )
    }

    componentWillUpdate(){

    }
    componentDidMount() {
        this.getMovieDetail(this.props.movie.id);
    }

    _goBack = () => {
        const {navigator} = this.props;
        Util.goBack(navigator);
    };

    getMovieDetail = (id) => {
        const {dispatch} = this.props;
        dispatch(getMovieDetailAction(id));
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
        height: 520,
        width: Util.getScreenWidth() - 30,
        margin: 2
    }
});

function mapStateToProps(state) {
    const {homeReducer} = state;
    return {
        homeReducer
    }
}
export default connect(mapStateToProps)(MovieDetail);