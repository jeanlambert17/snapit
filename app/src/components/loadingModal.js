import React from 'react';
import {
  Modal,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './Styles/loadingModal';

const LoadingModal = ({ fetching }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={fetching}
    onRequestClose={() => {
      alert('Modal has been closed.');
    }}>
    <View style={styles.container}>
      <ActivityIndicator 
        size="large"
        color="#F04A58"
      />
    </View>
  </Modal>
);

LoadingModal.propTypes = {
  fetching: PropTypes.bool,
}

export default LoadingModal;