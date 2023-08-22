import React, { useContext, useEffect, useState } from 'react';
import { EVENT_URL__GET_POST } from '../../../constant/constant';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApiHooks } from '../../../hooks/useApiHooks';
import { UserContext } from '../../../context/userContext';
import ChackUserLogin from '../../../utils/chackUserLogin';
import { useDate } from '../../../hooks/useDate';
import { errorToastGlobel, successToast } from '../../../utils/toastMes';

export default function CreateEvent() {
  const { useApiMethodAxios } = useApiHooks();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { userInfo } = useContext(UserContext);
  const [defaultDate, setDefaultDate] = useState('');

  const { useSetDefaultData } = useDate()

  const nav = useNavigate();


  useEffect(() => {
    if (userInfo == null) {
      nav('/login');
    }
    // deDate();
    useSetDefaultData(setDefaultDate);
  }, [userInfo]);



  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    doApiPost(_bodyData);
  };


  const doApiPost = async (_bodyData) => {
    try {
      const url = EVENT_URL__GET_POST;
      const data = await useApiMethodAxios(url, 'POST', _bodyData);
      if (data.insertId != null) {
        successToast("You have successfully posted")
        nav('/');
      }
    } catch (error) {
      console.log(error);
      errorToastGlobel();
    }
  };

  return (
    <>
      <ChackUserLogin />
      <div className="container mx-auto">
        <form onSubmit={handleSubmit(onSubForm)} className="max-w-md mx-auto p-6 bg-t-white">
          <div>
            <h2 className="text-4xl font-bold text-center mb-8 pt-6">Add a New Event</h2>
          </div>
          <div className="mb-4">
            <label for="title" className="block mb-2">Title</label>
            <input {...register("title", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="text" id="title" />
            {errors.title && <div className="text-red-500 mt-1">* Enter a valid title</div>}
          </div>

          <div className="mb-4">
            <label for="city" className="block mb-2">City</label>
            <input {...register("city", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="text" id="city" />
            {errors.city && <div className="text-red-500 mt-1">* Enter a valid city</div>}
          </div>

          <div className="mb-4 flex items-center">
            <label for="adress" className="block mr-2">adress</label>
            <input {...register("adress", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="text" id="adress" />
          </div>

          <div className="mb-4">
            <label for="description" className="block mb-2">Description</label>
            <textarea {...register("description", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" id="description"></textarea>
            {errors.description && <div className="text-red-500 mt-1">* Enter a valid description</div>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label for="max_paticipants" className="block mb-2">Max Participants</label>
              <input {...register("max_paticipants", { required: true, min: 1 })} className="w-full p-2 border border-gray-300 rounded" type="number" id="max_paticipants" />
              {errors.max_paticipants && <div className="text-red-500 mt-1">* Enter a valid max participants</div>}
            </div>

            <div className="mb-4">
              <label for="event_date" className="block mb-2">Event Date</label>
              <input {...register("event_date", { required: true })} min={defaultDate} defaultValue={defaultDate} className="w-full p-2 border border-gray-300 rounded" type="date" id="event_date" />
              {errors.event_date && <div className="text-red-500 mt-1">* Enter a valid event date</div>}
            </div>
          </div>

          <button className=" px-4 py-2 rounded bg-secondary hover:bg-btn-hover">Add new</button>
        </form>
      </div>
    </>

  )
}
