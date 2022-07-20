import React, { useState, useEffect } from "react";

import moment from 'moment';

import { TimePicker } from 'antd';



//https://www.796t.com/content/1547345554.html

const AddTime = (props) => {

    let time = props.value;

    const [times, setTime] = useState(time);

    let opentime = [...times];

    const addClick = () => {

        opentime.push({
            start: moment('13:00', 'HH:mm'),
            end: moment('14:00', 'HH:mm'),
        });
        setTime(opentime);

    };


    const lessClick = (index) => {

        if (opentime.length > 1) {

            opentime.splice(index, 1);

            setTime(opentime);

        }

    };


    const timeItem = times.map((value, index) => {
        return (
            <div>
                <TimePicker.RangePicker format={"HH:mm"} minuteStep={30} key={index} defaultValue={[moment(value.start, 'HH:mm'), moment(value.end, 'HH:mm')]} />
                <button onClick={lessClick.bind(this, index)}>減少</button>
            </div>
        );
    })





    return (
        <div>
            <div>

                {
                    timeItem.length >= 1 ? timeItem : null
                }

                <button onClick={addClick}>加组件</button>

            </div>

        </div>
    );


}


export default AddTime;