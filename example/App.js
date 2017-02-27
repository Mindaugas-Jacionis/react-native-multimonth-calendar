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
          <Text style={styles.text}>Example App</Text>
          <Calendar
            monthsCount={8}
            marked={['2017-02-28', '2017-03-05', '2017-03-06', '2017-03-07']}
            unavailable={['2017-03-01', '2017-03-02']}
            selected={'2017-03-16'}
            onSelect={(date) => { alert('selected date is: ' + date); }}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      paddingTop: 40
    },

    text: {
      textAlign: 'center'
    }
  });

  AppRegistry.registerComponent('example', () => example);
}
