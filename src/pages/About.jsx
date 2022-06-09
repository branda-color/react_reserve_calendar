/**
 * 測試用calendar
 */
import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';
import "react-big-calendar/lib/css/react-big-calendar.css";
import TimezoneSelect from "../components/TimezoneSelect";
import backgroundEvents from "../components/backgroundEvents";

import Pop from "../events/popup";
import MyTimePicker from "../events/MyTimePicker";
//加入全域物件
import { EventContext } from "../contexts/event";


//拖拉樣式加入
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop/withDragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const DragAndDropCalendar = withDragAndDrop(Calendar);




//查看當前瀏覽器的時區>>會拿到Asia/Taipei 
const defaultTZ = moment.tz.guess();


function getDate(str, momentObj) {
    return momentObj(str, 'YYYY-MM-DD').toDate()
}

const About = () => {

    //全域資料拿取
    const { state, dispatch } = useContext(EventContext);

    const { timeEvents, selectedId } = state;

    //新增日曆物件
    function handleSelect({ start, end }) {

        dispatch({ type: "new", payload: { start: start, end: end } });

    };

    const handleSelected = (event) => {

        dispatch({ type: "select", payload: { id: event.id } });
    };


    const [timezone, setTimezone] = useState(defaultTZ)

    const { getNow, localizer } =

        /**
         * 避免重複進行複雜耗時的計算」，所以把計算的結果存起來用。
         * 選擇timeZone
         */
        useMemo(() => {
            moment.tz.setDefault(timezone)
            return {
                getNow: () => moment().toDate(),
                localizer: momentLocalizer(moment),
                scrollToTime: moment().toDate(),
            }
        }, [timezone])


    //組件完成就會跑這個,重新整理也會跑這個
    useEffect(() => {
        return () => {
            moment.tz.setDefault() // reset to browser TZ on unmount
        }
    }, []);


    //改變calendar的樣式
    const calendarStyle = () => {
        return {
            style: {
                backgroundColor: '#FCFCFC'

            }
        }
    }




    const moveEvent = useCallback(
        ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {

            let newEvent = timeEvents.filter(selected => selected.id !== event.id);
            newEvent.push({
              id: event.id,
              title: event.title,
              start: start,
              end: end,
            });
    
            console.log(newEvent);
            dispatch({ type: "change", payload: {timeEvents:newEvent}});


        //   const { allDay } = event
        //   if (!allDay && droppedOnAllDaySlot) {
        //     event.allDay = true
        //   }
          }

        //   setMyEvents((prev) => {
        //     const existing = prev.find((ev) => ev.id === event.id) ?? {}
        //     const filtered = prev.filter((ev) => ev.id !== event.id)
        //     return [...filtered, { ...existing, start, end, allDay }]
        //   })
        // },
        // [setMyEvents]
    );


    const resizeEvent = useCallback(
        // ({ event, start, end }) => {
        //   setMyEvents((prev) => {
        //     const existing = prev.find((ev) => ev.id === event.id) ?? {}
        //     const filtered = prev.filter((ev) => ev.id !== event.id)
        //     return [...filtered, { ...existing, start, end }]
        //   })
        // },
        // [setMyEvents]
    )







    return (

        <div>
            <TimezoneSelect
                defaultTZ={defaultTZ}
                setTimezone={setTimezone}
                timezone={timezone}
            />
            <div style={{ height: '100%', margin: '20px' }}>
                <DragAndDropCalendar
                    //選取的特定day
                    defaultView="day"
                    localizer={localizer}
                    events={timeEvents}
                    startAccessor="start"
                    endAccessor="end"
                    backgroundEvents={backgroundEvents}
                    //設置可切換有哪些view
                    // views={['day']}
                    style={{ height: 500 }}
                    //自訂義月曆背景顏色
                    dayPropGetter={calendarStyle}
                    //min可以設定開始時間
                    //min={new Date(2022, 10, 0, 2, 0, 0)}
                    //設定載入以第一個物件的時間為主{Date}
                    scrollToTime={timeEvents[0].start}
                    // selected={selected}
                    //選取新增
                    onSelectEvent={handleSelected}
                    onSelectSlot={handleSelect}
                    selectable
                    //選取resize
                    onEventDrop={moveEvent}
                    onEventResize={resizeEvent}
                    popup
                    resizable
                    //設定不要重疊
                    dayLayoutAlgorithm="no-overlap"
                    //更改時間選取30->60
                    step={60}
                    timeslots={1}
                    //改變樣式
                    eventPropGetter={
                        (event, start, end, isSelected) => {
                            let newStyle = {
                                backgroundColor: "#00C7BA",
                                color: 'black',
                                borderRadius: "0px",
                                border: "none",
                            };
                            //設置background屬性,若是background就1(區別backgroundEvents換顏色)
                            if (event.background) {
                                newStyle.backgroundColor = "#FFBB00"
                            }
                            //設置被選到的換顏色
                            if (isSelected) {
                                if (event.background) {
                                    newStyle.backgroundColor = "#FFBB00"
                                } else {
                                    newStyle.backgroundColor = "RED"
                                }
                            }

                            return {
                                className: "",
                                style: newStyle
                            };
                        }
                    }


                >
                </DragAndDropCalendar>
                <Pop />
                <MyTimePicker />

            </div>
        </div>

    );


};




export default About;