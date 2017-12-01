import React, { Component } from 'react';

function renderMyWeek (weekDay, remainingDays, currentDate) {
  const rows = [];
  let x, y;
  if (weekDay > 0) {
    for (x = 0; x < weekDay ; x++) {
      rows.push(
        <td> </td>
      );
    }
  }
  for (y = remainingDays; y > 0; y--) {
    rows.push(
      <td>{currentDate}</td>
    );
    currentDate += 1;
  }
  if (rows.length < 7) {
    for (x = rows.length; x < 7 ; x++) {
      rows.push(
        <td> </td>
      );
    }
  }
  return rows;
}

function renderMonth (weekDay, diasRestantes, currentDate) {
  const rows = [];
  let daysLeft;
  let dayOfTheWeek = weekDay; //2
  let remainingDays;
  if (diasRestantes > 7) {
    remainingDays = (7 - dayOfTheWeek);
  } else {
    remainingDays = diasRestantes;
  }

  for (daysLeft = diasRestantes; daysLeft > 0; daysLeft -= remainingDays) {
    console.log(daysLeft);
    rows.push(
      <tr>
        {renderMyWeek(dayOfTheWeek, remainingDays, currentDate)}
      </tr>
    );
    if (dayOfTheWeek > 1) {
      dayOfTheWeek = 0;
    }
    currentDate += remainingDays;
    if (daysLeft > 7) {
      remainingDays = (7 - dayOfTheWeek);
    } else {
      remainingDays = daysLeft;
    }
  }
  return rows;
}

class CalendarTable extends React.Component {
  render () {
    const userDate = this.props.initialDate;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    //let blankDays = userDate.getDay();
    let diasRestantes = this.props.numberOfDaysSpan;
    let weekDay = Number(userDate.getDate());

    let mes = renderMonth (userDate.getDay(), diasRestantes, weekDay);

    return (
      <div>
        <h3>Calendar Requested:</h3>
        <div>Initial Date: {userDate.toDateString()}</div>
        <div>Starts: {userDate.getDay()} ({daysWeek[userDate.getDay()]})</div>
        <div>Span of Days: {this.props.numberOfDaysSpan}</div>
        <br />
        <table border="1">
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
          <tr>
            <th colspan="7">{months[userDate.getMonth()]} {userDate.getFullYear()}</th>
          </tr>
          {mes}
        </table>
      </div>
    );
  }
}

class SearchTable extends React.Component {
  render () {
    return (
        <form onSubmit={() => alert(`Submitted`)}>
          <label>
            Start Date:
            <input type="text" placeholder="Use: MM/DD/YYYY" />
          </label>
          <br />
          <label>
            Number of Days:
            <input type="number" />
          </label>
          <br />
          <label>
            Country Code:
            <input type="text" />
          </label>
          <br />
          <p>
            <input type="submit" value="Submit" />
          </p>
      </form>
    );
  }
}

class FilterableCalendarApp extends Component {
  render () {
    return (
      <div>
        <h3>Number8 - Calendar Exercise Teo. </h3>
        <br />
        <div>
          <SearchTable />
        </div>
        <div>
          <CalendarTable initialDate={new Date("03/25/2015")} numberOfDaysSpan='9' />
        </div>
      </div>
    );
  }
}

class FetchHolidays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://holidayapi.com/v1/holidays?country=US&year=2008&key=547e5710-dc76-4a5a-afad-2e54d2b286e6")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.holidays
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let arregloFinal = [];
      for (let x in items) {
        arregloFinal.push([x, items[x][0]]);
        console.log(`Date: ${x} , contents: ${items[x][0].name}`);
      }
      return (
        <div>{arregloFinal[0][1].name}</div>
      );
    }
  }
}

export default FilterableCalendarApp;