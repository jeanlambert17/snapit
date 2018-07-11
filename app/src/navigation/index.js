import { createSwitchNavigator } from 'react-navigation';
import InvitedStack from './invitedStack';
import UserStack from './userStack';
import { Loading } from '../scenes';

export default createSwitchNavigator(
   {
      UserStack: UserStack,      
      InvitedStack: InvitedStack,
      AuthLoading: Loading,
   }, {
      headerMode: 'none',
      initialRouteName: 'AuthLoading',
   }
);