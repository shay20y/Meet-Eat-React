import React, { useEffect, useState } from 'react';
import { useApiHooks } from '../../../hooks/useApiHooks';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MealCard() {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        doApiMeal();
    }, []);

    const doApiMeal = async () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
        const data = await axios(url);
        console.log(data.data.meals[0], 'data');
        setMeals(data.data.meals[0]);
    };

    return (
        <div className="box md:w-[48%] w-[100%] lg:w-[31%]  p-3  md:m-1 m-5  shadow bg-white" key={meals.idMeal}>
            <Link to={`/singleMeal/${meals.idMeal}`}>
                <img width={"100%"} src={meals.strMealThumb} alt={meals.strMeal} />
                <h2 className='text-lg text-center'>{meals.strMeal}</h2>
            </Link>
        </div>
    );
}
