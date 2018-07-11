import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Home, Profile } from '../scenes';
import Drawer from '../components/drawer';

export default createDrawerNavigator(
   {
      Home: Home,
      Profile: Profile,
   }, {
      contentComponent: Drawer
   }
);