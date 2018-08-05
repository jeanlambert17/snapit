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
import { getComments, refreshComments, deleteComment } from '../../actions/comments';
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
    this.setState({post: post });
    this.props.getComments(post._id);
  }
  
  render() {
    const { modalVisible } = this.state;
    const { fetching, comments, isLoggedIn } = this.props;
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
            {(isLoggedIn) ? (
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
            <Comment 
              {...item} 
              isLoggedIn={isLoggedIn} 
              onProfile={() => this.props.navigation.navigate('UserProfile', { user: item.user })}
              onDelete={() => this.props.deleteComment(this.state.post._id, item._id)}
            />
          )}
          keyExtractor={(item) => item._id}
          refreshing={fetching}
          onRefresh={() => this.props.refreshComments(this.state.post._id)}
        />
      </View>
    );
  }
}

const mapStateToProps = ({auth,comments}) => ({
  posts: comments.posts,
  fetching: comments.fetching,
  error: comments.error,
  errorMessage: comments.errorMessage,
  comments: postComments(comments),
  success: comments.getCommentsSuccess,
  isLoggedIn: auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  getComments: (id) => {
    dispatch(getComments(id))
  },
  likePost: id => {
    dispatch(likePost(id));
  },
  deleteComment: (postId,commentId) => {
    dispatch(deleteComment(postId,commentId))
  },
  refreshComments: id => {
    dispatch(refreshComments(id));
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(PostDetail)