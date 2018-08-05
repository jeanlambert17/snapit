import React, { Component } from 'react';
import {
  View,
  FlatList,
  Button,
  Text
} from 'react-native';
import {
  SearchBar, 
} from 'react-native-elements';
import {
  Card
} from '../../components'
import { searchPosts } from '../../actions/search';
import { connect } from 'react-redux';
import Handler from '../../utils/handler';

class Search extends Component {

  state = {
    search: '',
    handler: new Handler()
  }

  componentDidUpdate(prevProps) {
    if (this.props.error && !prevProps.error) {
      this.state.handler.errorMessage(this.props.errorMessage)
    }
  }

  handleChangeText = search => this.setState({ search });

  render() {
    const { posts } = this.props;
    return (
      <View style={{marginTop:22}}>
        <SearchBar
          clearIcon={{ color: 'red' }}
          searchIcon={false} // You could have passed `null` too
          onChangeText={this.handleChangeText}
          onClear={() => this.setState({ search: '' })}
          placeholder='Type Here...' 
        />
        <Button
          title="search"
          onPress={() => this.props.searchPosts(this.state.search)}
        />
        <FlatList
          data={posts}
          renderItem={({ item }) =>
            <Card
              {...item}
              onDetails={() => this.props.navigation.navigate('Detail', { post: item })}
              onProfile={() => this.props.navigation.navigate('UserProfile', { user: item.user })}
              likes={false}
              isLoggedIn={false}
            />
          }
          keyExtractor={(item) => item._id}
          refreshing={this.props.fetching}
        />
      </View>
    );
  }
}


{/* <View>
              <Text>
                {item.content}
              </Text>
            </View> */}
const mapStateToProps = ({search, auth}) => ({
  isLoggedIn: auth.isLoggedIn,
  posts: search.data,
  fetching: search.fetching,
  error: search.error,
  errorMessage: search.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  searchPosts: tag => {
    dispatch(searchPosts(tag))
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Search)