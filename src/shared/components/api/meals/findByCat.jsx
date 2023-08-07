import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import MealListByProps from './mealListByProps';
import { API_LIST_AREA, API_LIST_CATWGORIES_ALL, API_MEAL_AREA, API_MEAL_CATEGORY, API_MEAL_SEARCH } from '../../../constant/constant';
import AbcBtns from './abcBtns';
import { errorToast, errorToastGlobel } from '../../../utils/toastMes';

export default function FindByCat() {
  const [arCat, setArCat] = useState([]);
  const [arArea, setArArea] = useState([]);

  const [arResult, setArResult] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    doApiCat();
    doApiArea();
    doApiSearch("a")
  }, []);

  const doApiCat = async () => {
    try {
      const { data } = await axios(API_LIST_CATWGORIES_ALL);
      setArCat(data.categories);
    } catch (error) {
      console.log(error);
      errorToastGlobel();
    }
  };

  const doApiCatList = async (cateName) => {
    try {
      setArResult([])
      const url = API_MEAL_CATEGORY + cateName;
      const { data } = await axios(url);
      console.log(data.meals);
      setArResult(data.meals)
    } catch (error) {
      console.log(error, 'error');
      errorToastGlobel();
    }
  };

  const doApiArea = async () => {
    const { data } = await axios(API_LIST_AREA);
    setArArea(data.meals);
  };

  const doApiAreaList = async (cateName) => {
    try {
      setArResult([])
      const url = API_MEAL_AREA + cateName;
      const { data } = await axios(url);
      setArResult(data.meals)
      console.log(errors);
    } catch (error) {
      console.log(error);
      errorToastGlobel();
    }
  };

  const onSubForm = (_bodyData) => {
    doApiSearch(_bodyData.Search);
  };

  const doApiSearch = async (SearchVel) => {
    try {
      setArResult([])
      const url = API_MEAL_SEARCH + SearchVel;
      const { data } = await axios(url);
      console.log(data);
      if (data.meals != null) {
        setArResult(data.meals);
      } else {
        errorToast("We couldn't find the recipe you were looking for");
      }
    } catch (error) {
      console.log(error);
      errorToastGlobel();
    }
  };

  return (
    <div className='my-8'>
      <div className="bg-orange-400 mb-4">
        <>
          <p className='text-2xl text-center p-3'>
            Welcome to Recipe Finder! you can search by area , categories or even by name
          </p>
        </>
        <div className="w-full flex justify-center ">
          <div className='w-2/3'>
            <div className="mb-6">
              <form onSubmit={handleSubmit(onSubForm)} className='flex'>
                <input
                  placeholder='Search a recipe'
                  {...register('Search', { required: false })}
                  className='w-full p-2 border border-gray-300 rounded'
                  type='text'
                  id='title'
                />
                <button className='text-white border border-gray-300  text-sm rounded-lg block  p-2.5 bg-blue-600 hover:bg-green-500'>
                  search
                </button>
              </form>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Find by area</label>
                <select
                  id='area'
                  onChange={(event) => doApiAreaList(event.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'

                >
                  <option defaultValue='select area'>select area</option>
                  {arArea.map((item) => (
                    <option key={item.strArea} value={item.strArea}>
                      {item.strArea}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Find by categories</label>
                <select
                  id='categories'
                  onChange={(event) => doApiCatList(event.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                >
                  <option defaultValue='select categories'>select categories</option>
                  {arCat.map((item) => (
                    <option key={item.idCategory} value={item.strCategory}>
                      {item.strCategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <p className='text-2xl text-center p-3'>
          or you can try our recipe dictonery
        </p>
        <AbcBtns setArResult={setArResult} />
      </div>


      <div className='flex flex-col-reverse'>
        {arResult != null && arResult.length != 0 ?
          <MealListByProps arr={arResult} />
          :
          <h1>loading....</h1>
        }
      </div>
    </div>
  );
}
