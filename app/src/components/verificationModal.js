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
    onRequestClose={() => setModalVisible(false)}>
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={{paddingHorizontal: 15}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Password verification</Text>
          <TextInput
            value={password}
            style={styles.input}
            onChangeText={handleTextChange('password')}
            underlineColorAndroid='#F04A58'
            style={{paddingBottom: 10}}
            containerViewStyle={{paddingHorizontal: 10}}
          />
        </View>
        <Button
          title="Accept"
          onPress={onPressAccept}
          disabled={password === '' ? true : false}
          backgroundColor='#F04A58'
          containerViewStyle={{paddingVertical: 10}}
          borderRadius={5}
        />
        <Button
          title="cancel"
          onPress={() => setModalVisible(false)}
          containerViewStyle={{paddingVertical: 5}}
          borderRadius={5}           
        />
      </View>
    </View>
  </Modal>
);

export default VerificationModal;