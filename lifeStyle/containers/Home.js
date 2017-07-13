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
import {getMovieListAction, pullRefreshMovieListAction, loadMoreMovieListAction} from '../actions/HomeAction';
import {connect} from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            username: 'ibinbin',
            movieId: '',
            title: '豆瓣电影Top250',
            dataSource: this.ds.cloneWithRows(this.props.homeReducer.data),
            load: false,
            pullRefresh:'',
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
                    renderRow={this.renderMovie.bind(this)}
                    enableEmptySections={true}/>
            </View>
        )
    }

    renderMovie(movie) {
        console.log(movie);
        return (
            <TouchableOpacity onPress={(movie)=>this.goMovieDetail(movie)}>
                <View style={styleSheet.movieItem}>
                    <View>
                        <Image source={{uri: movie.images.medium}} style={styleSheet.movieImg}></Image>
                    </View>
                    <View style={styleSheet.movieItemRight}>
                        <Text style={styleSheet.movieTitle}
                              numberOfLines={1}>{movie.title} &nbsp;&nbsp;{movie.original_title}</Text>
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.homeReducer.operate === 'refresh'){
            this.state.pullRefresh.onRefreshEnd();
        }
        if (nextProps.homeReducer.state === 'failed'){
            Util.showToastCenter('数据加载失败');
        }
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.homeReducer.data)
        });
        // if (nextProps.homeReducer.operate === 'loadMore'){
        //     this.state.pullRefresh.onLoadMoreEnd();
        // }
    }

    componentDidMount() {
        this.getMovieList();
    }
    /*
     * 数据刷新
     * */
    onRefresh = (PullRefresh) => {
        const {navigator, dispatch} = this.props;
        this.setState({
            pageStart: 0,
            pageEnd: 15,
            pullRefresh: PullRefresh
        });
        let pageStart = this.state.pageStart;
        let pageEnd = this.state.pageEnd;
        dispatch(pullRefreshMovieListAction(pageStart, pageEnd));
    };
    /*
     * 上拉加载更多
     * */
    loadMoreRefresh = (PullRefresh) => {
        const {navigator, dispatch} = this.props;
        let pageStart = this.state.pageStart;
        let pageEnd = this.state.pageEnd + 15;
        this.setState({
            pageStart: pageStart,
            pageEnd: pageEnd,
            pullRefresh: PullRefresh
        });
        dispatch(loadMoreMovieListAction(pageStart, pageEnd));
    };
    /*
     * 获取电影列表
     * */
    getMovieList = () => {
        const {navigator, dispatch} = this.props;
        let pageStart = this.state.pageStart;
        let pageEnd = this.state.pageEnd;
        dispatch(getMovieListAction(pageStart, pageEnd));
    };
    /*
     * 跳转到详情页
     * */
    goMovieDetail = (movie) => {
        console.log(movie.id);
        const {navigator} = this.props;
        navigator.push({
            name: 'MovieDetail',
            component: MovieDetail,
            params: {
                movie:movie.id
            }
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
    console.log(homeReducer);
    return {
        homeReducer
    }
}
export default connect(mapStateToProps)(Home);