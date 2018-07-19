import React, { Component } from 'react';
import {
   View,
   StyleSheet,
   ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { setAuth } from '../../actions/auth';

import Authenticate from '../../api/auth';


class Loading extends Component {
  constructor(props) {
    super(props);

    this.isAuth();
  }

  isAuth = async () => {
    const {setAuth, navigation} = this.props;
    const data = await Authenticate();
    if(data) {
        setAuth(data);
        navigation.navigate('UserStack');
    } else {
        navigation.navigate('InvitedStack');
    }
  }

   render() {

    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#F04A58"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});
const mapDispatchToProps = dispatch => ({
  setAuth: data => {
    dispatch(setAuth(data));
  },
});

export default connect(null,mapDispatchToProps)(Loading);