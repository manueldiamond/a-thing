import { useState } from 'react';
import './App.css'
const Calendar = () => {
  // state for selected date and calendar visibility
  const [selectedDate, setSelectedDate] = useState(null);
  const [visible, setVisible] = useState(false);

  const selectDate = (date) => {
    setSelectedDate(date);
    setVisible(false);
  };
  
  const changeMonth=(amt)=>{
    setSelectedDate(prevDate=>{
      const newDate=new Date(prevDate);
      const month=prevDate.getMonth() + amt
      if(month>11||month<0){
        newDate.setFullYear(prevDate.getFullYear()+amt)
      }
      newDate.setMonth(month%12)
      return newDate;
    })
  }
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const generateCalendarTable = () => {
    const table = [];
    let currentDate=selectedDate
    if(!currentDate)
      currentDate=new Date();
      // setSelectedDate(currentDate);
    const month=currentDate.getMonth();
    const year=currentDate.getFullYear();
  
    
    // Get number of days in current month
    const numDaysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    let day = 1;

    while(day<=numDaysInMonth){
      const weekcells = [];

      // Loop through each day of the week
      for (let j = 0; j < 7; j++) {
        if ((day==1 && j < firstDayOfMonth) || day > numDaysInMonth) {
          weekcells.push(<td key={j}></td>);//push empty cell
        } else {
          const date = new Date(year, month, day);
          weekcells.push(
            <td key={j}
              className={`calendar-day ${selectedDate && selectedDate.getTime() === date.getTime() ? 'selected' : ''}`}
              onClick={() => selectDate(date)}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      table.push(<tr key={table.length}>{weekcells}</tr>);
    }

    return table;
  };

  return (
    <div className="calendar">
      <button onClick={() => setVisible(true)}>{selectedDate?selectedDate.toDateString():"Select Date"}</button>
      {visible && (
        <div className="calendar-container">
          <div className="calendar-controls">
            <button onClick={()=>changeMonth(-1)}>&lt;</button>
            <p className='calendar-month'>{
              (selectedDate?selectedDate:new Date()).toLocaleDateString()
            }</p>
            <button onClick={()=>changeMonth(1)}>&gt;</button>
          </div>
          <table className="calendar-table">
            <thead>
              <tr className='calendar-weeks'>
              {daysOfWeek.map((dayOfWeek,i)=>(
                <th className='calendar-weekday' key={i}>{dayOfWeek}</th>
              ))}
              </tr>
            </thead>
            <tbody>
              {generateCalendarTable()}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const App = () => {

  return (
    <div className='app'>
      <h1>Select a Date</h1>
      <Calendar />
    </div>
  );
};

export default App;
