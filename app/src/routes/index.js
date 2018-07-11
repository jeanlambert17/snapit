import { createSwitchNavigator } from 'react-navigation';
import LoginStack from './loginStack';
import DrawerStack from './drawerStack';

export default createSwitchNavigator(
   {
      UserStack: {
         screen: DrawerStack
      },
      InvitedStack: {
         screen: LoginStack
      },
   }, {
      headerMode: 'none',
      initialRouteName: 'InvitedStack',
   }
);

export const createRootNavigator = (user = null) => {

   return createSwitchNavigator({
      UserStack: {
         screen: DrawerStack
      },
      InvitedStack: {
         screen: LoginStack
      },
   }, {
      headerMode: 'none',
      initialRouteName: user ? 'UserStack' : 'InvitedStack'
   });
}