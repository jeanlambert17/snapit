import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  Image 
} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { API_URL } from '../helpers/configs';

const _Card = (props) => (
    <Card
      title={props.title}
      image={{uri:`${API_URL}/${props.imageUrl}`}}
      style={{width: 50, height: 50}}
    >
    </Card>
);

export default _Card;