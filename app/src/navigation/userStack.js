import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Home } from '../scenes';
import Drawer from '../components/drawer';
import {
   Text,
} from 'react-native';
import ProfileStack from './profileStack';

const HomeStack = createStackNavigator(
   {
      Home: Home,
   }, {
      initialRouteName: 'Home',
   }
)

export default createDrawerNavigator(
   {
      Home: HomeStack,
      Profile: ProfileStack,
   }, {
      contentComponent: Drawer
   }
);