import React, { Component } from 'react';
import {
   StatusBar,
   View,
   Text,
   Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import Settings from './settings';
import styles from './Styles/profile';
import { setAuth } from '../../actions/auth';
import { API_URL } from '../../helpers/configs';

// NEW 
import { createBottomTabNavigator } from 'react-navigation';

export default createBottomTabNavigator(
   {
      Settings: Settings,
   }, {
      initialRouteName: 'Settings',
   }
)

// class Profile extends Component {
//    state = {
//       body: 'settings',
//    }

//    changeBody = (body) => this.setState({ body: body })
//    // renderBody() {
//    //    switch(this.state.body) {
//    //       case 'settings': {
//    //          return <Settings setAuth={this.props.setAuth} user={this.props.user}/>
//    //       }
//    //       default: {
//    //          return 
//    //       }
//    //    }
//    // }

//    render() {
//       const { user } = this.props;
      
//       return (
//          <View>
//             <StatusBar 
//                backgroundColor="#F04A58" 
//                barStyle="light-content" 
//             />
//             <Image
//                style={{ width: 50, height: 50 }}
//                source={{ uri: `${API_URL}/${user.photoUrl}` }}
//             />
//             <View style={styles.header}>
//                <Icon.Button name="menu" size={30} backgroundColor="transparent"/>
//                <Text style={styles.text}> {user.name} </Text>
//             </View>
//             <Settings setAuth={this.props.setAuth} user={this.props.user} />
//          </View>
//       )
//    }
// }

// const mapStateToProps = ({auth}) => ({
//    user: auth.user
// });

// const mapDispatchToProps = dispatch => ({
//    setAuth: (user) => {
//       dispatch(setAuth(user));
//    } 
// })

// export default connect(mapStateToProps,mapDispatchToProps)(Profile);

