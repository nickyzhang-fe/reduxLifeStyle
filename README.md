### reduxLifeStyle使用redux重构

> 前言：本文将着重梳理清 redux 使用中的各个关键词的概念，以加深对redux的理解
> [本文地址]()
> 
> [项目地址](https://github.com/5ibinbin/reduxLifeStyle)

##### redux是什么
> redux 是 JavaScript 状态容器，提供对 JavaScript 应用状态的管理

##### redux安装
- 安装 react-redux
		
		npm install --save react-redux
- 安装 redux

		npm install --save redux
- 安装 redux-thunk

		npm install --save redux-thunk
		
##### redux介绍
###### redux由三部分组成：`Action `、`Reducer `、`Store `
- Action：事件的发起者(动作)，由用户或程序触发
- Reducer：根据 Action 类型来做出不同的响应，返回新的 state
- Store：存储 state 的集合

> 当由用户或者程序触发某一个具体的动作时，Reducer 将对 Action 进行识别, 并返回新的state，最终存储在 store 中的 state 发生改变，从而导致界面的变化。

###### 好处
- 单一数据源：数据只存在于 store 中，无论是开发还是调试都方便很多
- state 是只读的：只有通过触发 action 才能修改 state

##### Provider

> Provider 这个模块是作为整个 App 的容器，在你原有的 App Container 的基础上再包上一层，它的工作很简单，就是接受 Redux 的 store 作为 props

##### dispatch

> dispatch 有分发之意。我们知道由用户或者程序触发的 Action 由 Reducer 做出响应从而引起 state 的改变。而 dispatch 就扮演了他们两者中的传播媒介。简单来说：首先 store 中维护了一个 state，我们 dispatch 一个 action 会触发 reducer 检测，接下来 reducer 根据这个 action 更新 state

##### connect 

> connect方法的作用是连接 react 组件和 store，也就是说通过 connect 方法子组件可以获取 store 中的 state 和 dispatch。redux 的 connect 的含义是可以连接任意函数，这些函数的参数可以注入 store、state、dispatch。connect 可以将组件和 reducer 相关联。

##### combineReducers

> 我们知道 reducer 是一个纯函数，接收已有的的 state 和 action，返回新的 state。当state比较多或复杂时，我们想让每个 reducer 只管理一部分 state 数据。而combineReducers 可以将所有的部分state友好的合并成一个全局的 state。其实combineReducers()所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理,然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象

##### applyMiddleware
> applyMiddleware是中间件，使用于 action 被发起之后，到达 reducer 之前的扩展点。 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由

##### 异步Action
> 当有网络请求的时候我们需要用到异步操作，这时候我们就需要使用到Thunk middleware 或者 redux-promise 中间件来

##### 组件：
- [react-native-loading-spinner-overlay](https://github.com/joinspontaneous/react-native-loading-spinner-overlay)
- [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
- [react-native-tab-navigator](https://github.com/happypancake/react-native-tab-navigator)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
	- npm install react-native-vector-icons --save
	- react-native link react-native-vector-icons 

##### 参考文章
[Redux 中文文档](http://cn.redux.js.org/index.html)

[React Redux connect详解](http://cn.redux.js.org/docs/react-redux/api.html)

[React Redux 实例教程](http://www.jianshu.com/p/2c43860b0532)