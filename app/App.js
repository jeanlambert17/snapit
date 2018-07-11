import React from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import Main from './src';

let store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
    
   render() {
      return (        
         <Provider store={store}>
            <Main />
         </Provider>
      );
   }
}

export default App