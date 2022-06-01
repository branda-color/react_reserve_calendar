import React, { useContext, useEffect, useState } from "react";
import { TimePicker, Input } from 'antd';
import moment from "moment";


import { AboutContext } from "../pages/About";

const format = "HH:mm";


const MyTimePicker = () => {

  const { state, dispatch } = useContext(AboutContext);

  const { event, selectedId } = state;

  const [select, setSelect] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);

  useEffect(() => {
    console.log(selectedId, event);
    if (selectedId && event) {
      let selectedEvent = event.filter(selected => selected.id === selectedId)[0];
      setSelect(selectedEvent);
      setstartTime(moment(selectedEvent.start));
      setendTime(moment(selectedEvent.end));
    }
  }, [selectedId, event])



  return (
    <div>
      <TimePicker

        value={startTime ? startTime : (select ? moment(select.start) : null)}
        minuteStep={30}
        format={format}
        onOk={(start) => {
          if (endTime && endTime.isBefore(start)) {
 
            setendTime(start);
            setstartTime(endTime);

          } else {
          
            setstartTime(start);

          }
        }
        }
      />-
      <TimePicker
        value={endTime ? endTime : (select ? moment(select.start) : null)}
        minuteStep={30}
        format={format}
        onOk={(end) => {

          if (startTime && end.isBefore(startTime)) {


            setendTime(startTime);
            setstartTime(end);

          } else {
            setendTime(endTime);

          }



        }}
      />
      <Input placeholder="enter student name" value={select ? select.title : null} />
    </div>
  );
}


export default MyTimePicker;