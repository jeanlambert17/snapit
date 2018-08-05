import React, { Component } from 'react';
import {
  View,
  FlatList,
  Dimensions
} from 'react-native';
import { connect } from "react-redux";
import { Card, ProfileHeader } from "../../components";
import { userPosts, fakeLike } from '../../actions/users';

const DEVICE_HEIGHT = Dimensions.get('window').height;

class UsersProfile extends Component {
  state = {
    user: null,
  }
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      height: DEVICE_HEIGHT * 0.2,
      backgroundColor: '#F04A58',
      alignContent: 'flex-start'
    },
    headerTitle: <ProfileHeader isOwnProfile={false} user={navigation.getParam('user', null)}/>,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTintColor: '#fff',
  });

  componentDidMount() {
    const user = this.props.navigation.getParam('user', null);
    this.setState({
      user: user,
    });
    this.props.userPosts(user._id);
  }
  render() {
    const { posts } = this.props;
    return (
      <View style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <FlatList
          data={posts}
          renderItem={({ item }) => 
            <Card 
              {...item} 
              onDetails={() => this.props.navigation.navigate('Detail', {post: item})}
              onLike={() => this.props.fakeLike(item._id)}
              isLoggedIn={this.props.isLoggedIn}
            />
          }
          keyExtractor={(item) => item._id}
          refreshing={this.props.fetching}
          onRefresh={this.props.getPosts}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ users, auth }) => ({
  isLoggedIn: auth.isLoggedIn,
  posts: users.data,
  fetching: users.fetching,
  error: users.error,
  errorMessage: users.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  userPosts: id => {
    dispatch(userPosts(id));
  },
  fakeLike: id => {
    dispatch(fakeLike(id))
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(UsersProfile);