import { createStackNavigator } from 'react-navigation';
import { Home, Login, SignUp } from './scenes';


const Routes = createStackNavigator(
    {
        Home: Home,
        Login: Login,
        SignUp: SignUp,
    }, {
        initialRouteName: 'Home',
    }
);

export default Routes;