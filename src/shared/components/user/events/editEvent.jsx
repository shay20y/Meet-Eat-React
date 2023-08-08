import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useApiHooks } from '../../../hooks/useApiHooks';
import { EVENT_SINGLE_URL__GET, EVENT_URL__GET_POST } from '../../../constant/constant';
import { useDate } from '../../../hooks/useDate';
import { errorToastGlobel, successToastGlobel } from '../../../utils/toastMes';

export default function EditEvent() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [item, setItem] = useState({});
  const [defaultDate, setDefaultDate] = useState('');

  const params = useParams();
  const nav = useNavigate();
  
  const {useSetConvertEventDate , useGetToday} = useDate()
  const { useApiGetAxios, useApiMethodAxios } = useApiHooks();

  useEffect(() => {
    doApiInit();
  }, []);

 
  const doApiInit = async () => {
    try {
      const url = EVENT_SINGLE_URL__GET + '/' + params["id"];
      const data = await useApiGetAxios(url);
      console.log(data[0]);
      setItem(data[0]);
      useSetConvertEventDate(data[0].event_date,setDefaultDate);

    } catch (error) {
      console.log(error);
      errorToastGlobel();
    }
  };

  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    doApiEdit(_bodyData);
  };

  const doApiEdit = async (_bodyData) => {
    const strD = {
      "max_paticipants": _bodyData.max_paticipants,
      "title": _bodyData.title,
      "event_date": _bodyData.event_date,
      "description": _bodyData.description,
      "adress": _bodyData.adress,
      "city": _bodyData.city
    };
    try {
      const url = EVENT_URL__GET_POST + '/' + params["id"];
      const data = await useApiMethodAxios(url, "PUT", strD);
      console.log(data, 'data');
      if (data.fieldCount != null) {
        successToastGlobel();
        nav("/myEvent");
      }
    } catch (error) {
      console.log(error);
      errorToast("there problem");
    }
  };

  return (
    <div className='container'>
      <h1 className="text-2xl font-bold my-4">Edit category form</h1>
      {item.title ?
        <form onSubmit={handleSubmit(onSubForm)} className="max-w-md mx-auto">
          <div className="mb-4">
            <label for="title" className="block mb-2">Title</label>
            <input defaultValue={item.title} {...register("title", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="text" id="title" />
            {errors.title && <div className="text-red-500 mt-1">* Enter a valid title</div>}
          </div>

          <div className="mb-4">
            <label for="city" className="block mb-2">City</label>
            <input defaultValue={item.city} {...register("city", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="text" id="city" />
            {errors.city && <div className="text-red-500 mt-1">* Enter a valid city</div>}
          </div>

          <div className="mb-4">
            <label for="adress" className="block mb-2">adress</label>
            <input defaultValue={item.adress} {...register("adress", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="text" id="adress" />
            {errors.adress && <div className="text-red-500 mt-1">* Enter a valid adress</div>}
          </div>

          <div className="mb-4">
            <label for="description" className="block mb-2">Description</label>
            <textarea defaultValue={item.description} {...register("description", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" id="description"></textarea>
            {errors.description && <div className="text-red-500 mt-1">* Enter a valid description</div>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label for="max_paticipants" className="block mb-2">Max Participants</label>
              <input defaultValue={item.max_paticipants} {...register("max_paticipants", { required: true, minLength: 2 })} className="w-full p-2 border border-gray-300 rounded" type="number" id="max_paticipants" />
              {errors.max_paticipants && <div className="text-red-500 mt-1">* Enter a valid max participants</div>}
            </div>

            <div className="mb-4">
            <label for="event_date" className="block mb-2">Event Date</label>
            <input
              defaultValue={defaultDate}
              {...register("event_date", { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
              type="date"
              id="event_date"
              min={useGetToday()} 
            />
            {errors.event_date && <div className="text-red-500 mt-1">* Enter a valid event date</div>}
          </div>
          
          </div>

          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
        </form> : <h2>Loading...</h2>}
    </div>
  )
}
