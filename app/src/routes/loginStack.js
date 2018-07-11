import { createStackNavigator } from 'react-navigation';
import { Home, Login, SignUp } from '../scenes';

export default LoginStack = createStackNavigator(
   {
      Login: Login,
      SignUp: SignUp,
      Home: Home,
   }, {
      initialRouteName: 'Home',
   }
);