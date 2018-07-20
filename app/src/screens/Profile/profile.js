import React, { Component } from 'react';
import {
  View,
  Button,
  FlatList,
  Dimensions
} from 'react-native';
import { connect } from "react-redux";
import { Card, ProfileHeader } from "../../components";
import { getPosts } from '../../actions/user/posts';

const DEVICE_HEIGHT = Dimensions.get('window').height;

class Profile extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      height: DEVICE_HEIGHT * 0.2,
      backgroundColor: '#F04A58',
      alignContent: 'flex-start'
    },
    headerTitle: <ProfileHeader toSettings={() => navigation.push('Settings')}/>,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTintColor: '#fff',
  })

  componentDidMount() {
    if(this.props.posts.length === 0) {
      this.props.getPosts();
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
          renderItem={({ item }) => <Card {...item} onPress={() => this.props.navigation.navigate('Detail', {post: item})}/>}
          keyExtractor={(item) => item._id}
          refreshing={this.props.fetching}
          onRefresh={this.props.getPosts}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ auth, user }) => ({
  posts: user.posts.posts,
  fetching: user.posts.fetching
});
const mapDispatchToProps = dispatch => ({
  getPosts: () => {
    dispatch(getPosts());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);