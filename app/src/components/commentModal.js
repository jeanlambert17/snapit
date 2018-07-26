import React, { Component } from 'react';
import { 
  Modal, 
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import styles from './Styles/commentModal';

import { connect } from 'react-redux';
import { addComment } from '../actions/comments';

class CommentModal extends Component {

  state = {
    content: ''
  }
  componentDidUpdate(prevProps) {
    const { success, error, errorMessage } = this.props;
    if(success && !prevProps.success) {
      // Handle success
      this.handleClose();
    } 
    if(error && !prevProps.error) {
      // Handle error
      console.log(errorMessage);
    }
  }
  handleClose = () => this.props.setModalVisible(false);
  handleComment = () => {
    const { id } = this.props;
    const content = this.state.content;
    this.props.addComment(id, {
      content,
      postId: id,
    })
  }

  render() {
    return (
      <Modal
        transparent={true}
        animationType='fade'
        visible={this.props.modalVisible}
        onRequestClose={()=> this.handleClose()}
      >
        <Card containerStyle={styles.containerStyle}>
          <Text style={styles.commentText}> 
            You are about to leave a comment
          </Text>
          <View style={styles.container}>
            <TextInput
              maxLength={300}
              onChangeText={(text)=> this.setState({content: text})}
              style={styles.textInput}
            />
            <View style={styles.options}>
              <TouchableOpacity
                onPress={this.handleComment}
              >
              <Icon 
                name='comment'
                type='octicon'
                color='blue'                    
                size={25}
              />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleClose()}
              >
              <Icon 
                name='cancel'
                color='red'
                size={25}
              />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </Modal>
    );
  }
}

const mapStateToProps = ({ comments }) => ({
  fetching: comments.fetching,
  error: comments.error,
  errorMessage: comments.errorMessage,
  posts: comments.posts,
  success: comments.addCommentSuccess,
});

const mapDispatchToProps = dispatch => ({
  addComment: (id,form) => {
    dispatch(addComment(id,form));
  }
})


export default connect(mapStateToProps,mapDispatchToProps)(CommentModal)