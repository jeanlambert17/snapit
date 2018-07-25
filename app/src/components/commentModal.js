import React, { Component } from 'react';
import { 
  Modal, 
  StyleSheet, 
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import {Button, Card, Icon} from 'react-native-elements';

export default class commentModal extends Component{
  state={
    content: ''
  }

  handleClose= () => {
    this.props.setModalVisible(false);
  }
  render(){
    const {height, width} = Dimensions.get('window');
    return(
      <Modal
        transparent={true}
        animationType='fade'
        visible={this.props.modalVisible}
        onRequestClose={()=> this.handleClose()}>
        <Card containerStyle={{position: 'absolute', bottom: 5, backgroundColor: '#f2f2f2', width: width}}>
          <Text style={{fontSize: 12}}>You are about to leave a comment</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
                maxLength={300}
                onChangeText={(text)=> this.setState({content: text})}
                style={{flex:0.9}}
              />
            <View style={{flex: 0.1, marginRight: 5}}>
              <TouchableOpacity
                  //onPress={() => this.handleClose()}
                  >
                  <Icon name='comment'
                    type='octicon'
                    color='blue'
                    
                    size={25}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.handleClose()}>
                    <Icon name='cancel'
                      color='red'
                      size={25}/>
                  </TouchableOpacity>
            </View>
          </View>
        </Card>
      </Modal>
    )
  }
}