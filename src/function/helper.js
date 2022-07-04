
import moment from "moment";

export function noOverlap(start, end, timeEvents) {

    let bool = false;

    let startMot= moment(start);
    let endMot =moment(end);

    timeEvents.forEach(function (value) {

        let eventStart = moment(value.start);
        let eventEnd = moment(value.end);

        let startCop = startMot.isBetween(eventStart,eventEnd);
        let endCop = endMot.isBetween(eventStart,eventEnd);

        let eventStartCop = eventStart.isBetween(startMot,endMot);
        let eventEndCop = eventEnd.isBetween(startMot,endMot);


        if(startCop==true || endCop==true){
            bool=true;
        }else if(eventStartCop ==true || eventEndCop==true){
            bool=true;
        }else if(startMot.isSame(eventStart) && endMot.isSame(eventEnd)){
            bool =true;
        }       

    });

    return bool;

}

