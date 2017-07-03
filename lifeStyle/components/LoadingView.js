/**
 * Created by Cral-Gates on 2017/5/26.
 */
/**
 * Created by sunyan on 2017/3/20.
 */

import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
const {width, height} = Dimensions.get('window');
class LoadingView extends Component {
    static propTypes = {
        loadingViewClick: React.PropTypes.func,
        showLoading: React.PropTypes.bool.isRequired,
        opacity: React.PropTypes.number,
        backgroundColor: React.PropTypes.string
    };

    static defaultProps = {
        showLoading: false,
        opacity:0.4,
        backgroundColor:'gray'
    };

    constructor(props) {
        super(props);
    }

    _close = ()=> {
        console.log("onRequestClose ---- ")
    };

    render() {
        const {showLoading, opacity, backgroundColor} = this.props;
        return (
            <Modal onRequestClose={() => this._close()} visible={showLoading} transparent={true}>
                <View style={[styles.loadingView, {
                    opacity: opacity || 0.4,
                    backgroundColor: backgroundColor || 'gray'}]}></View>
                <View style={ styles.loadingImageView }>
                    <View style={ styles.loadingImage }>
                        {
                            this.props.loadingViewClick ?
                                <TouchableOpacity onPress={ this.props.loadingViewClick }>
                                    <Image style={ styles.loadingImage } source={require('../imgs/loading.gif')}/>
                                </TouchableOpacity>
                                :
                                <Image style={ styles.loadingImage } source={require('../imgs/loading.gif') }/>
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        height,
        width,
        position: 'absolute'
    },
    loadingImage: {
        width: 80,
        height: 80,
    },
    loadingImageView: {
        position: 'absolute',
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
// LoadingView.propTypes = {
//     loadingViewClick: React.PropTypes.func,
//     showLoading: React.PropTypes.bool.isRequired,
//     opacity: React.PropTypes.number,
//     backgroundColor: React.PropTypes.string
// };
export default LoadingView

