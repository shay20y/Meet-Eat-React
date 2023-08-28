import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EVENT_URL__GET_POST, EVENT_URL__GET_POST_logged } from '../../constant/constant';
import { useApiHooks } from '../../hooks/useApiHooks';
import { errorToastGlobel } from '../../utils/toastMes';
import { UserContext } from '../../context/userContext';
import { useDate } from '../../hooks/useDate';

export default function EventList() {
  const { useApiGetAxios } = useApiHooks();
  const [ar, setAr] = useState([]);
  const { userInfo } = useContext(UserContext);

  const { useSetConvertEventDateR } = useDate()

  const nav = useNavigate();

  useEffect(() => {
    doApi();
  }, [userInfo]);

  const doApi = async () => {
    try {
      try {
        const url = localStorage["user_id"] ? EVENT_URL__GET_POST_logged + "/" + localStorage["user_id"] + '?date=1' : EVENT_URL__GET_POST  + '?date=1';
        const data = await useApiGetAxios(url);
        console.log(data);
        if (data.fatal === true) {
          return;
        }
        setAr(data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      errorToastGlobel();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 text
     sm:grid-cols-2 md:grid-cols-3">
      {ar.map((item, i) => {
        return (
          <div
            key={item.event_id}
            className="p-3 bg-t-white border rounded-lg text-t-black shadow  flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center">
                <h5 className="mb-3 text-2xl font-bold tracking-tight">
                  {item.title}
                </h5>
                <div>
                  {useSetConvertEventDateR(item.event_date)}
                </div>
              </div>
              <div className="w-auto justify-center items-center ">
                <h5 className="mb-2 text-1xl font-bold tracking-tight ">
                  {item.city}
                </h5>
                <h5 className="mb-2 text-1xl font-bold tracking-tight  text-center"></h5>
              </div>
              <p className="mb-3 font-normal   overflow-hidden text-ellipsis">
                {item.description}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => nav(`/event/${item.event_id}`)}  
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center  rounded-lg  hover:bg-btn-hover bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 text-t-white"
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
