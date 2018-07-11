import React, { Component } from 'react';
import {
   StatusBar,
   View,
   Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import Settings from './settings';
import styles from './Styles/profile';

class Profile extends Component {
   state = {
      body: 'settings',
   }

   changeBody = (body) => this.setState({ body: body })
   renderBody() {
      switch(this.state.body) {
         case 'settings': {
            return <Settings user={this.props.user}/>
         }
         default: {
            return <Settings user={this.props.user}/>
         }
      }
   }

   render() {
      const { user } = this.props
      return (
         <View>
            <StatusBar 
               backgroundColor="#F04A58" 
               barStyle="light-content" 
            />
            <View style={styles.header}>
               <Icon.Button name="menu" size={30} backgroundColor="transparent"/>
               <Text style={styles.text}> {user.name} </Text>
            </View>
            {this.renderBody()}
         </View>
      )
   }
}

const mapStateToProps = ({auth}) => ({
   user: auth.user
});

export default connect(mapStateToProps)(Profile);