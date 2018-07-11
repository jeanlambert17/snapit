import React, { Component } from 'react';
import {
   View,
   StyleSheet,
   ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { setUserData } from '../../actions/auth';

import Authenticate from '../../api/isAuth';


class Loading extends Component {
   constructor(props) {
      super(props);

      this.isAuthenticated();
   }

   isAuthenticated = async () => {
      const user = await Authenticate();
      if(user) {
         this.props.setAuth(user);
         this.props.navigation.navigate('UserStack');
      } else {
         this.props.navigation.navigate('InvitedStack');
      }
   }

   render() {

      return (
         <View style={styles.container}>
            <ActivityIndicator size="large" color="#F04A58"/>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
   }
});

const mapDispatchToProps = dispatch => ({
   setAuth: user => {
      dispatch(setUserData(user));
   }
});

export default connect(null,mapDispatchToProps)(Loading);