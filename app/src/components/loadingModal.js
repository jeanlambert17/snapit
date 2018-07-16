import React from 'react';
import {
  Modal,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.2)",
  },
})

export default LoadingModal;