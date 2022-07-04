import React,{ useReducer, createContext } from "react";
import moment from "moment";

const date = new moment(); 

export const initialEvent = {
    selectedId: 0,
    timeEvents: [
        {
            id: 1,
            title: 'Today',
            start: new Date(date.subtract(3, 'hours').format('YYYY-MM-DD HH:00:00')),
            end: new Date(date.add(3, 'hours').format('YYYY-MM-DD HH:00:00')),
        },
        {
            id: 2,
            title: 'Point in Time Event',
            start:new Date(date.add(2, 'hours').format('YYYY-MM-DD HH:00:00')),
            end:new Date(date.add(3, 'hours').format('YYYY-MM-DD HH:00:00')),
            desc: 'Pre-meeting meeting, to prepare for the meeting',
        }
    ]
};



export function reducer(state, action) {

    switch (action.type) {
        case "new":
            return {
                ...state,
                timeEvents: [
                    ...state.timeEvents,
                    {
                        id: -1,
                        start: action.payload.start,
                        end: action.payload.end,
                        title: action.payload.title
                    }
                    
                ]
                ,selectedId:-1
            };
        case "change":

            return {
                ...state,
                timeEvents:action.payload.timeEvents
            }

        case "delete":
            
           return {
               ...state,
               selectedId:0,
               timeEvents:action.payload.timeEvents,

           }


        case "select":

            return{
                ...state,
                selectedId:action.payload.id,
            }

        default:
            return {
                ...state,
            };
    }


}


export const EventContext = createContext();


export const EventContextProvider = ({ children })=>{

    const [state, dispatch] = useReducer(reducer, initialEvent);

    return (
        <EventContext.Provider value={{ state, dispatch }}>
          {children}
        </EventContext.Provider>
      );

}

