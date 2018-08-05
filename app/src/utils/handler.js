import {
  ToastAndroid
} from 'react-native';

class Handler {
  errorMessage = (errorMessage) => ToastAndroid.showWithGravity(errorMessage, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
}

export default Handler;
