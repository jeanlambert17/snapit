import React, { Component } from 'react';
import {
   StatusBar,
   View,
   Text,
} from 'react-native';

import { connect } from 'react-redux';

import styles from './styles';

class Profile extends Component {

   render() {
      const { user } = this.props
      return (
         <View>
            <StatusBar 
               backgroundColor="#F04A58" 
               barStyle="light-content" 
            />
            <View style={styles.header}>
               <Text>{user.name}</Text>
            </View>
         </View>
      )
   }
}

const mapStateToProps = ({auth}) => ({
   user: auth.user
});

export default connect(mapStateToProps)(Profile);