import React, { useEffect, useState } from 'react'
import { EVENT_DELETE_URL__DELETE, EVENT_URL__GET_POST } from '../../../constant/constant';
import { errorToastGlobel, successToastGlobel } from '../../../utils/toastMes';
import AuthAdminComp from '../users/authAdminComp';



export default function EventListAdmin() {
    const [ar, setAr] = useState([])

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            const resp = await fetch(EVENT_URL__GET_POST)
            const data = await resp.json()
            setAr(data)
            successToastGlobel()
        } catch (error) {
            console.log(error);
            errorToastGlobel()
        }
    }

    const deleteItem = async (_delId) => {
        try {
            const data = await doApiMethod(EVENT_DELETE_URL__DELETE, "DELETE");
            if (data.deletedCount) {
                successToastGlobel()
                doApi();
            }
        }
        catch (error) {
            successToastGlobel()
            console.log(error);
        }
    }


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-9">
            <AuthAdminComp />
            <table className="w-full text-sm text-left ">
                <thead className="text-xs  uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Place
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Max Of Participant
                        </th>
                        <th scope="col" className="px-6 py-3">
                            del/edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        return (
                            <tr key={item.event_id} className="bg-t-white border-b hover:bg-gray-50 ">
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
                                    <button onClick={() => {
                                        if (window.confirm(`Delete ${item.title}?`)) { deleteItem(item.event_id) }
                                    }} className='bg-main  hover:bg-red-500  font-bold py-1 px-2 rounded'><i className="fa fa-trash-o" aria-hidden="true"></i>
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



