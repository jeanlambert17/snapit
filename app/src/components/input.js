import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    TextInput, 
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import styles from './Styles/input';

class Input extends Component {
    render() {
        return (
        <View style={[styles.container, this.props.containerStyle]}>
            <Image source={this.props.source} style={styles.icon} />
            <TextInput
                textContentType={this.props.textContentType}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                secureTextEntry={this.props.secureTextEntry}
                underlineColorAndroid="transparent"
                style={styles.input}
            />
        </View>
        );
    }
}

Input.propTypes = {
    source: PropTypes.number.isRequired,
    textContentType: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    containerStyle: PropTypes.number,
}

Input.defaultProps = {
    textContentType: 'none',
    secureTextEntry: false,
}

export default Input