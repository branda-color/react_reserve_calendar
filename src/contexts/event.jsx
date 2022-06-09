import React,{ useReducer, createContext } from "react";


export const initialEvent = {
    selectedId: 0,
    event: [
        {
            id: 1,
            title: 'Today',
            start: new Date(new Date().setHours(new Date().getHours() - 3)),
            end: new Date(new Date().setHours(new Date().getHours() + 3)),
        },
        {
            id: 2,
            title: 'Point in Time Event',
            start: new Date(new Date().setHours(new Date().getHours() - 1)),
            end: new Date(new Date().setHours(new Date().getHours() + 1)),
            desc: 'Pre-meeting meeting, to prepare for the meeting',
        }
    ]
};



export function reducer(state, action) {

    switch (action.type) {
        case "new":
            return {
                ...state,
                event: [
                    ...state.event,
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
                event:action.payload.event
            }

        case "delete":
            return state.filter(function (item) {
                return item.id !== action.id
            });

        case "select":

            return{
                ...state,
                selectedId:action.payload.id
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

