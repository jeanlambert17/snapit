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
import { connect } from 'react-redux';
import { Input } from '../../components';
// import changeField from '../../api/changeField';
import { updateField } from '../../actions/fields';
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
   setModalVisible = (visible) => this.setState({ modalVisible: visible });
   handleUpdateButton = () => this.setState({ modalVisible: true });

   handleUpdate = async () => {
      const { username, email, name, password } = this.state;
      this.props.updateField({username,email,name,password});
      // const value = this.state[toUpdate];
      // try {
      //    const user = await changeField({ username, email, name, password });
      //    if(user) {
      //       this.props.setAuth(user);
      //    }
      //    this.setModalVisible(false);
      // } catch(err) {
      //    console.log(err);
      // }
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
               onPressAccept={this.handleUpdate}
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
                  {/* <Icon.Button
                     name="pencil"
                     backgroundColor="#F01A30"
                     borderRadius={30}
                     iconStyle={{paddingLeft:10}}
                     onPress={this.handleUpdate('username')}
                  /> */}                  
               </View> 
            </View>
            <View style={styles.editContainer}>
               <Input
                  source={usernameImg}
                  textContentType="name"
                  onChangeText={this.handleTextChange('name')}
                  value={this.state.name}
                  containerStyle={styles.editInput}
               />
            </View>
            <View style={styles.editContainer}>
               <Input
                  source={usernameImg}
                  textContentType="email"
                  onChangeText={this.handleTextChange('email')}
                  value={this.state.email}
                  containerStyle={styles.editInput}
               />
            </View>
            <Button
               title="UPDATE"
               color="#F04A58"
               onPress={this.handleUpdateButton}
            />
         </View>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   updateField: (form) => {
      dispatch(updateField(form));
   }
});
export default connect(null,mapDispatchToProps)(Settings)