import React, { useEffect, useState } from 'react';
import { useApiHooks } from '../../../hooks/useApiHooks';
import axios from 'axios';

export default function MealCard(props) {
    const style = props.style || 'p-3 bg-white border border-gray-200 rounded-lg shadow text-white dark:bg-gray-800 dark:border-gray-700 mt-4 justify-between w-full md:w-1/3';

    const [meals, setMeals] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { useApiGetAxios } = useApiHooks();

    useEffect(() => {
        doApiMeal();
    }, []);

    const doApiMeal = async () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
        const data = await axios(url);
        console.log(data.data.meals[0], 'data');
        setMeals(data.data.meals[0]);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className={`mealCard min-h-full w-auto ${style}`}>
            <div className="detils-card flex flex-col-reverse md:flex-row text-black" >
                <div className="md:w-1/3 md:mr-4">
                    <h2 className="text-xl font-bold mb-2 text-center">{meals.strMeal}</h2>
                  {meals.strArea=="Unknown"||
                      <p className="text-center">{meals.strArea}</p>

                  }
                    <p className="text-center">
                        <a href={meals.strYoutube} target="_blank" rel="noopener noreferrer">
                            Watch Video
                        </a>
                    </p>
                    <p className="text-center">
                        <a href={meals.strSource} target="_blank" rel="noopener noreferrer">
                            View Recipe
                        </a>
                    </p>
                    <div className="btnIng font-bold mb-2 btnIngr">
                            <button
                                onClick={togglePopup}
                                className="block px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none text-left"
                            >
                                Ingredients
                            </button>
                    </div>
                </div>

                <div className="md:w-1/3">
                    <img
                        src={meals.strMealThumb}
                        alt={meals.strMeal}
                        className="rounded-lg w-full h-auto"
                    />
                </div>
            </div>

            <div className="Ingredients text-white">
                {isPopupOpen && (
                    <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white text-black p-4 rounded-lg">
                            {Object.keys(meals).map((key) => {
                                if (key.startsWith('strIngredient') && meals[key]) {
                                    const ingredientNumber = key.slice('strIngredient'.length);
                                    return (
                                        <p key={key}>
                                            {meals[key]} - {meals['strMeasure' + ingredientNumber]}
                                        </p>
                                    );
                                }
                                return null;
                            })}
                            <button
                                onClick={togglePopup}
                                className="block mt-4 px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
