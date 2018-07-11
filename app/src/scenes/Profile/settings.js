import React, { Component } from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   Button,
} from 'react-native';

import usernameImg from '../../assets/images/username.png';
// import passwordImg from '../../assets/images/password.png';
// import emailImg from '../../assets/images/email-outline.png';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from '../../components';
import styles from './Styles/settings';

class Settings extends Component {
   state = {
      username: '',
      email : '',
      name: '',
   }
   componentDidMount() {
      this.setState({
         ...this.props.user,
      });
   }

   handleTextChange = (input) => (value) => this.setState({ [input]: value });
   handleUpdate = () => {
      
   }
   
   render() {
      const { user } = this.props;
      return (
         <View style={styles.container}>
            <View style={styles.editContainer}>
               <Input
                  source={usernameImg}
                  textContentType="username"
                  onChangeText={this.handleTextChange('username')}                  
                  value={this.state.username}
                  /* editable={this.state.editUsername} */
                  containerStyle={styles.editInput}
               />
               {/* <View style={styles.editIcon}>
                  <Icon.Button
                     name="pencil"
                     backgroundColor="#F01A30"
                     borderRadius={30}
                     iconStyle={{paddingLeft:10}}
                     onPress={this.handleEditText('editUsername')}
                  />
               </View> */}
            </View>
            <Button 
               title="UPDATE"
               color="#F04A58"
               onPress={this.handleUpdate}
            />
         </View>
      )
   }
}

export default Settings