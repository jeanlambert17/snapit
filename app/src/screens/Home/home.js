import React, { Component } from 'react';
import { 
    Button, 
    View,
    Image,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native';
import styles from './styles';
import { getPosts } from '../../actions/posts';
import { connect } from 'react-redux';
import { Card } from '../../components';

class Home extends Component {

  static navigationOptions = {
      heigth: 0,
  };
  
  handlePress = route => () => {
      this.props.navigation.navigate(route);
  }
  
  componentDidMount() {
    console.log('didmount')
    this.props.getPosts();
  }
  renderFooter = () => {
    if (!this.props.fetching) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    const { posts } = this.props;
    return (
      <View style={styles.container}>
        {(!this.props.isLoggedIn) && (
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
        )}
        <FlatList
          data={posts}          
          renderItem={({item}) => <Card {...item} />}
          keyExtractor={(item,index) => item._id}
          onEndReached={this.props.getPosts}
          onEndReachedThreshold={0}
          itemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth, posts }) => ({
  isLoggedIn: auth.isLoggedIn,
  fetching: posts.fetching,
  error: posts.error,
  errorMessage: posts.errorMessage,
  posts: posts.posts,
});
const mapDispatchToProps = dispatch => ({
  getPosts: () => {
    dispatch(getPosts(2));
  },
})
export default connect(mapStateToProps,mapDispatchToProps)(Home)