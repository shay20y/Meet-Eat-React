import React, { useEffect, useState } from 'react';
import { API_MEAL_SEARCH_BY_LETTER } from '../../../constant/constant';
import axios from 'axios';

export default function AbcBtns({ doApiG }) {
    const [alpha, setAlpha] = useState([]);

    const a = Array.from(Array(26)).map((e, i) => i + 65);
    
    useEffect(() => {
        setAlpha(a);
    }, []);

    const doApiSearchByLetter = async (SearchVel) => {
        doApiG()
    };

    

    return (
        <div className="flex flex-wrap justify-center space-x-2 mt-4">
            {alpha.map((x) => (
                <button
                    key={x}
                    onClick={() => {
                        doApiG(String.fromCharCode(x),3);
                    }}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-200 my-2"
                >
                    {String.fromCharCode(x)}
                </button>
            ))}
        </div>
    );
}
