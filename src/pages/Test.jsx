import React, { useCallback, useContext, useState } from 'react';

import { Button } from 'antd';

import 'antd/dist/antd.css';
import '../index.css';



const TabContent0 = () => <div className="content">Content0</div>;
const TabContent1 = () => <div className="content">Content1</div>;
const TabContent2 = () => <div className="content">Content2</div>;

const BUTTONS = [ "Content0","Content1","Content2",];




const Test = () => {


  const [click, setclick] = useState(null);
  const [choose, setChoose] = useState(null);


  let nowBtn = {
    now:choose,
    buttons:[...BUTTONS]
  }

  const handleClick = (event, key) => {

    // console.log(event);
    // console.log('key index: ', key);

    if (key == 0) {
      setclick(TabContent0);
      setChoose(0);

    } else if (key == 1) {
      setclick(TabContent1);
      setChoose(1);
    } else {
      setclick(TabContent2);
      setChoose(2);
    }

  };




  return (
    <div>

      <div>
        {BUTTONS.map((element, key) => {
          return (
            <Button type={key==choose?"primary":"dashed"} shape="round" size="large" onClick={event => handleClick(event, key)} key={key}>{element}</Button>
          );
        })}
      </div>

      <div>
        {click}
      </div>
    </div>
  );




}





export default Test;