import React, { Component } from 'react';
import ReactNative from 'react-native';
import * as firebase from 'firebase';
const StatusBar = require('./components/StatusBar.js');
const ActionButton = require('./components/ActionButton.js');
const ListItem = require('./components/ListItem.js');
const styles = require('./styles.js');

const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = ReactNative;

// Initialize firebase
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseUrl: '',
  storageBucket: ''
}
const firebaseApp = firebase.initializeApp(firebaseConfig);

class GroceryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([ { title: 'Pizza' } ])
    });
  }

  _renderItem(item) {
    return (
      <ListItem item={item} onpress="" />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List" />
        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} style={styles.listview} />
        <ActionButton title="Add" onpress="" />
      </View>
    );
  }
}

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
