import React, { useState, useEffect, useMemo,useContext } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment-timezone';
import "react-big-calendar/lib/css/react-big-calendar.css";
import TimezoneSelect from "../components/TimezoneSelect";

import { EventContext } from "../contexts/event";

//查看當前瀏覽器的時區>>會拿到Asia/Taipei 
const defaultTZ = moment.tz.guess();
const defaultDateStr = '2015-4-13';

function getDate(str, momentObj) {
    return momentObj(str, 'YYYY-MM-DD').toDate()
}


const HomePage = ()=>{

    const [timezone, setTimezone] = useState(defaultTZ)
    
    const { state, dispatch } = useContext(EventContext);

    const { event, selectedId } = state;


    const { localizer} =

        /**
         * 避免重複進行複雜耗時的計算」，所以把計算的結果存起來用。
         */
        useMemo(() => {
            moment.tz.setDefault(timezone)
            return {
                defaultDate: getDate(defaultDateStr, moment),
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
                    //設置可切換有哪些view
                    views={['day']}
                    style={{ height: 500 }}
                    //自訂義月曆背景顏色
                    dayPropGetter={calendarStyle}
                    //設定載入以第一個物件的時間為主
                    scrollToTime={event[0].start}
                />
            </div>
        </div>

    );

};



export default HomePage;