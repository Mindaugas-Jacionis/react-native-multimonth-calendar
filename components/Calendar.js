//reference https://github.com/Mindaugas-Jacionis/react-native-calendar

import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, TouchableHighlight StyleSheet, PixelRatio } from 'react-native';
import moment from 'moment';

class Calendar extends Component {
  static propTypes = {
    startTime: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
    unavailable: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
    selected: PropTypes.string,
    headerStyle: PropTypes.object,
    monthsCount: PropTypes.number
  };

  static defaultProps = {
    startTime: moment(),
    unavailable: [],
    selected: moment(),
    headerStyle {},
    monthsCount: 3
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Here will be my Calendar component</Text>
      </ScrollView>
    );
  }
}


var Calendar = React.createClass({

  render: function() {
    var date = this.state.startTime;
    var num = this.state.num;
    var holiday = this.state.holiday;
    var check = this.state.check;
    var headerStyle = this.state.headerStyle;

    var items = [];
    var dateNow = new Date();

    for(var n = 0; n < num; n++){
      /*循环完成一个月*/
      var rows = [];
      var newDate = new Date(date.getFullYear(), date.getMonth() + 1 + n, 0); //天数
      var week = new Date(date.getFullYear(), date.getMonth() + n, 1).getDay(); //月份开始的星期

      if(week === 0){
        week = 7;
      }
      var counts = newDate.getDate();
      var rowCounts = Math.ceil((counts + week - 1) / 7); //本月行数
      for(var i = 0; i < rowCounts; i++){
        var days = [];
        for(var j = (i * 7) + 1; j < ((i+1) * 7) + 1; j++){
          //根据每个月开始的［星期］往后推
          var dayNum = j - week + 1;
          if(dayNum > 0 && j < counts + week){
            //如果当前日期小于今天，则变灰
            var dateObj = new Date(date.getFullYear(), date.getMonth() + n, dayNum);
            var dateStr = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dayNum;
            var grayStyle = {};
            var bk = {};
            if(dateNow >= new Date(date.getFullYear(), date.getMonth() + n, dayNum + 1)){
              grayStyle = {
                color:'#ccc'
              };
            }
            if(holiday[dateStr]){
              dayNum = holiday[dateStr];
            }
            if(check[dateStr]){
              bk = {
                backgroundColor: '#1EB7FF',
                width:46,
                height:35,
                alignItems: 'center',
                justifyContent: 'center'
              };
              grayStyle = {
                color:'#fff'
              };
            }
            days.push(
              <TouchableHighlight style={[styles.flex_1]} underlayColor="#fff" onPress={this.props.touchEvent?this.props.touchEvent.bind(this, dateStr):null}>
                <View style={bk}>
                  <Text style={grayStyle}>{dayNum}</Text>
                </View>
              </TouchableHighlight>
            );
          }else{
            days.push(
              <View style={[styles.flex_1]}>
                <Text></Text>
              </View>
            );
          }

        }
        rows.push(
          <View style={styles.row}>{days}</View>
        );
      }
      items.push(
        <View style={[styles.cm_bottom]}>
          <View style={styles.month}>
            <Text style={styles.month_text}>{newDate.getFullYear()}年{newDate.getMonth() + 1}月</Text>
          </View>
          {rows}
        </View>
      );

    }

    return (
        <View style={styles.calendar_container}>

          <View style={[styles.row, styles.row_header, this.props.headerStyle]}>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>一</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>二</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>三</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>四</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={this.props.headerStyle}>五</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={[styles.week_highlight,  this.props.headerStyle]}>六</Text>
            </View>
            <View style={[styles.flex_1]}>
              <Text style={[styles.week_highlight,  this.props.headerStyle]}>日</Text>
            </View>
          </View>

          <ScrollView style={{flex:1,}}>

            {items}

          </ScrollView>

        </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  flex_1:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

  calendar_container:{
    backgroundColor:'#fff',
    flex:1,
    borderTopWidth:1/PixelRatio.get(),
    borderBottomWidth:1/PixelRatio.get(),
    borderColor:'#ccc'
  },

  row_header:{
    backgroundColor:'#F5F5F5',
    borderBottomWidth:1/PixelRatio.get(),
    borderBottomColor:'#ccc',
  },

  row:{
    flexDirection:'row',
    height:35,
  },

  month:{
    alignItems:'center',
    justifyContent:'center',
    height:40,
  },

  month_text:{
    fontSize:18,
    fontWeight:'400',
  },

  week_highlight:{
    color:'#23B8FC'
  },

  cm_bottom:{
    borderBottomWidth:1/PixelRatio.get(),
    borderBottomColor:'#ccc',
  }
});

export default Calendar;
