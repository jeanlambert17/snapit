import React, { Component } from 'react';
import {
  View,
  Button,
  FlatList,
} from 'react-native';
import { connect } from "react-redux";
import Card from "../../components/card";
import { getPosts } from '../../actions/user/posts';

class Profile extends Component {

  componentDidMount() {
    if(this.props.posts.length === 0) {
      this.props.getPosts();
    }
  }
  goToSettings = () => this.props.navigation.navigate('Settings');
  render() {
    const { posts } = this.props;
    return (
      <View style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Button 
          title="settings"
          onPress={this.goToSettings}
        />
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