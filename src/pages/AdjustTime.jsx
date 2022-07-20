import React, { useCallback, useContext, useState } from 'react';

import { DatePicker, Space } from 'antd';

import DropDown from "../events/DropDown";

import { TimeOpenContext } from "../contexts/setOpenTime";


const AdjustTime = () => {

  const { state, dispatch } = useContext(TimeOpenContext);
  const { timeEvents, selectedId } = state;

  console.log(timeEvents);

   function filters(dayName){

    return  timeEvents.filter(word => word.day === dayName)[0];

   }

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };


  return (

    <div>
      <Space direction="vertical">
        <div>
          <DatePicker onChange={onChange} picker="month" />
        </div>
        <DropDown value={"Monday"} open={filters(1)} />
        <DropDown value={"Tuesday"}  open={filters(2)}/>
        <DropDown value={"Wensday"}  open={filters(3)?filters(3):{id:-3,day:3,time:[]}}/>
      </Space>
    </div>


  );





}





export default AdjustTime;