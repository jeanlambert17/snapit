import React from 'react';
import {
   Modal,
   Button,
   View,
   Text,
   TextInput,
} from 'react-native';

import styles from './Styles/verificationModal';

const VerificationModal = ({password, modalVisible, setModalVisible, handleTextChange, onPress}) => (
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
            />
            <Button
               title="Accept"
               onPress={onPress}
               color="blue"
            />
            <Button
               title="cancel"
               onPress={() => setModalVisible(false)}
               color="red"
            />
         </View>
      </View>
   </Modal>
);

export default VerificationModal;