import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate,useSearchParams } from 'react-router-dom';
import { useApiHooks } from './shared/hooks/useApiHooks';
import {  USER_URL__GET_POST } from './shared/constant/constant';
import { successToast, errorToast } from './shared/utils/toastMes';
import axios from 'axios';
import ChackUserLogin from './shared/utils/chackUserLogin';

export default function Test() {
  const { useApiMethodAxios } = useApiHooks();
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [arEmail, setArEmail] = useState([]);
  const [query] = useSearchParams();

  useEffect(() => {
    getUsers();
  }, []);

  const onSubForm = (_bodyData) => {
    //console.log(_bodyData);
    doApiPost(_bodyData);
  };

  const getUsers = async () =>{
    try{
      let { data } = await axios(USER_URL__GET_POST);
      if(query.get("id")){
        data = data.filter((item) => item.user_id == query.get("id"))
      }
      console.log(data)
      setArEmail(data);
    }
    catch(err){
      console.log(error);
      errorToastGlobel();
    }
  }

  const doApiPost = async (_bodyData) => {
    try {
      const data = await useApiMethodAxios('http://localhost:3001/users/sendMail', 'POST', _bodyData);
      successToast("email sent")
    } catch (err) {
      console.log(err.response.data.code);
      errorToast('Email already in system please log in');
    }
  };

  return (
    <div className="py-6 flex items-center justify-center ">
      <ChackUserLogin />
      <div className="max-w-lg w-full p-6 bg-t-white shadow-md rounded">
        <h1 className="text-4xl font-bold text-center ">Send an Email</h1>
        <form onSubmit={handleSubmit(onSubForm)}>
          <div className="mb-6">
            <label for="first_name" className="block text-sm font-bold mb-2">User</label>
            <select id='area'  
              className='bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 '
              {...register('email',{required: true,validate: (value, formValues) => value != 'Select a User'})}>        
              {query.get("id")?<></>:<option defaultValue='select area'>Select a User</option>}
              {arEmail?.map((item) => (
                    <option key={item.user_id} value={item.email}>
                      {item.name} - {item.role}
                    </option>
                  ))}
            </select>
            {errors.email && <div className="text-red-500">* please select a user to Addres</div>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" for="email">
              Subject
            </label>
            <input
              {...register('subject', { required: true, minLength: 3 })}
              className="w-full appearance-none bg-gray-200 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-t-white focus:border-gray-500"
              type="text"
              placeholder="are you coming to the event"
            />
            {errors.subject && <div className="text-red-500">* Enter a valid subject (at least 3 charectors)</div>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" for="password">
              Text
            </label>
            {/* <input
              
              className="w-full appearance-none bg-gray-200 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-t-white focus:border-gray-500"
              type="text"
              placeholder="******************"
            /> */}
            <textarea {...register('text', { required: true, minLength: 3 })}
              className="w-full appearance-none bg-gray-200 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-t-white focus:border-gray-500"></textarea>
            {errors.text && (
              <div className="text-red-500">* Enter  valid text</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-secondary hover:bg-btn-hover text-t-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
