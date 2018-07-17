import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Settings, PostCamera, PostForm } from '../screens';
import React from 'react';
import { Dimensions } from 'react-native';
import { ProfileHeader } from '../components';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const SettingsStack = createStackNavigator(
  {
    Settings: Settings,
  }, {
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
      // headerLeft: (
      //   <View style={{ alignSelf: 'flex-start' }}>
      //     <Icon.Button
      //       name="menu"
      //       size={30}
      //       backgroundColor="transparent"
      //       onPress={() => navigation.openDrawer()}
      //     />
      //   </View>),
      // headerRight: <View />
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
    SettingsStack: SettingsStack,
    UploadStack: UploadStack
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: _ProfileStack,
  }, {
    headerMode: 'none',
  }
);

export default ProfileStack;