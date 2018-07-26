import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import CommentModal from '../../components/commentModal';
import Comment from '../../components/comment';
import styles from './styles';
import { connect } from 'react-redux';
import { getComments } from '../../actions/comments';
import { postComments } from '../../reducers/comments';
import { likePost } from '../../actions/posts';

class PostDetail extends Component {

  state = {
    post: '',
    modalVisible: false,
  }
  setModalVisible = (visible) => this.setState({ modalVisible: visible });
  componentDidMount() {
    const post =  this.props.navigation.getParam('post', null)
    const isLoggedIn = this.props.navigation.getParam('isLoggedIn', null)
    this.setState({
      post: post,
      isLoggedIn: isLoggedIn
    });
    this.props.getComments(post._id);
  }
  render() {
    const { modalVisible } = this.state;
    const { fetching, comments } = this.props;
    return (
      <View style={styles.container}>
        <CommentModal
          id={this.state.post._id}
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
        />
        <View style={styles.details}>
          <Text style={styles.title}>
            {this.state.post.title}
          </Text>
          <View style={styles.subtitle}>            
            <Text style={styles.date}>
              Date: {this.state.post.date}
            </Text>
          </View>
          <Text style={styles.content}>
            {this.state.post.content}
          </Text>
          <View style={styles.info}>
            <Text style={styles.likesCount}>
              Likes: {this.state.post.likes}
            </Text>
            {(this.state.isLoggedIn) ? (
              <TouchableOpacity
                  onPress={() => this.setModalVisible(true)}
                  style={styles.commentButton}
                >
                <Text style={styles.commentText}>
                  Leave a comment...
                </Text>
              </TouchableOpacity>
            ):(<View/>)}              
          </View>
        </View>
        <FlatList
          data={comments}
          renderItem={({item}) => (
            <Comment {...item} isLoggedIn={this.state.isLoggedIn}/>
          )}
          keyExtractor={(item) => item._id}
          refreshing={fetching}
        />
      </View>
    );
  }
}

const mapStateToProps = ({comments}) => ({
  posts: comments.posts,
  fetching: comments.fetching,
  error: comments.error,
  errorMessage: comments.errorMessage,
  comments: postComments(comments),
  success: comments.getCommentsSuccess,
});

const mapDispatchToProps = dispatch => ({
  getComments: (id) => {
    dispatch(getComments(id))
  },
  likePost: id => {
    dispatch(likePost(id));
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(PostDetail)