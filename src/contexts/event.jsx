

export const initialEvent = {
    selectedId: 0,
    event: [
        {
            id: 2,
            title: 'Today',
            start: new Date(new Date().setHours(new Date().getHours() - 3)),
            end: new Date(new Date().setHours(new Date().getHours() + 3)),
        },
        {
            id: 3,
            title: 'Point in Time Event',
            start: new Date(new Date().setHours(new Date().getHours() - 1)),
            end: new Date(new Date().setHours(new Date().getHours() + 1)),
            desc: 'Pre-meeting meeting, to prepare for the meeting',
        }
    ]
};





export function reducer(state, action) {

    console.log(state);

    switch (action.type) {
        case "new":
            return {
                ...state,
                event: [
                    ...state.event,
                    {
                        id: state.event.length + 1,
                        start: action.payload.start,
                        end: action.payload.end,
                        title: action.payload.title
                    }
                ]
            };
        case "change":
            return state.map((event) => {
                if (event.id === action.id) {
                    return {
                        event: {
                            ...state.event,
                            start: action.payload.start,
                            end: action.payload.end,
                            title: action.payload.title
                        }
                    };
                } else {
                    return event;
                }
            });
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


