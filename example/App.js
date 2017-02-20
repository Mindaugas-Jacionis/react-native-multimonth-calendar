import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Calendar from 'react-native-multimonth-calendar';

export default function App() {

  class DefaultProject extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Calendar monthsCount={5} unavailable={['2017-02-01']} />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    }
  });

  AppRegistry.registerComponent('DefaultProject', () => DefaultProject);
}
