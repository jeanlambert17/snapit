import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
   View,
   ScrollView,
   TouchableOpacity
} from 'react-native';

import { DrawerItems, SafeAreaView, createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { logout } from '../actions/auth';
import styles from './Styles/drawer';

class Drawer extends Component {

   handleLogout = () => this.props.logout();
   componentWillReceiveProps(nextProps) {
      if(!nextProps.user) 
         this.props.navigation.navigate('InvitedStack');
   }

   render() {
      return (
         <View style={styles.container}>
            <ScrollView>
               <SafeAreaView
                  style={{flex:1}}
                  forceInset={{ top: 'always', horizontal: 'never' }}
               >
                  <DrawerItems activeTintColor="white" inactiveTintColor="white" {...this.props} />
               </SafeAreaView>               
            </ScrollView>
            <View style={styles.footerContainer}>
               <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleLogout}
               ><Icon name="logout" size={30} color="white" />
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}
Drawer.propTypes = {
   logout: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
   logout: () => {
      dispatch(logout());
   }
});
const mapStateToProps = ({auth}) => ({
   user: auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)