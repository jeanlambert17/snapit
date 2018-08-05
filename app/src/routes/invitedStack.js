import { createStackNavigator } from 'react-navigation';
import { Home, Login, SignUp, PostDetail, UserProfile } from '../screens';

export default LoginStack = createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
    Home: Home,
    Detail: PostDetail,
    UserProfile: UserProfile
  }, {
    initialRouteName: 'Home',
  }
);