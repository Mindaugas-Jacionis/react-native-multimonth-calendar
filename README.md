# React-Native-Calendar-Events
React Native Module for IOS and Android Calendar. Renders scrollable, multi-month calendar with possibility to cross out unwanted dates or call function on date selection.

## Install
```
npm install react-native-multimonth-calendar
```

## Usage
```
import Calendar from 'react-native-multimonth-calendar';
...
render() {
  return (
    <Calendar
      monthsCount={8}
      marked={['2017-02-26', '2017-02-12']}
      unavailable={['2017-02-27']}
      onSelect={(date) => { alert('selected date is: ' + date); }}
    />
  );
}
```

## Properties

| Property       | Value            | Description |
| :------------- | :--------------- | :---------- |
| startDate      | String('YYYY-MM-DD')/Date/moment object | Date of initial month for calendar. Default: today. |
| unavailable    | Array of Strings('YYYY-MM-DD')| Dates that will be crossed out as unavailable. Default: empty array, []. |
| selected       | String('YYYY-MM-DD')/Date/moment object | Selected date in calendar(marked with red circle). Default: today. |
| monthsCount    | Number(integer) | For how many months calendar should be rendered. Default: 3. |
| week           | Array of Strings | Values used to represent days of week(M for Monday, T for Tuesday, and so on). Default: ['M', 'T', 'W', 'T', 'F', 'S', 'S']. |
| monthNames     | Array of Strings | Values used for names of months(Jan for January, Feb for February, and so on). Default: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']. |
| marked         | Array of Strings('YYYY-MM-DD') | Additional marker for available dates, could be used when date is not fully available(i.e.: there is pending reservations, or out of 10 tables 3 are booked and you want to let user visually know that not all tables are available on the date). Default: empty array, []. |
| onSelect       | Function | Function to be called on date click. Returns date in YYYY-MM-DD format. By default sets selected date in calendar state. |
| onUnavailableSelect | Function | Is the same as onSelect function, execept for moving select onto clicked date(You can do that by taking returned date and passing it as *selected* prop). Also returns YYYY-MM-DD date string. Default: empty function, does nothing. |
| clickablePast  | Boolean(true/false) | Defines if onSelect function is allowed on passed dates(yesterday, day before and so on). Default: false. |
| selectedTextStyle | Style Object | Styling prop for selected date text. Default: empty object, {}. |
| pastTextStyle | Style Object | Styling prop for past dates text. Default: empty object, {}. |
| dayTextStyle  | Style Object | Styling prop for all dates/days text. Default: empty object, {}. |
| weekTextStyle | Style Object | Styling prop for all week days text(M, T, W and so on). Default: empty object, {}. |
| headlineTextStyle | Style Object | Styling prop for all headline text(Jan 2017, Feb 2017 and so on). Default: empty object, {}. |
| weekContianerStyle | Style Object | Styling prop for container wrapping weekdays representation(M, T, W and so on). Default: empty object, {}. |
| markedStyle | Style Object | Styling prop for marker that marks dates passed by *marked* prop, can be used to change, shape, color or other styling properties of marker. Default: empty object, {}. |
