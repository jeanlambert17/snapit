import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import Routes from './src/routes';

let store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
    
   render() {
      return (        
         <Provider store={store}>
          <Routes />
         </Provider>
      );
   }
}

export default App