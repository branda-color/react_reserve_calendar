import React,{useState} from "react";

import {Checkbox} from 'antd';

import moment from 'moment';

import AddTime from './AddTime';
import Pop from "./popup";


const DropDown = (props) => {

    let time = props.open.time;

    const [checked, setchecked] = useState(time.length >0?true:false);

    const [allTime,setallTime] =useState(time);

    let useTime = [...allTime];



    const onChange = (event) => {
        // console.log(event.target.checked);
        setchecked(event.target.checked);

        if(useTime.length==0){

            useTime.push(
                {
                    start: moment('13:00', 'HH:mm'),
                    end: moment('14:00', 'HH:mm'),
                }
            )
    
    
            setallTime(useTime);
    
        }
       
    };



    return (
        <div>         
            <div>
                <Checkbox onChange={onChange}  checked={checked}>{props.value}</Checkbox>
                { checked == 1 && <Pop >
                <AddTime  value={allTime}/>
                </Pop>
                 }                
            </div>
       
        </div>
    );


}


export default DropDown;