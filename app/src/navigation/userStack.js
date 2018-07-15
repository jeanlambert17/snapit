import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Home, Settings } from '../scenes';
import Drawer from '../components/drawer';

const _ProfileStack = createBottomTabNavigator(
   {
      Settings: {
         screen: Settings,
      },
      Settings2: {
         screen: Settings,
      }
   }, {
      initialRouteName: 'Settings',
   }
)
const ProfileStack = createStackNavigator(
   {
      Profile: _ProfileStack,
   }, {
      initialRouteName: 'Profile',
      navigationOptions: {
         headerStyle: {
            backgroundColor: '#F04A58',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
            fontWeight: 'bold',
         },
    },
   }
)

export default createDrawerNavigator(
   {
      Home: Home,
      Profile: ProfileStack,
   }, {
      contentComponent: Drawer
   }
);