import React, { Component } from 'react';
import {
   View,
   StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Styles/header';

class Header extends Component {

   openDrawer = () => this.props.navigation.openDrawer();

   render() {
      // const { component: Component } = this.props;
      return (
         <View style={styles.container}>
            <StatusBar
               backgroundColor="#F04A58"
               barStyle="light-content"
            />
            <View style={styles.header}>
               <Icon.Button 
                  name="menu" 
                  size={30} 
                  backgroundColor="transparent" 
                  onPress={this.openDrawer}
               />
               {/* <Component /> */}
            </View>
         </View>
      );
   }
}

export default Header;