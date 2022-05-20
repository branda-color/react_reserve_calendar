import React, { useState } from "react";
import { TimePicker } from 'antd';
import moment from "moment";

const format = "HH:mm";

const MyTimePicker = (props) => {

  const selectEvent = props.selected;

  const newEvent = props.newEvent;

  let startTime = null;

  let endTime = null;

  if (selectEvent) {

    let a = JSON.stringify(selectEvent);
    let b = JSON.parse(a);
    startTime = moment(b.start);
    endTime = moment(b.end);

   }else if(newEvent){
    let a = JSON.stringify(newEvent);
    let b = JSON.parse(a);
    startTime = moment(b.start);
    endTime = moment(b.end);

  }

  const [timeString, setTimeString] = useState('');

  const handelSetTimeString = (e) => {
    const { value } = e.target;
    setTimeString(value);
  };


  return (
    <div>
    <TimePicker
      value={startTime}
      minuteStep={30}
      format={format}
      onOk={(time) => {
        setTimeString(timeString);
        console.log(time);
        console.log(timeString);
      }}
    />- 
    <TimePicker
      value={endTime}
      minuteStep={30}
      format={format}
      onOk={(time) => {
        setTimeString(timeString);
        console.log(time);
        console.log(timeString);
      }}
    />
    </div>
  );
}


export default MyTimePicker;