import React, { Component } from 'react';
import {
   View,
   Text,
} from 'react-native';
import { connect } from 'react-redux';

class Profile extends Component {

   render() {

      return (
         <View>
            <Text>Welcome! {this.props.user.name}</Text>
         </View>
      )
   }
}

const mapStateToProps = ({auth}) => ({
   user: auth.user
});

export default connect(mapStateToProps)(Profile);