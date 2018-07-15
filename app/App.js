import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import Navigator from './src/navigation';
import { PermissionsAndroid } from 'react-native';;

let store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {

//    async requestCameraPermission() {
//    try {
//       const granted = await PermissionsAndroid.request(
//          PermissionsAndroid.PERMISSIONS.CAMERA,
//          {
//             'title': 'Cool Photo App Camera Permission',
//             'message': 'Cool Photo App needs access to your camera ' +
//                'so you can take awesome pictures.'
//          }
//       )
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//          console.log("You can use the camera")
//       } else {
//          console.log("Camera permission denied")
//       }
//    } catch (err) {
//       console.warn(err)
//    }
// }
    
   render() {
      return (        
         <Provider store={store}>
            <Navigator />
         </Provider>
      );
   }
}

export default App