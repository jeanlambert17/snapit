import React, { Component } from 'react';
import {
   View,
   Text,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

class Profile extends Component {

   render() {
      return (
         <View>
            <Text>adsas</Text>
         </View>
      )
   }
}

const mapStateToProps = ({auth}) => ({
   user: auth.user
});

export default connect(mapStateToProps)(Profile);