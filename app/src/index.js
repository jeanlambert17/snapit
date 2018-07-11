import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Routes, { createRootNavigator } from './routes';
import { connect } from 'react-redux';

class Main extends React.Component {

   render() {
      // const Layout = createRootNavigator(this.props.user);

      return (
      <View style={styles.container}>            
         {/* {(!this.props.fetching) ? (
               <Layout />
         ) : (
            <Text>fetching</Text>
         )} */}
         <Routes />
      </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
});
// const mapStateToProps = ({auth}) => ({
//    user: auth.user,
//    fetching: auth.fetching,
// })
// connect(mapStateToProps)(Main)

export default Main