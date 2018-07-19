import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Profile, Settings, PostCamera, PostForm } from '../screens';
import React from 'react';
import { Dimensions } from 'react-native';
import { ProfileHeader } from '../components';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const ProfileStack = createStackNavigator(
  {
    Profile: Profile,
    Settings: Settings,
  }, {
    initialRouteName: 'Profile',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        height: DEVICE_HEIGHT * 0.2,
        backgroundColor: '#F04A58',
        alignContent: 'flex-start'
      },
      headerTitle: <ProfileHeader />,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#fff',
    })
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