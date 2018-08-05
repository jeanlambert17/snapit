import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Profile, Settings, PostCamera, PostForm, PostDetail, UserProfile } from '../screens';

const ProfileStack = createStackNavigator(
  {
    Profile: Profile,
    Settings: Settings,
    Detail: PostDetail,
    UserProfile: UserProfile
  }, {
    initialRouteName: 'Profile',
  }
);

const UploadStack = createStackNavigator(
  {
    PostCamera: PostCamera,
    PostForm: PostForm
  }, {
    initialRouteName:'PostCamera',
  }
)

const _ProfileStack = createBottomTabNavigator(
  {
    Profile: ProfileStack,
    Upload: UploadStack
  },
);

// Marana para evitar un error con el drawer
export default createStackNavigator(
  {
    Principal: _ProfileStack,
  }, {
    headerMode: 'none',
  }
);