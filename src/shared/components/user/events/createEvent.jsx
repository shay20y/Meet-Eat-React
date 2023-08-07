import React, { useContext, useEffect, useState } from 'react';
import { EVENT_URL__GET_POST } from '../../../constant/constant';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApiHooks } from '../../../hooks/useApiHooks';
import { UserContext } from '../../../context/userContext';
import ChackUserLogin from '../../../utils/chackUserLogin';
import { useDate } from '../../../hooks/useDate';

export default function CreateEvent() {
  const { useApiMethodAxios } = useApiHooks();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { userInfo } = useContext(UserContext);
  const [defaultDate, setDefaultDate] = useState('');

  const {useSetDefaultData} = useDate()

  const nav = useNavigate();


  useEffect(() => {
    if (userInfo == null) {
      nav('/login');
    }
    // deDate();
    useSetDefaultData(setDefaultDate);
    <ChackUserLogin />
  }, [userInfo]);



  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData);
  };


  const doApiPost = async (_bodyData) => {
    try {
      const url = EVENT_URL__GET_POST;
      const data = await useApiMethodAxios(url, 'POST', _bodyData);
      if (data.insertId != null) {
        nav('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit(onSubForm)} className="max-w-md mx-auto px-4">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title</label>
          <input {...register("title", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="text" id="title" />
          {errors.title && <div className="text-red-500 mt-1">* Enter a valid title</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block mb-2">City</label>
          <input {...register("city", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="text" id="city" />
          {errors.city && <div className="text-red-500 mt-1">* Enter a valid city</div>}
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="adress" className="block mr-2">adress</label>
          <input {...register("adress", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="text" id="adress" />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea {...register("description", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" id="description"></textarea>
          {errors.description && <div className="text-red-500 mt-1">* Enter a valid description</div>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="max_paticipants" className="block mb-2">Max Participants</label>
            <input {...register("max_paticipants", { required: true, min: 1 })} className="w-full p-2 border border-gray-300 rounded" type="number" id="max_paticipants" />
            {errors.max_paticipants && <div className="text-red-500 mt-1">* Enter a valid max participants</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="event_date" className="block mb-2">Event Date</label>
            <input {...register("event_date", { required: true })} defaultValue={defaultDate} className="w-full p-2 border border-gray-300 rounded" type="date" id="event_date" />
            {errors.event_date && <div className="text-red-500 mt-1">* Enter a valid event date</div>}
          </div>
        </div>

        <button className="text-white px-4 py-2 rounded bg-blue-600 hover:bg-green-500">Add new</button>
      </form>
    </div>
  )
}