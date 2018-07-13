import React, { Component } from 'react';
import { 
    Button, 
    View,
    Image,
} from 'react-native';
import styles from './styles';
import IconMenu from '../../assets/icons/menu_black_18.png';

class Home extends Component {

    static navigationOptions = {
        heigth: 0,
        // drawerLabel: 'Home',
        // drawerIcon: ({ tintColor }) => (
        //     <Image
        //         source={IconMenu}
        //         style={[styles.icon, { tintColor: tintColor }]}
        //     />
        // ),
    };
    
    handlePress = route => () => {
        return this.props.navigation.push(route);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="GO TO LOGIN"
                    onPress={this.handlePress('Login')}
                ></Button>
                <Button
                    title="GO TO SIGN UP"
                    onPress={this.handlePress('SignUp')}
                ></Button>
            </View>
        );
    }
}
export default Home