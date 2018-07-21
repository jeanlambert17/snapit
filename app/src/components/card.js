import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  Image 
} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { API_URL } from '../helpers/configs';
import { connect } from 'react-redux';

const _Card = ({onPress, ...props}) => (
    <Card
      title={props.title}
      image={{uri:`${API_URL}/${props.imageUrl}`}}
      style={{width: 50, height: 50}}
    >
    <Button 
      title="See comments"
      onPress={onPress}
    />
    </Card>
);


export default connect(mapStateToProps)(_Card)