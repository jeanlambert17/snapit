import React, { Component } from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   TouchableHighlight,
   Button,
   Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { updateField } from '../../actions/fields';
import usernameImg from '../../assets/images/username.png';
// import passwordImg from '../../assets/images/password.png';
// import emailImg from '../../assets/images/email-outline.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Header } from '../../components';
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
         <View >            
            {/* <Header navigation={this.props.navigation} /> */}
            <VerificationModal 
               modalVisible={modalVisible} 
               setModalVisible={this.setModalVisible}
               password={password}
               handleTextChange={this.handleTextChange}
               onPressAccept={this.handleUpdate}
            />
            
            <View>
               <View style={styles.editContainer}>
                  <Input
                     source={usernameImg}
                     textContentType="username"
                     onChangeText={this.handleTextChange('username')}                  
                     value={this.state.username}
                     containerStyle={styles.editInput}
                  />
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
         </View>
      )
   }
}

const mapStateToProps = ({auth}) => ({
   user: auth.user,
});
const mapDispatchToProps = dispatch => ({
   updateField: (form) => {
      dispatch(updateField(form));
   }
});
export default connect(mapStateToProps,mapDispatchToProps)(Settings)