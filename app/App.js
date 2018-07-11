import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import Navigator from './src/navigator';

let store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
    
   render() {
      return (        
         <Provider store={store}>
            <Navigator />
         </Provider>
      );
   }
}

export default App