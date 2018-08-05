import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Card, Icon, Avatar } from 'react-native-elements';

const Comment = ({onDelete, onProfile, ...props}) => (
  <Card containerStyle={{marginBottom: 3}}>
    <View style={{justifyContent :'space-between', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F04A58'}}>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Avatar
          rounded
          source= {{uri: `${props.user.photoUrl}`}}
          containerStyle={{ marginRight: 10}}/>
        <View>
          <TouchableOpacity 
            onPress={onProfile}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{props.user.username}</Text>
          </TouchableOpacity>
          <Text style={{color: 'gray', fontSize: 12}}>{props.date}</Text>
        </View>
      </View>
      {(props.isUserComment) ? (
          <View>
            <TouchableOpacity
              onPress={onDelete}
            >
              <Icon name='more-vert'
                color='#F04A58'/>
            </TouchableOpacity>
          </View>
      ) : (
        <View></View>
      )}
    </View>
    <Text style={{marginLeft: 5, marginTop: 5}}>{props.content}</Text>
  </Card>
);

export default Comment