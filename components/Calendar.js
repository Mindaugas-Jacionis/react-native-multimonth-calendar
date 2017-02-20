import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native';
import moment from 'moment';
import _ from 'underscore';

class Calendar extends Component {
  static propTypes = {
    startDate: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
    unavailable: PropTypes.array,
    selected: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
    weekContianerStyle: PropTypes.object,
    weekTextStyle: PropTypes.object,
    headlineTextStyle: PropTypes.object,
    dayTextStyle: PropTypes.object,
    monthsCount: PropTypes.number,
    week: PropTypes.array,
    monthNames: PropTypes.array,
    onSelect: PropTypes.function,
    onUnavailableSelect: PropTypes.any,
    clickablePast: PropTypes.bool,
    pastTextStyle: PropTypes.object
  };

  static defaultProps = {
    startDate: moment(),
    unavailable: [],
    selected: moment(),
    weekContianerStyle: {},
    weekTextStyle: {},
    headlineTextStyle: {},
    dayTextStyle: {},
    monthsCount: 3,
    week: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    onSelect: () => {},
    onUnavailableSelect: null,
    clickablePast: false,
    pastTextStyle: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: moment(this.props.selected).format('YYYY-MM-DD')
    }
  }

  renderHeader() {
    const { week, weekContianerStyle, weekTextStyle } = this.props;
    const headings = _.map(week , (heading) => {
      return (
        <View style={styles.default}>
          <Text style={[styles.week, weekTextStyle]}>{heading}</Text>
        </View>
      );
    });

    return (
      <View style={[styles.row, weekContianerStyle]}>
        {headings}
      </View>
    );
  }

  renderCalendars() {
    const { monthsCount, startDate } = this.props;
    let calendars = [];

    for (let i = 0; i < monthsCount; i++) {
      const start = moment(startDate);
      let month = this.renderMonth(start.add(i, 'month'));

      calendars = _.union(calendars, [month])
    }

    return calendars;
  }

  renderMonth(date) {
    const { monthNames, headlineTextStyle } = this.props;
    const year = date.year();
    const currentMonth = monthNames[date.month()];
    let month = this.renderWeeks(date);

    return (
      <View>
        <Text style={[styles.default, styles.title, headlineTextStyle]}>
          {`${currentMonth} ${year}`}
        </Text>
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
    }

    return weeks;
  }

  onPress(formatedDate) {
    const { unavailable, onSelect, onUnavailableSelect, clickablePast } = this.props;
    const isUnavailable = unavailable.includes(formatedDate);
    const notPast = moment().format('YYYY-MM-DD') <= formatedDate;

    if (isUnavailable && typeof(onUnavailableSelect)  === 'function') {
      onUnavailableSelect(formatedDate);
      this.setState({ selected: formatedDate });
    }
    if ((clickablePast || notPast) && !isUnavailable) {
      onSelect(formatedDate);
      this.setState({ selected: formatedDate });
    }
  }

  renderDay(dayNumber, date) {
    const { dayTextStyle, unavailable, onSelect, onUnavailableSelect, clickablePast, unavailableTextStyle, pastTextStyle } = this.props;
    const { selected } = this.state;
    const formatedDate = date.format('YYYY-MM-DD');
    const isUnavailable = unavailable.includes(formatedDate);
    const isSelected = formatedDate === selected;
    const notPast = moment().format('YYYY-MM-DD') <= formatedDate;
    const select = clickablePast || notPast ? () => onSelect(formatedDate) : null;
    const onPress = isUnavailable ? () => onUnavailableSelect(formatedDate) : select;
    let style = [styles.day, dayTextStyle];
    isUnavailable ? style.push.apply(style, [styles.unavailable, unavailableTextStyle]) : null;
    !notPast ? style.push.apply(style, [styles.past, pastTextStyle]) : null;

    return (
      <TouchableOpacity style={styles.default} onPress={() => this.onPress(formatedDate)}>
        <View style={isSelected ? styles.selected : null}>
          <Text style={style}>
            {dayNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  fillInWeek(days, method) {
    let week = days;
    while (week.length !== 7) {
      week[method](<View style={styles.default} />);
    }

    return week;
  }

  render() {
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
    paddingVertical: 10
  },

  row: {
    flexDirection: 'row',
  },

  week: {
    fontSize: 16,
    fontWeight: '700'
  },

  title: {
    fontSize: 20,
    fontWeight: '700'
  },

  day: {
    fontSize: 16,
    fontWeight: '500'
  },

  selected: {
    backgroundColor: '#E41F36',
    padding: 5,
    borderRadius: 1000
  },

  unavailable: {
    textDecorationLine: 'line-through',
    opacity: 0.5
  },

  past: {
    opacity: 0.3
  }
});

export default Calendar;
