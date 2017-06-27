/**
 * Created by Cral-Gates on 2017/5/1.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

class TextButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        color: PropTypes.string,
        backgroundColor:PropTypes.string,
        fontSize: PropTypes.number,
    };

    static defaultProps = {
        color: 'white',
        backgroundColor: '#FFDE00',
        fontSize:14
    };

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[{backgroundColor:this.props.backgroundColor}]}>
                    <Text style={{fontSize:this.props.fontSize, color:this.props.color}}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default TextButton;