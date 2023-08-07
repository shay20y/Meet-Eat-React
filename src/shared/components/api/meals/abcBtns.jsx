import React, { useEffect, useState } from 'react';
import { API_MEAL_SEARCH_BY_LETTER } from '../../../constant/constant';
import axios from 'axios';

export default function AbcBtns({ setArResult }) {
    const [alpha, setAlpha] = useState([]);

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

    const a = Array.from(Array(26)).map((e, i) => i + 65);

    return (
        <div className="flex justify-center space-x-2 mt-4">
            {alpha.map((x) => (
                <button
                    key={x}
                    onClick={() => {
                        doApiSearchByLetter(String.fromCharCode(x));
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    {String.fromCharCode(x)}
                </button>
            ))}
        </div>
    );
}
