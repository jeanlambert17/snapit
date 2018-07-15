import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Settings } from '../scenes';
import React from 'react';
import {
   Image,
   View,
   Text,
   Dimensions,
   TouchableHighlight,
   CameraRoll,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { API_URL } from '../helpers/configs';

// const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class _Title extends React.Component {

   getPhotosFromGallery() {
      CameraRoll.getPhotos({ first: 10, assetType: 'Photos' })
         .then(res => {
            console.log(res, "images data")
         })
   }

   render() {
      const {user} = this.props;
      return (
         <View style={{ alignItems: 'center', flex: 1, marginTop: 35 }}>
            <TouchableHighlight
               style={{ borderRadius: 80 }}
               activeOpacity={0.5} onPress={this.getPhotosFromGallery}>
               <Image
                  style={{ width: 80, height: 80, borderRadius: 80 }}
                  source={{ uri: `${API_URL}/${user.photoUrl}` }}
               />
            </TouchableHighlight>
            <Text style={{ marginTop: 10, color: 'white', fontWeight: 'bold', fontSize: 20 }}>{user.name}</Text>
         </View>
      );
   }
}

const mapStateToProps = ({auth}) => ({
   user: auth.user,
});
const Title = connect(mapStateToProps)(_Title);

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
         headerTitle: <Title />,         
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