import { useCallback, useEffect, useState } from 'react';


const useTest = () => {

    const [c, setC] = useState(null);
   
    fetch(
        `http://127.0.0.1:8000/api/test`
    )
        .then((response) => response.json())
        .then((data) => {

            setC(data.data);
            // console.log(c);

        })
        .catch((err) => {
            console.log(err, '錯誤');
        })

        return c;
};


export default useTest;