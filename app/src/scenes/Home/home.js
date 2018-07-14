import React, { Component } from 'react';
import { 
    Button, 
    View,
    Image,
} from 'react-native';
import styles from './styles';

import { connect } from 'react-redux';

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
        return this.props.navigation.navigate(route);
    }
    

    render() {
        return (
            <View style={styles.container}>
                {(!this.props.isLoggedIn) ? (
                    <View>
                        <Button
                            title="GO TO LOGIN"
                            onPress={this.handlePress('Login')}
                        ></Button>
                        <Button
                            title="GO TO SIGN UP"
                            onPress={this.handlePress('SignUp')}
                        ></Button>
                    </View>
                ) : (
                    <Button
                        title="GO TO PROFILE"
                        onPress={this.handlePress('Profile')}
                    />
                )}
            </View>
        );
    }
}

const mapStateToProps = ({auth}) => ({
    isLoggedIn: auth.isLoggedIn,
}
)
export default connect(mapStateToProps)(Home)