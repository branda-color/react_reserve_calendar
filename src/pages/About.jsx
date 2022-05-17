/**
 * 測試用calendar
 */
import React, { useState, useEffect, useMemo } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';
import "react-big-calendar/lib/css/react-big-calendar.css";
import TimezoneSelect from "../components/TimezoneSelect";
//事件假設(未接api)
import events from "../components/events";
import backgroundEvents from "../components/backgroundEvents";


const defaultTZ = moment.tz.guess();
const defaultDateStr = '2015-4-13';

function getDate(str, momentObj) {
    return momentObj(str, 'YYYY-MM-DD').toDate()
}

const About = () => {


    const [timezone, setTimezone] = useState(defaultTZ)

    const { defaultDate, getNow, localizer, myEvents, scrollToTime } =

        /**
         * 避免重複進行複雜耗時的計算」，所以把計算的結果存起來用。
         */
        useMemo(() => {
            moment.tz.setDefault(timezone)
            return {
                defaultDate: getDate(defaultDateStr, moment),
                getNow: () => moment().toDate(),
                localizer: momentLocalizer(moment),
                myEvents: [...events],
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
                    events={events}
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
                    scrollToTime={events[0].start}
                />
            </div>
        </div>
    );


};



export default About;