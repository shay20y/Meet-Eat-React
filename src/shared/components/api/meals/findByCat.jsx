import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import MealListByProps from './mealListByProps';
import { API_LIST_AREA, API_LIST_CATWGORIES_ALL, API_MEAL_AREA, API_MEAL_CATEGORY, API_MEAL_SEARCH, API_MEAL_SEARCH_BY_LETTER } from '../../../constant/constant';
import AbcBtns from './abcBtns';
import { errorToastGlobel } from '../../../utils/toastMes';
import { useSearchParams } from 'react-router-dom';

export default function FindByCat() {
  const [arCat, setArCat] = useState([]);
  const [arArea, setArArea] = useState([]);
  const [arResult, setArResult] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    doApiCat();
    doApiArea();

    if (searchParams.get('s') != null && searchParams.get('c') != null) {
      doApiG(searchParams.get('s'), searchParams.get('c'))
    } else {
      doApiG('s', 3)
    }
  }, []);

  const doApiG = async (search, controler) => {
    setArResult([]);
    try {
      let url;
      if (controler == 0) {
        url = API_MEAL_CATEGORY + search;
      } else if (controler == 1) {
        url = API_MEAL_AREA + search;
      } else if (controler == 2) {
        url = API_MEAL_SEARCH + search;
      } else if (controler == 3) {
        url = API_MEAL_SEARCH_BY_LETTER + search
      }
      const { data } = await axios(url);
      setSearchParams({ s: search, c: controler })
      setArResult(data.meals)
    } catch (error) {
      console.log(error);
    }
  }

  const doApiCat = async () => {
    try {
      const { data } = await axios(API_LIST_CATWGORIES_ALL);
      setArCat(data.categories);
    } catch (error) {
      console.log(error);
      errorToastGlobel();
    }
  };

  const doApiArea = async () => {
    const { data } = await axios(API_LIST_AREA);
    setArArea(data.meals);
  };

  const onSubForm = (_bodyData) => {
    doApiG(_bodyData.Search, 2)
  };

  // const doApiCatList = async (cateName) => {
  //   try {
  //     setArResult([]);
  //     const url = API_MEAL_CATEGORY + cateName;
  //     const { data } = await axios(url);
  //     setArResult(data.meals);
  //   } catch (error) {
  //     console.log(error, 'error');
  //     errorToastGlobel();
  //   }
  // };

  // const doApiAreaList = async (area) => {
  //   try {
  //     setArResult([]);
  //     const url = API_MEAL_AREA + area;
  //     const { data } = await axios(url);
  //     setArResult(data.meals);
  //     console.log(errors);
  //   } catch (error) {
  //     console.log(error);
  //     errorToastGlobel();
  //   }
  // };



  // const doApiSearch = async (SearchVel) => {
  //   try {
  //     setArResult([]);
  //     const url = API_MEAL_SEARCH + SearchVel;
  //     const { data } = await axios(url);
  //     if (data.meals != null) {
  //       setArResult(data.meals);
  //       localStorage[LAST_SEARCH] = SearchVel
  //     } else {
  //       errorToast("We couldn't find the recipe you were looking for");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     errorToastGlobel();
  //   }
  // };

  return (
    <div className='my-8'>
      <div className="bg-main mb-4 border-b-2 border-t-black">
        <>
          <p className='text-2xl text-center p-3 text-t-white'>
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
                <button className=' border border-gray-300 rounded-lg block text-t-white p-2.5 bg-secondary hover:bg-btn-hover'>
                  search
                </button>
              </form>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label for="first_name" className="block mb-2  text-t-white font-medium ">Find by area</label>
                <select
                  id='area'
                  onChange={(event) => doApiG(event.target.value, 1)}
                  className='bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 '

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
                <label for="last_name" className="block mb-2  text-t-white font-medium ">Find by categories</label>
                <select
                  id='categories'
                  onChange={(event) => doApiG(event.target.value, 0)}
                  className='bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 '
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
        <p className='text-2xl  text-t-white text-center p-3'>
          or you can try our recipe dictonery
        </p>
        <AbcBtns doApiG={doApiG} />
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
