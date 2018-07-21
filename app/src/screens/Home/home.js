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
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Home extends PureComponent {

  static navigationOptions = ({navigation, ...props}) => {
    return {
      headerLeft: props.isLoggedIn ? (
        <MaterialCommunityIcons.Button
          onPress={() => navigation.openDrawer()}
          name="menu"
          size={20}
        />
      ) : null
    }
  }

  componentDidMount() {    
    if (this.props.posts.length === 0) {
      this.props.fetchPosts();
    }
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
        { !isLoggedIn && (<Button title="Login" onPress={() => this.props.navigation.navigate('Login')}/>)}
        <FlatList
          data={posts}          
          renderItem={({item}) => <Card {...item} onPress={() => this.props.navigation.navigate('Detail', { post: item })}/>}
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