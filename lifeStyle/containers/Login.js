/**
 * Created by Cral-Gates on 2017/6/25.
 */
/**
 * Created by Cral-Gates on 2017/4/28.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
import Util from '../utils/Util';
import Tabs from '../containers/Tabs';
import LoadingView from '../components/LoadingView';

import {connect} from 'react-redux';
import TextButton from '../components/TextButton';
import {performLoginAction} from '../actions/LoginAction';
import Register from '../containers/Register';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        const {loginReducer} = this.props;
        return (
            <View style={styles.container}>
                <Image source={require('../imgs/logo.png')} style={styles.image}/>
                <TextInput
                    style={styles.user_input}
                    placeholder={'请输入用户名'}
                    autoFocus={true}
                    numberOfLines={1}
                    autoCapitalize={'none'}
                    underlineColorAndroid={'transparent'}
                    textAlign="center"
                    onChangeText={(username) => this.setState({username})}/>
                <View style={styles.long_line}/>
                <TextInput
                    style={styles.pwd_input}
                    placeholder={'请输入密码'}
                    numberOfLines={1}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                    textAlign="center"
                    onChangeText={(password) => this.setState({password})}/>
                <TouchableOpacity onPress={() => this._login()}>
                    <View style={styles.commit}>
                        <TextButton
                            text="登录"
                            color={'black'}
                            onPress={() => this._login()}
                            backgroundColor={'#FFDE00'}/>
                    </View>
                </TouchableOpacity>

                <View style={styles.fun_Item}>
                    <TextButton
                        text={'忘记密码'}
                        color={'#FFDE00'}
                        backgroundColor={'transparent'}/>

                    <TextButton
                        style={styles.register}
                        text={'用户注册'}
                        color={'#FFDE00'}
                        backgroundColor={'transparent'}
                        onPress={() => this._goRegister()}/>
                </View>
                <LoadingView
                    showLoading={loginReducer.loading}/>
            </View>
        )
    }

    componentDidUpdate() {
        const {loginReducer} = this.props;
        console.log(loginReducer);
        if (loginReducer.status === 'success') {
            const {navigator} = this.props;
            navigator.push({
                name: 'Tabs',
                component: Tabs
            })
        }
    }

    _login = () => {
        const {navigator, dispatch} = this.props;
        let username = this.state.username;
        let password = this.state.password;
        if (Util.isEmpty(username)) {
            Util.showToastCenter('用户名为空');
            return;
        }
        if (Util.isEmpty(password)) {
            Util.showToastCenter('密码为空');
            return;
        }
        dispatch(performLoginAction(username, password));
    };

    _goRegister = () => {
        const {navigator} = this.props;
        navigator.push({
            name: 'register',
            component: Register
        })
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
        marginTop: 80,
        alignSelf: 'center',
    },
    long_line: {
        height: 1,
        backgroundColor: '#f4f4f4'
    },
    user_input: {
        backgroundColor: '#fff',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        height: 35,
    },
    pwd_input: {
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        height: 35,
    },
    commit: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#FFDE00',
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fun_Item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    reset_pwd: {
        fontSize: 14,
        color: '#FFDE00',
        backgroundColor: 'white'
    },
    register: {
        fontSize: 14,
        color: '#FFDE00',
        textAlign: 'right',
    }
});

function mapStateToProps(state) {
    const {loginReducer} = state;
    return {
        loginReducer
    }
}

export default connect(mapStateToProps)(Login);