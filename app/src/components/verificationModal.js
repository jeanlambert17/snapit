import React from 'react';
import {
   Modal,
   View,
   Text,
   TextInput,
} from 'react-native';
import {Button, Card} from 'react-native-elements';
import styles from './Styles/verificationModal';

const VerificationModal = ({ password, modalVisible, setModalVisible, handleTextChange, onPressAccept}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        alert('Modal has been closed.');
    }}>
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text>Password verification</Text>
        <TextInput
          value={password}
          style={styles.input}
          onChangeText={handleTextChange('password')}
          underlineColorAndroid='#F04A58'
        />
        <Button
          title="Accept"
          onPress={onPressAccept}
          disabled={password === '' ? true : false}
          backgroundColor='gray'
          containerViewStyle={{paddingVertical: 10}}
          borderRadius={4}
        />
        <Button
          title="cancel"
          onPress={() => setModalVisible(false)}
          backgroundColor='red'
          containerViewStyle={{paddingVertical: 10}}
          borderRadius={4}           
        />
      </View>
    </View>
  </Modal>
);

export default VerificationModal;