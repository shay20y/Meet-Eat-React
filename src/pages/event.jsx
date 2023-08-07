import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EVENT_PATICIPANTS__GET, EVENT_SINGLE_URL__GET } from '../shared/constant/constant';
import { useApiHooks } from '../shared/hooks/useApiHooks';
import MealCard from '../shared/components/api/meals/mealCard';

export default function Event() {
  const [item, setItem] = useState({});
  const [p, setP] = useState({});
  const { useApiGetAxios } = useApiHooks();
  const params = useParams();

  useEffect(() => {
    doApi();
    doApiContP();
  }, [params]);

  const doApi = async () => {
    const url = EVENT_SINGLE_URL__GET + '/' + params["id"];
    const data = await useApiGetAxios(url);
    setItem(data[0]);
  };

  const doApiContP = async () => {
    const url = EVENT_PATICIPANTS__GET + '/' + item.event_id;
    const data = await useApiGetAxios(url);
    console.log(data[0]);
    setP(data[0]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="event-info md:w-2/3 w-auto mx-auto bg-white shadow-md rounded-md px-8 py-6 mb-4 md:mb-0 md:mr-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">{item.city}</p>
            <h5 className="text-xl font-bold text-gray-900">
              {/* {p.current_paticipants}/{p.max_paticipants} */}
            </h5>
          </div>
          <p className="text-gray-700 mt-4">{item.description}</p>
          <Link
            to={`/JoinToEvent/${item.event_id}`}
            href="#"
            className="inline-block mt-4 px-4 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Join
          </Link>
        </div>

        <MealCard
          style="p-3 bg-white border border-gray-200 rounded-lg shadow text-white dark:bg-gray-800 dark:border-gray-700 justify-between w-full md:w-1/3"
        />
      </div>
    </div>
  );
}
