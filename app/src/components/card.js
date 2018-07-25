import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity
} from 'react-native'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import { API_URL } from '../helpers/configs';
import CommentModal from '../components/commentModal';

export default class _Card extends React.Component{
  
    state={
      modalVisible: false,
      post: {}
    }

    setModalVisible = (visible) => this.setState({ modalVisible: visible });

  render(){
    const {modalVisible} = this.state;
    return(
      <Card
      style={{width: 50, height: 50}}>
      <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F04A58'}}>
        <CommentModal
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
        />

        <View style={{marginVertical: 2}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10}}>{this.props.post.title}</Text>
        </View>
      </View>
      <Image 
        source={{uri:this.props.post.imageUrl}}
        style={{width: 300, height: 150, justifyContent:'center', marginTop: 5  }}/>
      <View style={{marginVertical: 8}}>
        <View style={{flexDirection:'row', marginVertical: 3}}>
          <TouchableOpacity
            /*onPress={}*/
              style={{paddingRight:15}}>
            <Icon name='md-heart-outline'
              type='ionicon' 
              size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setModalVisible(true)}>
            <Icon name='comments-o'
              type='font-awesome'/>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 5}}>
          <TouchableOpacity>
            <Text style={{fontSize: 14, fontWeight: "bold"}}>{this.props.post.user.username}</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 12, color:'#474747', marginBottom: 10, marginLeft: 10}}>{this.props.post.content}</Text>
          <TouchableOpacity
            onPress={()=> this.props.test.navigate('Detail', {post: this.props.post})}>
            <Text style={{color:'gray'}}>See comments</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
    )
  }
}
