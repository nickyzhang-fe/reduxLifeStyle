### reduxLifeStyle使用redux重构

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

###### 对于实际的项目来说我们还需要 `combineReducers `、`applyMiddleware`、`Provider`

	
##### 组件：

- [react-native-loading-spinner-overlay](https://github.com/joinspontaneous/react-native-loading-spinner-overlay)
- [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
	- npm install react-native-vector-icons --save
	- react-native link react-native-vector-icons 