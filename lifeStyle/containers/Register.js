/**
 * Created by Cral-Gates on 2017/4/28.
 */
'user strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import TextButton from "../components/TextButton";
import NavigationBar from '../components/NavigationBar';
import LoadingView from '../components/LoadingView';
import Util from '../utils/Util';
import {connect} from 'react-redux';
import {performRegisterAction} from '../actions/RegisterAction';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        const {registerReducer} = this.props;
        console.log(registerReducer);
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'用户注册'}
                    showLeftState={true}
                    onPress={() => this._goBack()}/>
                <Image source={require('../imgs/logo.png')} style={styles.image}/>
                <TextInput
                    style={styles.user_input}
                    placeholder={'请输入手机号'}
                    autoFocus={true}
                    numberOfLines={1}
                    underlineColorAndroid={'transparent'}
                    textAlign="left"
                    onChangeText={(username) => this.setState({username})}/>
                <TextInput
                    style={styles.pwd_input}
                    placeholder={'请输入密码'}
                    numberOfLines={1}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                    textAlign="left"
                    onChangeText={(password) => this.setState({password})}/>
                <View style={styles.register}>
                    <TouchableOpacity
                        onPress={() => this._register()}>
                        <TextButton
                            text="注册"
                            onPress={() => this._register()}
                            color={'black'}
                            backgroundColor={'#FFDE00'}/>
                    </TouchableOpacity>
                </View>
                <LoadingView
                    showLoading={registerReducer.loading}/>
            </View>
        )
    }

    componentDidUpdate() {
        const {registerReducer} = this.props;
        console.log(registerReducer);
        if (registerReducer.status === 'success') {
            this._goBack();
            return false;
        }
        return true;
    }

    componentDidMount() {

    }

    _register = () => {
        const {navigator, dispatch} = this.props;
        let username = this.state.username;
        let password = this.state.password;
        let params = {
            "username": username,
            "password": password,
        };
        if (Util.isEmpty(username)) {
            Util.showToastCenter('请输入用户名');
            return;
        }
        if (Util.isEmpty(password)) {
            Util.showToastCenter('请输入密码');
            return;
        }
        dispatch(performRegisterAction(params));
    };

    _goBack = () => {
        const {navigator} = this.props;
        Util.goBack(navigator);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    image: {
        borderRadius: 50,
        height: 100,
        width: 100,
        marginTop: 60,
        alignSelf: 'center',
    },
    user_input: {
        backgroundColor: '#fff',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        borderRadius: 5,
        height: 35,
    },
    pwd_input: {
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        borderRadius: 5,
        height: 35,
    },
    register: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#FFDE00',
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

function mapStateToProps(state) {
    const {registerReducer} = state;
    console.log(registerReducer);
    return {
        registerReducer
    }
}

export default connect(mapStateToProps)(Register);