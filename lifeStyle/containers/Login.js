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
import {connect} from 'react-redux';
import TextButton from '../components/TextButton';
import {performLoginAction} from '../actions/LoginAction';
import Util from '../utils/Util';
var username = '';
var password = '';
class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        const {login} = this.props;
        console.log('40'+login);
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
                    onChangeText={(text) => {
                        username = text;
                    }}/>
                <View style={styles.long_line}/>
                <TextInput
                    style={styles.pwd_input}
                    placeholder={'请输入密码'}
                    numberOfLines={1}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}
                    textAlign="center"
                    onChangeText={(text) => {
                        password = text;
                    }}/>
                <TouchableOpacity onPress={() => this._login()}>
                    <View style={styles.commit}>
                        <TextButton
                            text="登录"
                            color={'black'}
                            onPress={()=> this._login()}
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
                        backgroundColor={'transparent'}/>
                </View>
            </View>
        )
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    _login = ()=> {
        const {navigator,dispatch} = this.props;
        if (Util.isEmpty(username)){
            Util.showToastCenter('用户名为空');
            return;
        }
        if (Util.isEmpty(password)){
            Util.showToastCenter('密码为空');
            return;
        }
        dispatch(performLoginAction(username, password))
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
    const {login} = state;
    return {
        login
    }
}

export default connect(mapStateToProps)(Login);