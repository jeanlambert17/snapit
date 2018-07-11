import { DrawerItems, SafeAreaView, createDrawerNavigator } from 'react-navigation';
import { Home, Profile } from '../scenes';
import Drawer from '../components/drawer';

export default DrawerStack = createDrawerNavigator(
   {
      Home: Home,
      Profile: Profile,
   }, {
      contentComponent: Drawer
   }
);

