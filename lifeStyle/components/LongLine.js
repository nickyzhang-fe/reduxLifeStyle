/**
 * Created by Cral-Gates on 2017/5/20.
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

class LongLine extends Component {

    render() {
        return (
            <View style={styles.container}></View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height: 1,
        width: Dimensions.get('window').width,
        backgroundColor: '#f5f5f5',
    }
});

export default LongLine;