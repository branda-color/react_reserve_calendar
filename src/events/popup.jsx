import React  from "react";
import moment from "moment";



const Pop = (props)=>{


    if(props.test){

        let a = JSON.stringify(props.test);

    let b = JSON.parse(a);
    // console.log(moment(b.start).format("HH:mm"));


    }
    



    return (
        <h1>{JSON.stringify(props.test)}</h1>
    
    )

}



export default Pop;