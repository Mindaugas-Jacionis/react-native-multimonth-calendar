import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Calendar from 'react-native-multimonth-calendar';

export default function App() {

  class example extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text>Example App</Text>
          <Calendar
            monthsCount={8}
            marked={['2017-02-26', '2017-02-12']}
            unavailable={['2017-02-27']}
          />
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

  AppRegistry.registerComponent('example', () => example);
}
