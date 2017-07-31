### reduxLifeStyle使用redux重构(二)

> 前言：[redux重构(一)](http://www.jianshu.com/p/972aebe266de)的时候大概讲了redux的各个部分的定义，这一部分主要讲解一下redux的具体使用。
 
> [本文地址](https://github.com/5ibinbin/reduxLifeStyle)
 
> [项目地址](https://github.com/5ibinbin/reduxLifeStyle)
 
> 后端[LeanCloud](https://leancloud.cn)

##### redux 使用

###### 1.项目目录结构
![construct](/Users/Cral-Gates/Desktop/屏幕快照 2017-07-24 15.57.09.png)

> redux能用到的结构都在图上提现出来了，下面将以Login为例介绍每部分的具体内容

###### 2.`ActionTypes ` - 统一定义了action供别处调用

	export const ERROR_ACTION = 'ERROR_ACTION';
	export const LOGIN_PERFORM_ACTION = 'LOGIN_PERFORM_ACTION';
	export const LOGIN_ACTION = 'LOGIN_ACTION';

###### 3.`LoginAction ` - 事件的发起者
	
	import NetUtil from '../utils/NetUtil';
	import * as types from '../constants/ActionTypes';
	import Global from '../constants/Global';
	
	export function performLoginAction(username, password) {
	    return (dispatch) => {
	        dispatch(performLogin());
	        let url = Global.LOGIN + "username=" + username + "&password=" + password;
	        NetUtil.get(url, function (res) {
	            if (res.hasOwnProperty('code')) {
	                dispatch(errorAction(res));
	            } else {
	                dispatch(successLogin(res))
	            }
	        })
	    }
	}
	
	function performLogin() {
	    return {
	        type: types.LOGIN_PERFORM_ACTION
	    }
	}
	
	function successLogin(result) {
	    return {
	        type: types.LOGIN_ACTION,
	        data: result
	    }
	}
	
	function errorAction(result) {
	    return {
	        type: types.ERROR_ACTION,
	        data: result
	    }
	}
	
- 首先`import `我们前面定义的`ActionType `、`Global `(全局常量)、`NetUtil `(封装的网络请求)
- 然后我们`dispatch `(分发)各个动作，此处我们`dispatch `了`performLogin `这一动作，然后进行网络请求，根据请求成功与否我们`dispatch `了`successLogin `和`errorAction `这两个动作。
- 这里的主要区别就是动作的不同，这里仅仅是触发了不同的动作，之后我们会根据不同的动作来处理不同的数据。

> 在这里我们根据不同的`action `来选择是否传递数据以供`reducer `使用

###### 4.`LoginReducer ` - 根据Action的不同来改变state(数据)

	import * as types from '../constants/ActionTypes';
	
	const initialState = {
	    loading : false,
	    data:{},
	    status: null
	};
	
	export default function login(state = initialState, action){
	    switch (action.type) {
	        case types.LOGIN_PERFORM_ACTION:
	            return Object.assign({}, state, {
	                loading: true,
	                status: 'doing'
	            });
	        case types.LOGIN_ACTION:
	            return Object.assign({}, state, {
	                loading: false,
	                status: 'success',
	                data: action.data
	            });
	        case types.ERROR_ACTION:
	            return Object.assign({}, state, {
	                loading: false,
	                status: 'failed',
	                data: action.data
	            });
	        default:
	            return state;
	    }
	}
	
- 引入`ActionType `
- 定义默认`state `的数据结构
- 根据不同的`action`修改`state`，这里使用了ES6中的`Object.assign()`

> 这里的action.data是`LoginAction `传递过来的

###### 5. 页面 -`action `的触发和`state `的改变

	import React, {Component} from 'react';
	import {
	    StyleSheet,
	    View
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
	        console.log(loginReducer);
	        return (
	            <View style={styles.container}>
	                
	            </View>
	        )
	    }
	
	    componentDidUpdate() {
	        const {loginReducer} = this.props;
	        if (loginReducer.status === 'success') {
	            const {navigator} = this.props;
	            navigator.push({
	                name: 'Tabs',
	                component: Tabs
	            })
	        }
	        if (loginReducer.status === 'failed'){
	            Util.showToastCenter(loginReducer.data.error);
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
	}
	
	const styles = StyleSheet.create({
	    container: {
	        flex: 1,
	        backgroundColor: '#f5f5f5'
	    }
	});
	
	function mapStateToProps(state) {
	    const {loginReducer} = state;
	    return {
	        loginReducer
	    }
	}
	
	export default connect(mapStateToProps)(Login);
	
> 说明：这里防止篇幅过长(tou lan)特意把`Login`界面和样式给删了.

- 首先我们导入`LoginAction`里面的方法`performLoginAction`，在我们登录的时候调用
- 当触发登录动作的时候调用`performLoginAction() `

> 这样我们的整个流程就走通了，但是还差最后一步，当` LoginReducer `改变了`state `时，页面是怎么接受数据的呢？这就是下面要介绍的`connect `

###### 6. connect: 连接 react 组件和 store
	
	function mapStateToProps(state) {
    	const {loginReducer} = state;
    	return {
       		loginReducer
    	}
	}

	export default connect(mapStateToProps)(Login);

>`mapStateToProps `: 组件将会监听`store `的数据变化，只要`store`发生变化，就会回调该方法。然后我们就可以在componentWillReceiveProps() 方法中接收state的改变。

**到目前为止还差`store `中的`state `管理、`reducer `的管理**
###### 7.`rootReducers `

	import {combineReducers} from 'redux';
	import loginReducer from './LoginReducer';
	import registerReducer from './RegisterReducer';
	import homeReducer from './HomeReducer';
	
	const rootReducers = combineReducers({
	    loginReducer,
	    registerReducer,
	    homeReducer
	});
	export default rootReducers;

> 将不同的reducer导入，并使用`combineReducers ` 将他们统一管理

###### 8.`store `

	import {createStore, applyMiddleware} from 'redux';
	import thunkMiddleware from 'redux-thunk';
	import rootReducers from '../reducers/rootReducers';
	const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
	export default function configureStore(initialState) {
	    const store = createStoreWithMiddleware(rootReducers, initialState);
	    return store;
	}
	
> 所有的`state `都存储在这里

###### 9. `Provider `

	import React, {Component} from 'react';
	import App from '../lifeStyle/App';
	
	import configureStore from '../lifeStyle/store/configureStore';
	import {Provider} from 'react-redux';
	
	const store = configureStore();
	
	class root extends Component{
	    render(){
	        return(
	            <Provider store={store}>
	                <App/>
	            </Provider>
	        )
	    }
	}
	
	export default root;
> Provider 这个模块是作为整个 App 的容器，在你原有的 App Container 的基础上再包上一层，它的工作很简单，就是接受 Redux 的 store 作为 props

##### 梳理流程：首先是用户行为或者程序触发来生成不同的`Action `，此时根据不同的`Action `来生成不同的数据，之后在`Reducer `中根据`action type`的不同将生成不同的`state `, `store` 中的state集合发生改变，并最终作用到界面上。整个过程可以理解为：UI -- > Action -- > Reducer -- > Store -- > UI, 完美的体现了单向数据流。这有点类似于Android中的MVP模式，将业务逻辑和页面的变化分割开来，各司其职互不干扰。