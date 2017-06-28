### reduxLifeStyle使用redux重构

> 前言：本文将着重梳理清redux使用中的各个关键词的概念，以加深对redux的理解

##### redux是什么
> redux是JavaScript状态容器，提供对JavaScript应用状态的管理

##### redux安装
- 安装react-redux
		
		npm install --save react-redux
- 安装redux

		npm install --save redux
- 安装redux-thunk

		npm install --save redux-thunk
		
##### redux介绍
###### redux由三部分组成：`Action `、`Reducer `、`Store `
- Action：事件的发起者(动作)，由用户或程序触发
- Reducer：根据Action类型来做出不同的响应，返回新的state
- Store：存储state的集合

> 当由用户或者程序触发某一个具体的动作时，Reducer将对Action进行识别, 并返回新的state，最终存储在store中的state发生改变，从而导致界面的变化。

###### 好处
- 单一数据源：数据只存在于store中，无论是开发还是调试都方便很多
- state是只读的：只有通过触发action才能修改state

###### 对于实际的项目来说我们还需要 `combineReducers `、`applyMiddleware`、`Provider`

##### Provider

> Provider这个模块是作为整个App的容器，在你原有的App Container的基础上再包上一层，它的工作很简单，就是接受Redux的store作为props

##### dispatch

> dispatch有分发之意。我们知道由用户或者程序触发的Action由Reducer做出响应从而引起state的改变。而dispatch就扮演了他们两者中的传播媒介。简单来说：首先store中维护了一个state，我们dispatch一个action会触发reducer检测，接下来reducer根据这个action更新state

##### connect 

> connect方法的作用是连接react组件和store，也就是说通过connect方法子组件可以获取store中的state和dispatch。redux的connect的含义是可以连接任意函数，这些函数的参数可以注入store、state、dispatch。connect可以将组件和reducer相关联。

##### 组件：

- [react-native-loading-spinner-overlay](https://github.com/joinspontaneous/react-native-loading-spinner-overlay)
- [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
	- npm install react-native-vector-icons --save
	- react-native link react-native-vector-icons 

##### 参考文章
[Redux 中文文档](http://cn.redux.js.org/index.html)

[React Redux connect详解](http://www.tuicool.com/articles/MrmYN36)
