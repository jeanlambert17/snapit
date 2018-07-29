import React, { Component } from 'react';
import { 
  Modal, 
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Card, Icon, Avatar } from 'react-native-elements';

export default class comment extends Component{

 
  render(){
    console.log(this.props)
    return(
      <Card containerStyle={{marginBottom: 3}}>
        <View style={{justifyContent :'space-between', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F04A58'}}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Avatar
              rounded
              source= {{uri: `${this.props.user.photoUrl}`}}
              containerStyle={{ marginRight: 10}}/>
            <View>
              <TouchableOpacity >
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{this.props.user.username}</Text>
              </TouchableOpacity>
              <Text style={{color: 'gray', fontSize: 12}}>{this.props.date}</Text>
            </View>
          </View>
          {(this.props.isUserComment && this.props.isLoggedIn) ? (
              <View>
                <TouchableOpacity>
                  <Icon name='more-vert'
                    color='#F04A58'/>
                </TouchableOpacity>
              </View>
          ) : (
            <View></View>
          )}
        </View>
        <Text style={{marginLeft: 5, marginTop: 5}}>{this.props.content}</Text>
      </Card>
    )

  }
}