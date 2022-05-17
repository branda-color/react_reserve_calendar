import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from '../components/events';
import backgroundEvents from '../components/backgroundEvents';
const localizer = momentLocalizer(moment);





const AdjustTime = () => {



    const calendarStyle = () => {
        return {
            style: {
                backgroundColor: '#FCFCFC'
                
            }
        }
    }

    return (


        <div>
            <Calendar
                localizer={localizer}
                backgroundEvents={backgroundEvents}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                dayPropGetter={calendarStyle}
                eventPropGetter={
                    (event, start, end, isSelected) => {
                      let newStyle = {
                        backgroundColor: "#4EFEB3",
                        color: 'black',
                        borderRadius: "0px",
                        border: "none"
                      };
                      //設置background屬性,若是background就1(區別backgroundEvents換顏色)
                      if (event.background){
                        newStyle.backgroundColor = "#F1E1FF"
                      }
                
                      return {
                        className: "",
                        style: newStyle
                      };
                    }
                  }
            />
        </div>
    )
}





export default AdjustTime;