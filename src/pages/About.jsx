/**
 * 測試用calendar
 */
import React, { useState, useEffect, useMemo,useReducer, createContext} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';
import "react-big-calendar/lib/css/react-big-calendar.css";
import TimezoneSelect from "../components/TimezoneSelect";
import backgroundEvents from "../components/backgroundEvents";

import Pop from "../events/popup";
import MyTimePicker from "../events/MyTimePicker";


import { initialEvent, reducer} from "../contexts/event";

export const AboutContext = createContext(null);


//查看當前瀏覽器的時區>>會拿到Asia/Taipei 
const defaultTZ = moment.tz.guess();


function getDate(str, momentObj) {
    return momentObj(str, 'YYYY-MM-DD').toDate()
}

const About = () => {



   //全域資料拿取
   const [state, dispatch] = useReducer(reducer,initialEvent); 
   const {event} = state; 


    // const [myEvents, setEvents] = useState(events);
    //存起拿資料
    const [selected, setSelected] = useState();




    //新增日曆物件
    function handleSelect({ start, end}) {


        dispatch({ type: "new", payload:{start:start,end:end }});

            
    
    };

    const handleSelected = (event) => {

        dispatch({ type: "select", payload:{id:event.id}});
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


    return (
        <AboutContext.Provider value={{state, dispatch}}>
        <div>
            <TimezoneSelect
                defaultTZ={defaultTZ}
                setTimezone={setTimezone}
                timezone={timezone}
            />
            <div style={{ height: '100%', margin: '20px' }}>
                <Calendar
                    //選取的特定day
                    defaultView="day"
                    localizer={localizer}
                    events={event}
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
                    // scrollToTime={}
                    // selected={selected}
                    onSelectEvent={handleSelected}
                    onSelectSlot={handleSelect}
                    selectable
                    dayLayoutAlgorithm="no-overlap"
                    //更改時間選取30->60
                    step={60}
                    timeslots={1}
                    eventPropGetter={
                        (event, start, end, isSelected) => {
                          let newStyle = {
                            backgroundColor: "#00C7BA",
                            color: 'black',
                            borderRadius: "0px",
                            border: "none"
                          };
                          //設置background屬性,若是background就1(區別backgroundEvents換顏色)
                          if (event.background){
                            newStyle.backgroundColor = "#FFBB00"
                          }
                    
                          return {
                            className: "",
                            style: newStyle
                          };
                        }
                      }

                >
                </Calendar>
                <Pop />
                <MyTimePicker />

            </div>
        </div>
        </AboutContext.Provider>
    );


};




export default About;