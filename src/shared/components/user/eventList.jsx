import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EVENT_URL__GET_POST } from '../../constant/constant';
import { useApiHooks } from '../../hooks/useApiHooks';

export default function EventList() {
  const { useApiGetAxios } = useApiHooks();
  const [ar, setAr] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {
      const data = await useApiGetAxios(EVENT_URL__GET_POST);
      if (data.fatal === true) {
        return;
      }
      setAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {ar.map((item, i) => {
        return (
          <div
            key={item.event_id}
            className="p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
          >
            <div>
              <h5 className="mb-3 my text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <div className="w-auto justify-center items-center text-gray-900 dark:text-white">
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.city}
                </h5>
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white text-center"></h5>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis">
                {item.description}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => nav(`/event/${item.event_id}`)} // Call handleReadMore with the event_id
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-green-500 bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
              </button>
            </div>
          </div>
        );
      })}
    </div>
  )
    }
