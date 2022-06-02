import React, { useContext, useEffect, useState } from "react";
import { TimePicker, Input, Button } from 'antd';
import moment from "moment";


import { AboutContext } from "../pages/About";

const format = "HH:mm";


const MyTimePicker = () => {

  const { state, dispatch } = useContext(AboutContext);

  const { event, selectedId } = state;

  const [select, setSelect] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    console.log(selectedId, event);
    if (selectedId && event) {
      let selectedEvent = event.filter(selected => selected.id === selectedId)[0];
      setSelect(selectedEvent);
      setstartTime(moment(selectedEvent.start));
      setendTime(moment(selectedEvent.end));
      setTitle(selectedEvent.title);
    }
  }, [selectedId, event]);


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
        value={endTime ? endTime : (select ? moment(select.end) : null)}
        minuteStep={30}
        format={format}
        onOk={(end) => {

          if (startTime && end.isBefore(startTime)) {
            setendTime(startTime);
            setstartTime(end);

          } else {
            setendTime(end);
          }
        }}
      />
      <Input placeholder="enter student name" value={title ?title:(select ? select.title : null)} onChange={(titles) => { setTitle(titles.target.value) }} />
      <Button type="primary" onClick={() => {  
        let newEvent = event.filter(selected => selected.id !== selectedId);
        newEvent.push({
          id: selectedId,
          title: title,
          start: new Date(startTime),
          end: new Date(endTime),
        });

        console.log(newEvent);
        dispatch({ type: "change", payload: {event:newEvent}});

      }}>修改</Button>
      <Button>取消</Button>

    </div>
  );
} 


export default MyTimePicker;