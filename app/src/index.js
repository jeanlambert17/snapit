import { createStackNavigator } from 'react-navigation';
import { Home, Login } from './scenes';


const Routes = createStackNavigator(
    {
        Home: Home,
        Login: Login,
    }, {
        initialRouteName: 'Login',
    }
);

export default Routes;