import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Home, PostDetail,UserProfile } from '../screens';
import Drawer from '../components/drawer';
import {
   Text,
} from 'react-native';
import ProfileStack from './profileStack';

const HomeStack = createStackNavigator(
   {
      Home: Home,
      Detail: PostDetail,
      UserProfile: UserProfile
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