import React, { useContext, useEffect, useState } from 'react'
import { useApiHooks } from '../../../hooks/useApiHooks';
import { useNavigate, useParams,useSearchParams,Link } from 'react-router-dom';
import ChackUserLogin from '../../../utils/chackUserLogin';
import { EVENT_USERS_APPROVE_URL__PATCH, USER_EVENT_PARTICIPANTS_URL__GET } from '../../../constant/constant';
import { UserContext } from '../../../context/userContext';
import { errorToastGlobel, successToastGlobel } from '../../../utils/toastMes';

export default function ManagePaticipants() {

    const [ar, setAr] = useState([]);
    const { useApiGetAxios, useApiMethodAxios } = useApiHooks();
    const params = useParams();
    const [query] = useSearchParams();
    const nav = useNavigate();



    useEffect(() => {
        doApi();
    }, [params]);


    const doApi = async () => {
        try {
            const host = query.get("host")?"?host=1":"";
            const url = USER_EVENT_PARTICIPANTS_URL__GET + '/' + params['id']+host;
            const data = await useApiGetAxios(url);
            setAr(data);
        } catch (error) {
            console.log(error);
            errorToastGlobel();
        }
    };

    const doApiApproval = async (event_id, user_id) => {
        const bodyData = {
            "user_id": user_id,
            "event_id": event_id
        }
        try {
            const url = EVENT_USERS_APPROVE_URL__PATCH
            const data = await useApiMethodAxios(url, 'PATCH', bodyData)
            ;
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
        <>
            <ChackUserLogin />
            <div className="relative overflow-x-auto  sm:rounded-lg py-7">
                <div className="w-full overflow-hidden">
                    <div className="w-full overflow-x-auto ">
                        {ar.length > 0 ? (
                            <table className="w-full text-sm text-left table-auto min-w-full divide-y divide-gray-200 text-black ">
                                <thead className="text-xs  uppercase bg-gray-50 ">
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
                                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                            contact
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ar.map((item, i) => {
                                        return (
                                            <tr
                                                key={`${item.event_id}-${i}`}
                                                className="bg-t-white border-b  hover:bg-gray-50 "
                                            >
                                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">{item.name}</td>
                                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">{item.email}</td>
                                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                                    {item.approved === 1 ? (
                                                        <h3 className="text-green-500 font-semibold">Join successfully</h3>
                                                    ) : (
                                                        <button
                                                            className="bg-secondary hover:bg-btn-hover text-t-white font-semibold py-2 px-4 rounded"
                                                            onClick={() => {
                                                                doApiApproval(params['id'], item.user_id);
                                                            }}
                                                        >
                                                            Request approval
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"><Link className='text-t-black font-bold' to={`/test?id=`+item.user_id}>Go talk</Link></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <p>No events found</p>
                        )}
                    </div>
                    <button onClick={() => { nav(-1) }} className="bg-secondary hover:bg-btn-hover text-t-white font-bold py-2 px-4 rounded mt-5">
                        go back
                    </button>
                </div>
            </div>
        </>
    );
}
