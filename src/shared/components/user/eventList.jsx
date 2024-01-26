import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EVENT_WHITE_USER_INFO_URL__GET } from '../../constant/constant';
import { useApiHooks } from '../../hooks/useApiHooks';
import { errorToastGlobel } from '../../utils/toastMes';
import { UserContext } from '../../context/userContext';
import { useDate } from '../../hooks/useDate';

export default function EventList() {
  const { useApiGetAxios } = useApiHooks();
  const [ar, setAr] = useState([]);
  const { userInfo } = useContext(UserContext);

  const { useSetConvertEventDateR } = useDate();

  const nav = useNavigate();

  useEffect(() => {
    doApi();
  }, [userInfo]);

  const doApi = async () => {
    try {
      try {
        const url = EVENT_WHITE_USER_INFO_URL__GET;
        const data = await useApiGetAxios(url);
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {ar.map((item, i) => {
        return (
          <div
            key={i}
            className="p-3 bg-t-white border rounded-lg text-t-black shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center">
                <h5 className="mb-3 text-xl sm:text-2xl font-bold tracking-tight">
                  {item.title}
                </h5>
                <div>{useSetConvertEventDateR(item.event_date)}</div>
              </div>
              <div className="w-auto justify-center items-center">
                <h5 className="mb-2 text-base sm:text-lg font-bold tracking-tight text-center">
                  {item.city}
                </h5>
                {/* Additional content for the text can be added here */}
              </div>
              <p className="mb-3 font-normal text-sm sm:text-base overflow-hidden truncate">
                {item.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-2 sm:mb-0 font-bold">
                {item.current_particepants - 1}/{item.max_paticipants} participants
              </div>
              <button
                onClick={() => nav(`/event/${item.event_id}`)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg hover:bg-btn-hover bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 text-t-white"
              >
                Read more
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
