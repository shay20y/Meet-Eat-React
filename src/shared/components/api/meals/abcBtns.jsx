import React, { useEffect, useState } from 'react';
import { API_MEAL_SEARCH_BY_LETTER } from '../../../constant/constant';
import axios from 'axios';

export default function AbcBtns({ setArResult }) {
    const [alpha, setAlpha] = useState([]);

    const a = Array.from(Array(26)).map((e, i) => i + 65);
    
    useEffect(() => {
        setAlpha(a);
    }, []);

    const doApiSearchByLetter = async (SearchVel) => {
        try {
            setArResult([]);
            const url = API_MEAL_SEARCH_BY_LETTER + SearchVel;
            const { data } = await axios(url);
            console.log(data.meals);
            setArResult(data.meals);

        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <div className="flex flex-wrap justify-center space-x-2 mt-4">
            {alpha.map((x) => (
                <button
                    key={x}
                    onClick={() => {
                        doApiSearchByLetter(String.fromCharCode(x));
                    }}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-200 my-2"
                >
                    {String.fromCharCode(x)}
                </button>
            ))}
        </div>
    );
}
