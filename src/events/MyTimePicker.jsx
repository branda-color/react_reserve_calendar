import React, { useContext, useEffect, useState } from "react";
import { TimePicker, Input, Button } from 'antd';
import moment from "moment";
import button from "../components/button";


//加入全域物件
import { EventContext } from "../contexts/event";

//加入helper function
import { noOverlap } from "../function/helper";

const format = "HH:mm";


const MyTimePicker = () => {

  const { state, dispatch } = useContext(EventContext);

  const { timeEvents, selectedId } = state;

  const [select, setSelect] = useState(null);
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (selectedId && timeEvents) {
      let selectedEvent = timeEvents.filter(selected => selected.id === selectedId)[0];
      setSelect(selectedEvent);
   
    }
  }, [selectedId, timeEvents]);

  // 因為useEfeect會被呼喚把select的event值全部回填回去,要設為null必須要在改變select的值
  useEffect(() => {
    if (!select) {
      console.log(456, select);
      // setstartTime(null);
      // setendTime(null);
      // setTitle(null);
    } else {
      
    console.log(select.start, select.end, select.title);

    setstartTime(moment(select.start));
    setendTime(moment(select.end));
    setTitle(select.title);

    }

  }, [select]);


  return (
    <div className="popup-content">
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
      <Input placeholder="enter student name" value={title ? title : (select ? select.title : null)} onChange={(titles) => { setTitle(titles.target.value) }} />
      <Button type="primary" onClick={() => {

        let newEvent = timeEvents.filter(selected => selected.id !== selectedId);

        console.log(newEvent, timeEvents, selectedId);

        let overlap = noOverlap(new Date(startTime), new Date(endTime), newEvent);


        if (overlap !== true) {

          fetch(
            `http://127.0.0.1:8000/api/test`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: title,
              start: new Date(startTime),
              end: new Date(endTime),
              id: selectedId
            }),

          }
          )
            .then((response) => response.json())
            .then((data) => {
              newEvent.push({
                  id: data.id,
                  title: title,
                  start:  new Date(startTime),
                  end: new Date( endTime),
                });
                
                console.log(newEvent);
              dispatch({ type: "change", payload: { timeEvents: newEvent } });
            })
            .catch((err) => {
              console.log(err, '錯誤');
            })


        }


      }}>{selectedId !== -1 ? button.button.update : button.button.new}</Button>
      <Button onClick={() => {

        let delEvent = timeEvents.filter(selected => selected.id !== selectedId);

        dispatch({ type: "delete", payload: { timeEvents: delEvent } });
        setSelect(null);

      }}>{selectedId !== -1 ? button.button.delete : button.button.clear}</Button>

    </div>

  );
}


export default MyTimePicker;