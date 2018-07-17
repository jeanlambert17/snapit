import { createStackNavigator } from 'react-navigation';
import { Home, Login, SignUp } from '../screens';

export default LoginStack = createStackNavigator(
   {
      Login: Login,
      SignUp: SignUp,
      Home: Home,
   }, {
      initialRouteName: 'Home',
   }
);