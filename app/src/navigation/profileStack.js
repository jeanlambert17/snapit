import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Settings } from '../scenes';
import React from 'react';
import { View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProfileHeader } from '../components';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const _ProfileStack = createBottomTabNavigator(
   {
      Settings: {
        screen: Settings,
      },
      Settings2: {
        screen: Settings,
      }
   }, {
      initialRouteName: 'Settings',
   }
);

const ProfileStack = createStackNavigator(
   {
      Profile: _ProfileStack,
   }, {
      initialRouteName: 'Profile',
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          height: DEVICE_HEIGHT*0.2,
          backgroundColor: '#F04A58',
          alignContent: 'flex-start'
         },
        headerTitle: <ProfileHeader />,         
        headerTitleStyle: {            
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
        headerLeft: (
          <View style={{alignSelf:'flex-start'}}>
              <Icon.Button
                name="menu"
                size={30}
                backgroundColor="transparent"
                onPress={() => navigation.openDrawer()}
              />
          </View>),
        headerRight: <View />
    })
  }
);

export default ProfileStack;