import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity
} from 'react-native'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import { API_URL } from '../helpers/configs';
// import { connect } from 'react-redux';

const _Card = ({onPress, ...props}) => (
    <Card
      style={{width: 50, height: 50}}>
      <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#dbdbdb'}}>
        <Avatar
          small
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}} 
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={{marginRight: 10}} />
        <View style={{marginVertical: 2}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>
          <Text style={{fontSize: 12, color: 'gray'}}>by {props.user}</Text>
        </View>
      </View>
      <Image 
        source={{uri:`${API_URL}/${props.imageUrl}`}}
        style={{width: 300, height: 150, justifyContent:'center', marginTop: 5  }}/>
      <View style={{marginVertical: 8}}>
        <View style={{flexDirection:'row', marginVertical: 3}}>
          <TouchableOpacity
            /*onPress={}*/
              style={{paddingRight:15}}>
            <Icon name='thumbsup'
              type='octicon' 
              size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            /*onPress={}*/>
            <Icon name='thumbsdown'
              type='octicon'/>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 5}}>
          <TouchableOpacity>
            <Text style={{fontSize: 14, fontWeight: "bold"}}>{props.user}</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 12, color:'#474747', marginBottom: 10, marginLeft: 10}}>{props.content}</Text>
          <TouchableOpacity>
            <Text style={{color:'gray'}}>See comments</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
);


export default _Card