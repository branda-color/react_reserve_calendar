import React, { useReducer, createContext } from "react";
import moment from "moment";

const date = new moment();

export const initialTime = {
    selectedId: 0,
    timeEvents: [
        {
            id: 1,
            day: 1,
            time: [
                {
                    start: date.subtract(3, 'hours').format('HH:00'),
                    end:date.add(3, 'hours').format(' HH:00'),
                },
                {
                    start: date.add(2, 'hours').format(' HH:00'),
                    end: date.add(3, 'hours').format(' HH:00'),
                }
            ]

        },
        {
            id: 2,
            day: 2,
            time: [
                {
                    start: date.subtract(3, 'hours').format('HH:00'),
                    end:date.add(3, 'hours').format('HH:00'),
                },
                {
                    start: date.add(2, 'hours').format('HH:00'),
                    end: date.add(3, 'hours').format('HH:00'),
                }
            ]
           
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
            console.log(action.payload);
            return {
                ...state,
                selectedId:0,
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


export const TimeOpenContext = createContext();



export const TimeOpenContextProvider = ({ children })=>{

    const [state, dispatch] = useReducer(reducer, initialTime);

    return (
        <TimeOpenContext.Provider value={{ state, dispatch }}>
          {children}
        </TimeOpenContext.Provider>
      );

}


