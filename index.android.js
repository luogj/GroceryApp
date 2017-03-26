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
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = ReactNative;

// Initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUjnbQxkD54npLx_NAQLS89HhvlNVuo4c",
  authDomain: "groceryapp-6f679.firebaseapp.com",
  databaseURL: "https://groceryapp-6f679.firebaseio.com",
  storageBucket: "groceryapp-6f679.appspot.com",
  messagingSenderId: "7162345735"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);

class GroceryApp extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebaseApp.database().ref();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  addItem() {
    this.itemsRef.push({ title: this.state.addItemTitle });
    this.setState({ addItemTitle: null });
  }

  renderItem(item) {
    return (
      <ListItem item={item} onPress="" />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List" />
        <View style={styles.addItemForm}>
          <TextInput
            style={styles.addItemField}
            placeholder="New Item..."
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ addItemTitle : text })}
            value={this.state.addItemTitle}
          />
          <ActionButton title="Add" onPress={this.addItem.bind(this)}/>
        </View>
        <ListView dataSource={this.state.dataSource} renderRow={this.renderItem.bind(this)} style={styles.listview} />
      </View>
    );
  }
}

AppRegistry.registerComponent('GroceryApp', () => GroceryApp);
