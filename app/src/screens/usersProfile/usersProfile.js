import React, { Component } from 'react';
import {
  View,
  FlatList,
  Dimensions
} from 'react-native';
import { connect } from "react-redux";
import { Card, ProfileHeader } from "../../components";
import { getPosts, likePost } from '../../actions/user/posts';

const DEVICE_HEIGHT = Dimensions.get('window').height;

class UsersProfile extends Component {
  static navigationOptions = ({ navigation}) => ({
    headerStyle: {
      height: DEVICE_HEIGHT * 0.2,
      backgroundColor: '#F04A58',
      alignContent: 'flex-start'
    },
    headerTitle: <ProfileHeader isOwnProfile={false} data={navigation.getParam('data', null)}/>,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTintColor: '#fff',
  })
  componentDidMount() {
    if(this.props.posts.length === 0) {
      //Gotta change this
      //this.props.getPosts();
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.error && !prevProps.error) {
      // Handle error
      console.log(this.props.errorMessage);
    }
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
              onLike={() => this.props.likePost(item._id)}
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

const mapStateToProps = ({ user, auth }) => ({
  //Posts variable has to be changed
  isLoggedIn: auth.isLoggedIn,
  posts: user.posts.posts,
  fetching: user.posts.fetching,
  error: user.posts.error,
  errorMessage: user.posts.errorMessage,
});

//Crear una funcion que traiga los posts de un usuario
const mapDispatchToProps = dispatch => ({
  //no need for this function
  getPosts: () => {
    dispatch(getPosts());
  },
  likePost: id => {
    dispatch(likePost(id))
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(UsersProfile);