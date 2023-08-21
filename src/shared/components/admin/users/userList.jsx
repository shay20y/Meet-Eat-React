import React, { useEffect, useState } from 'react';
import AuthAdminComp from './authAdminComp';
import {  useSearchParams } from 'react-router-dom';
import {  USER_URL__GET_POST } from '../../../constant/constant';
import { useApiHooks } from '../../../hooks/useApiHooks';
import UserItem from './userItem';

export default function UserList() {
  const [ar, setAr] = useState([]);




  const { useApiGetFetch, useApiMethodFetch, useApiMethodAxios } = useApiHooks();

  const [query] = useSearchParams();

  useEffect(() => {
    doApiUsers();
  }, [query]);

  const doApiUsers = async () => {
    const page = query.get('page') || 1;
    try {
      const data = await useApiGetFetch(USER_URL__GET_POST);
      console.log(data);
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };





  return (

    <div className='container relative'>
      <AuthAdminComp/>
      <h1 className='text-4xl font-bold my-8 text-center'>List of users in the system</h1>
      <div className='overflow-x-auto'>
        <div className='w-full overflow-hidden'>
          <table className='table-auto w-full text-sm text-left '>
            <thead className='text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-white'>
              <tr>
                <th className='px-6 py-4'>#</th>
                <th className='px-6 py-4'>id</th>
                <th className='px-6 py-4'>Name</th>
                <th className='px-6 py-4'>Email</th>
                <th className='px-6 py-4'>Role</th>
                <th className='px-6 py-4'>Delete</th>
                <th className='px-6 py-4'>his events</th>
              </tr>
            </thead>
            <tbody>
              {ar.map((item, i) => {
                return (
                  <UserItem item={item} i={i} key={i} doApiUsers={doApiUsers}/>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>







  );
}
