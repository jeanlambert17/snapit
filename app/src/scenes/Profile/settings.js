import React, { Component } from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   TouchableHighlight,
   Button,
   Modal,
} from 'react-native';

import usernameImg from '../../assets/images/username.png';
// import passwordImg from '../../assets/images/password.png';
// import emailImg from '../../assets/images/email-outline.png';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from '../../components';
import changeField from '../../api/changeField';
import VerificationModal from './verificationModal';
import styles from './Styles/settings';

class Settings extends Component {
   state = {
      username: '',
      email : '',
      name: '',
      password: '',
      modalVisible: false,
   }
   componentDidMount() {
      const { user } = this.props;
      this.setState({
         username: user.username,
         email: user.email,
         name: user.name,
      });
   }

   handleTextChange = (input) => (value) => this.setState({ [input]: value });
   setModalVisible = (visible) => { console.log('modal'); this.setState({modalVisible:visible})}
   handleUpdate = (toUpdate) => () => {
      const updatedField = this.state[toUpdate];
      console.log('update');
      this.setModalVisible(true);
      
   }
   
   render() {
      const { user } = this.props;
      const { modalVisible, password } = this.state;
      return (
         <View style={styles.container}>
            <VerificationModal 
               modalVisible={modalVisible} 
               setModalVisible={this.setModalVisible}
               password={password}
               handleTextChange={this.handleTextChange}
            />
            <View style={styles.editContainer}>
               <Input
                  source={usernameImg}
                  textContentType="username"
                  onChangeText={this.handleTextChange('username')}                  
                  value={this.state.username}
                  /* editable={this.state.editUsername} */
                  containerStyle={styles.editInput}
               />
               <View style={styles.editIcon}>
                  <Icon.Button
                     name="pencil"
                     backgroundColor="#F01A30"
                     borderRadius={30}
                     iconStyle={{paddingLeft:10}}
                     onPress={this.handleUpdate('username')}
                  />
               </View> 
            </View>
            {/* <Button 
               title="UPDATE"
               color="#F04A58"
               onPress={this.handleUpdate}
            /> */}
         </View>
      )
   }
}

export default Settings