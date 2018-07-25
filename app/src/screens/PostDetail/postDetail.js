import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import CommentModal from '../../components/commentModal';

class PostDetail extends Component {

  state = {
    post: '',
    modalVisible: false,
  }
  setModalVisible = (visible) => this.setState({ modalVisible: visible });
  componentDidMount() {
    this.setState({
      post: this.props.navigation.getParam('post', null)
    });
  }
  render() {
    const {modalVisible} = this.state;
    return (
      <View style={{backgroundColor: '#efefef'}}>
        <CommentModal
            modalVisible={modalVisible}
            setModalVisible={this.setModalVisible}
          />
        <View style={{borderBottomColor: 'gray', borderBottomWidth: 1, marginBottom: 10, marginHorizontal: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.post.title}</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={{fontSize: 14, color: 'gray'}}>by Placeholder</Text>
            <Text style={{fontSize: 10, color: 'gray'}}>Date: {this.state.post.date}</Text>
          </View>
          <Text style={{marginVertical: 15}}>{this.state.post.content}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'gray', marginVertical: 10}}>Likes: {this.state.post.likes}</Text>
            <TouchableOpacity
              onPress={() => this.setModalVisible(true)}
              style={{height: 20, paddingRight: 5}}>
              <Text style={{fontSize: 14, color: 'gray'}}>Leave a comment...</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
        
        />
      </View>
    )
  }
}

export default PostDetail;