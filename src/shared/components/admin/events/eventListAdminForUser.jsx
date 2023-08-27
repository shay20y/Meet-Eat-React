import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useApiHooks } from '../../../hooks/useApiHooks';
import { EVENT_DELETE_URL__DELETE, USER_EVENT_URL__GET,USER_EVENT_URL_ADMIN_GET } from '../../../constant/constant';
import { errorToastGlobel, successToastGlobel } from '../../../utils/toastMes';

export default function EeventListAdminForUser() {
    const [ar, setAr] = useState([])
    const { useApiGetAxios ,useApiMethodAxios} = useApiHooks();
    const params = useParams();

    useEffect(() => {
        doApi();
    }, [params])

    const doApi = async () => {
        try {
            const url = USER_EVENT_URL_ADMIN_GET+"/"+params["id"];
            const data = await useApiGetAxios(url);
            console.log(data);
            setAr(data)
            successToastGlobel()
        } catch (error) {
            console.log(error);
            errorToastGlobel()
        }
    }
    
    const deleteItem = async (_delId) => {
        try {
            const url = EVENT_DELETE_URL__DELETE+"/"+_delId
            if ( window.confirm("Delete item?")) {
                const data = await useApiMethodAxios(url, "DELETE");
                if (data.insertId!=null) {
                    doApi();
                    successToastGlobel()
                }
            }
        }
        catch (error) {
            console.log(error);
            errorToastGlobel()
        }
    }


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left  ">
            <thead className="text-xs  uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-4">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                        Place
                    </th>
                    <th scope="col" className="px-6 py-4">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-4">
                        Max Of Participant
                    </th>
                    <th scope="col" className="px-6 py-4">
                        del/edit
                    </th>
                </tr>
            </thead>
            <tbody>
                {ar.map((item, i) => {
                    return (
                        <tr key={item.event_id} className="bg-t-white border-b hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                            {item.title}
                            </th>
                            <td className="px-6 py-4">
                            {item.city}
                            </td>
                            <td className="px-6 py-4">
                            {item.description.substring(0, 30)}..
                            </td>
                            <td className="px-6 py-4">
                                {item.max_paticipants}
                            </td>
                            <td className="px-6 py-4 ">
                            <button onClick={()=>{
                                deleteItem(item.event_id)
                            }}  className='hover:bg-red-500 bg-main   font-bold py-1 px-2 rounded'><i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}