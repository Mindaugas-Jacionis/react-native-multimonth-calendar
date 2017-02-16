import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';
import moment from 'moment';
import _ from 'underscore';

class Calendar extends Component {
  static propTypes = {
    startDate: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
    unavailable: PropTypes.array,
    selected: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
    headerStyle: PropTypes.object,
    monthsCount: PropTypes.number,
    weekHeadings: PropTypes.array,
    monthNames: PropTypes.array
  };

  static defaultProps = {
    startDate: moment(),
    unavailable: [],
    selected: moment(),
    headerStyle: {},
    monthsCount: 3,
    weekHeadings: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  constructor(props) {
    super(props);
  }

  renderHeader() {
    const { weekHeadings, headerStyle } = this.props;
    const headings = _.map(weekHeadings , (heading) => {
      return (
        <View style={styles.default}>
          <Text style={headerStyle}>{heading}</Text>
        </View>
      );
    });

    return (
      <View style={[styles.row, headerStyle]}>
        {headings}
      </View>
    );
  }

  renderCalendars() {
    const { startDate, unavailable, selected, headerStyle, monthsCount } = this.props;
    let calendars = [];

    for (let i = 0; i < monthsCount; i++) {
      let monthToRender = moment(startDate).add(i, 'month');
      let month = this.renderMonth(monthToRender);

      calendars = _.union(calendars, [month])
    }

    return calendars;
  }

  renderMonth(date) {
    const { monthNames } = this.props;
    const year = date.year();
    const currentMonth = monthNames[date.month()];
    const monthDaysCount = date.daysInMonth();
    const monthStartOffset = (date.startOf('month').day() || 7) - 1
    const monthEndOffset = 7 - date.endOf('month').day();
    // const weeksCount = (monthDaysCount + monthStartOffset + monthEndOffset)/7;
    let month = this.renderWeeks(date);

    return (
      <View>
        <Text style={styles.default}>{`${currentMonth} ${year}`}</Text>
        <View>
          {month}
        </View>
      </View>
    );
  }

  renderWeeks(date) {
    const monthDaysCount = date.daysInMonth();
    let weeks = [];
    let days = [];

    console.log('Maybe it is const', monthDaysCount);
    for (let i = 1; i <= monthDaysCount; i++) {
      console.log('loop', i, monthDaysCount);
      if (Number(date.date(i).day()) === 1 && i < monthDaysCount) {
        const day = this.renderDay(i, date);
        const daysOfWeek = days.length !== 7 ? this.fillInWeek(days, 'unshift') : days;
        const weekRow = <View style={styles.row}>{daysOfWeek}</View>;
        weeks = _.union(weeks, [weekRow]);
        days = _.union([], [day]);
      } else if (i === monthDaysCount) {
        const day = this.renderDay(i, date);
        days = _.union(days, [day]);
        const daysOfWeek = days.length !== 7 ? this.fillInWeek(days, 'push') : days;
        const weekRow = <View style={styles.row}>{daysOfWeek}</View>;
        weeks = _.union(weeks, [weekRow]);
      } else {
        let day = this.renderDay(i, date);
        days = _.union(days, [day]);
      }
      console.log('end of cicle', weeks, days);
    }

    return weeks;
  }

  renderDay(dayNumber, date) {
    return (
      <TouchableOpacity style={styles.default} onPress={() => this.props.onSelect(date.date(dayNumber).toDate())}>
        <Text>
          {dayNumber}
        </Text>
      </TouchableOpacity>
    );
  }

  fillInWeek(days, method) {
    console.log('method', method, days);
    let week = days;
    while (week.length !== 7) {
      week[method](<View style={styles.default} />);
    }

    return week;
  }

  render() {
    const { startDate, unavailable, selected, headerStyle, monthsCount } = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          {this.renderCalendars()}
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  default:{
    flex: 1,
    backgroundColor: 'transparent',
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
    borderColor: 'green',
    borderWidth: 1
  },

  row: {
    flexDirection: 'row',
  }
});

export default Calendar;
