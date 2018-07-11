import { createSwitchNavigator } from 'react-navigation';
import LoginStack from './loginStack';
import DrawerStack from './drawerStack';
import { Loading } from '../scenes';

export default createSwitchNavigator(
   {
      UserStack: DrawerStack,      
      InvitedStack: LoginStack,
      AuthLoading: Loading,
   }, {
      headerMode: 'none',
      initialRouteName: 'AuthLoading',
   }
);