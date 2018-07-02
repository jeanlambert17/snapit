import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';

let store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
    render() {
        return (
        <View style={styles.container}>
            <Provider store={store}>
                <Routes />
            </Provider>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default App