import React, { useContext, useEffect, useState } from 'react'
import { useApiHooks } from '../../../hooks/useApiHooks';
import { useParams } from 'react-router-dom';
import ChackUserLogin from '../../../utils/chackUserLogin';
import { EVENT_USERS_APPROVE_URL__PATCH, USER_EVENT_PARTICIPANTS_URL__GET } from '../../../constant/constant';
import { UserContext } from '../../../context/userContext';
import { errorToastGlobel, successToastGlobel } from '../../../utils/toastMes';

export default function ManagePaticipants() {

    const [ar, setAr] = useState([]);
    const { useApiGetAxios, useApiMethodAxios } = useApiHooks();
    const params = useParams();



    useEffect(() => {
        <ChackUserLogin />
        doApi();
    }, [params]);


    const doApi = async () => {
        try {
            const url = USER_EVENT_PARTICIPANTS_URL__GET + '/' + params['id'];
            const data = await useApiGetAxios(url);
            console.log(data, 'data');
            setAr(data);
        } catch (error) {
            console.log(error);
            errorToastGlobel();
        }
    };

    const doApiApproval = async (event_id, user_id) => {
        try {
            const url = EVENT_USERS_APPROVE_URL__PATCH
            const data = await useApiMethodAxios(url, 'PATCH', {
                "user_id": user_id,
                "event_id": event_id
            })
            console.log(data, 'data');
            if (data.fieldCount != null) {
                successToastGlobel();
                doApi();
            }
        } catch (error) {
            console.log(error);
            errorToastGlobel();
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-7">
            <div className="w-full overflow-hidden">
                <div className="w-full overflow-x-auto ">
                    {ar.length > 0 ? (
                        <table className="w-full text-sm text-left table-auto min-w-full divide-y divide-gray-200 text-black ">
                            <thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                        name
                                    </th>
                                    <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                        email
                                    </th>
                                    <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                        approved
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ar.map((item, i) => {
                                    return (
                                        <tr
                                            key={`${item.event_id}-${i}`}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">{item.name}</td>
                                            <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">{item.email}</td>
                                            <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                                {item.approved === 1 ? (
                                                    <h3 className="text-green-500 font-semibold">Join successfully</h3>
                                                ) : (
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                                        onClick={() => {
                                                            doApiApproval(item.event_id, item.user_id);
                                                        }}
                                                    >
                                                        Request approval
                                                    </button>
                                                )}
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p>No events found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
