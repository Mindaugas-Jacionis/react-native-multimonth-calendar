import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, TouchableOpacity StyleSheet, PixelRatio } from 'react-native';
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
    headerStyle {},
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
        <View style={styles.row}>
          <Text style={headerStyle}>{heading}</Text>
        </View>
      );
    });

    return (
      <View style={[styles.header, headerStyle]}>
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
        <Text>{`${currentMonth} ${year}`}</Text>
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

    for (let i = 1; i <= monthDaysCount; i++) {
      if (Number(date.date(i).day()) === 1) {
        const method = i < 7 ? 'unshift' : 'concat';
        const day = this.renderDay(i);
        const daysOfWeek = days.length !== 7 ? this.fillInWeek(days) : days;
        const weekRow = <View style={styles.row}>{daysOfWeek}</View>;
        weeks = _.union(weeks, [weekRow]);
        days = _.union([], [day]);
      } else {
        let day = this.renderDay(i, date);
        days = _.union(days, [day]);
      }
    }

    return weeks;
  }

  renderDay(dayNumber, date) {
    return (
      <TouchableOpacity onPress={() => this.props.onSelect(date.date(i).toDate())} style={styles.day}>
        <Text>{dayNumber}</Text>
      </TouchableOpacity>
    );
  }

  fillInWeek(days, method) {
    let week = days;
    while (week.length !== 7) {
      week = week[method](<View style={styles.filler} />);
    }

    return week;
  }

  render() {
    const { startDate, unavailable, selected, headerStyle, monthsCount } = this.props;

    return (
      <View>
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
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

  row: {
    flexDirection: 'row',
    flex: 1
  }
});

export default Calendar;
