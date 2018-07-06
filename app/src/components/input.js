import React, { Component } from 'react';
import { 
    TextInput, 
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#D9D9D3',
        borderRadius: 15,        
        width: DEVICE_WIDTH * 0.85,
        height: 50,
    },
    input: {        
        flex: 1,
        fontSize: 20
    },
    icon: {
        height: 22,
        width: 22,
        marginLeft: 15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    }
});

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