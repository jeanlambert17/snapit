import React, { PureComponent } from 'react';
import { 
    Button, 
    View,
    Image,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native';
import styles from './styles';
import { getPosts, fetchPosts } from '../../actions/posts';
import { connect } from 'react-redux';
import { Card } from '../../components';

class Home extends PureComponent {

  componentDidMount() {    
    this.props.fetchPosts()
  }
  handlePress = route => () => {
    this.props.navigation.navigate(route);
  }
  moreItems = () => {
    const { isEmpty, getPosts } = this.props;
    if(!isEmpty)
      getPosts();
  }
  renderFooter = () => {
    if(!this.props.isEmpty)
      return null
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE",
          }}
        >
          <Text> Has no more elements </Text>
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
  }
  render() {
    const { isLoggedIn, posts, error, errorMessage } = this.props;
    if(error) console.log(errorMessage)
    return (
      <View style={styles.container}>
        { !isLoggedIn && (<Button title="Login" onPress={this.handlePress('Login')}/>)}
        <FlatList
          data={posts}          
          renderItem={({item}) => <Card {...item} />}
          keyExtractor={(item) => item._id}
          onEndReached={this.moreItems}
          onEndReachedThreshold={0.1}
          itemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          refreshing={this.props.fetching}
          onRefresh={this.props.fetchPosts}
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
  posts: posts.currentPosts,
  isEmpty: posts.isEmpty,
});
const mapDispatchToProps = dispatch => ({
  getPosts: () => {
    dispatch(getPosts());
  },
  fetchPosts: () => {
    dispatch(fetchPosts());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Home)