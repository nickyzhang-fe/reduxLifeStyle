/**
 * Created by Cral-Gates on 2017/7/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity
} from 'react-native';
import StorageUtil from '../utils/StorageUtil';
import NetUtil from '../utils/NetUtil';
import Util from '../utils/Util';
import NavigationBar from '../components/NavigationBar';
import MovieDetail from '../containers/MovieDetail';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
import {getMovieListAction} from '../actions/HomeAction';
import {connect} from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            username: 'ibinbin',
            movieId: '',
            title: '豆瓣电影Top250',
            dataSource: ds,
            load: false,
            pageStart: 0,
            pageEnd: 15
        }
    }

    render() {
        return (
            <View style={styleSheet.container}>
                <NavigationBar
                    title={this.state.title}
                    showLeftState={false}/>
                <ListView
                    style={styleSheet.listView}
                    renderScrollComponent={(props) => <PullRefreshScrollView
                        onRefresh={(PullRefresh) => this.onRefresh(PullRefresh)}
                        onLoadMore={(PullRefresh) => this.loadMoreRefresh(PullRefresh)}
                        useLoadMore={1} {...props}/>}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMovie.bind(this)}/>
            </View>
        )
    }

    renderMovie(movie) {
        let original_title = movie.original_title;
        let movie_title = movie.title;
        if (movie_title === original_title) {
            original_title = '';
        }
        return (
            <TouchableOpacity onPress={() => this.goMovieDetail(movie)}>
                <View style={styleSheet.movieItem}>
                    <View>
                        <Image source={{uri: movie.images.medium}} style={styles.movieImg}></Image>
                    </View>
                    <View style={styleSheet.movieItemRight}>
                        <Text style={styleSheet.movieTitle}
                              numberOfLines={1}>{movie_title} &nbsp;&nbsp;{original_title}</Text>
                        <Text style={styleSheet.movieSummary}
                              numberOfLines={1}>{'导演：'} {this.getMovieCasts(1, movie.directors)}</Text>
                        <Text style={styleSheet.movieSummary}
                              numberOfLines={1}>{'主演：'} {this.getMovieCasts(1, movie.casts)}</Text>
                        <Text style={styleSheet.movieSummary}
                              numberOfLines={1}>{'类型：'} {this.getMovieCasts(2, movie.genres)}</Text>
                        <Text style={styleSheet.movieSummary} numberOfLines={1}>{'年份：' + movie.year}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        this.getMovieDetail();
    }

    onRefresh = () => {

    };

    loadMoreRefresh = () => {

    };

    /*
    * 获取电影列表
    * */
    getMovieDetail = () => {
        const {navigator, dispatch} = this.props;
        let pageStart = this.state.pageStart;
        let pageEnd = this.state.pageEnd;
        dispatch(getMovieListAction(pageStart, pageEnd));
    };
    /*
    * 跳转到详情页
    * */
    goMovieDetail = () => {
        const {navigator} = this.props;
        navigator.push({
            name: 'MovieDetail',
            component: MovieDetail
        })
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
    listView: {
        margin: 0,
        padding: 0
    },
    movieItem: {
        marginTop: 10,
        marginRight: 8,
        marginBottom: 0,
        marginLeft: 8,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    movieItemRight: {
        flexDirection: 'column',
        alignSelf: 'center'
    },
    movieImg: {
        height: 120,
        width: 90,
        marginRight: 6
    },
    movieTitle: {
        marginLeft: 4,
        marginTop: 4,
        marginBottom: 4,
        fontSize: 16,
        color: '#333',
        width: Util.getScreenWidth() - 136,
    },
    movieSummary: {
        marginLeft: 4,
        marginTop: 4,
        marginBottom: 4,
        fontSize: 14,
        color: '#666',
        width: Util.getScreenWidth() - 136,
    }
});

function mapStateToProps(state) {
    const {homeReducer} = state;
    return {
        homeReducer
    }
}
export default connect(mapStateToProps)(Home);