import React, { useEffect, useState } from 'react';
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
        setMeals(data.data.meals[0]);
    };

    return (
        <div className="md:w-[48%] w-[100%] lg:w-[31%] h-fit px-8 py-6 mb-4  rounded-md bg-t-white">
            <Link to={`/singleMeal/${meals.idMeal}`}>
                <img width={"100%"} src={meals.strMealThumb} alt={meals.strMeal} />
                <h2 className='text-lg text-center'>{meals.strMeal}</h2>
            </Link>
        </div>
    );
}
