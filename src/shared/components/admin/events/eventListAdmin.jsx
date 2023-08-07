import React, { useEffect, useState } from 'react'
import { EVENT_DELETE_URL__DELETE, EVENT_URL__GET_POST } from '../../../constant/constant';

export default function EventListAdmin() {
    const [ar, setAr] = useState([])

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            const resp = await fetch(EVENT_URL__GET_POST)
            const data = await resp.json()
            console.log(data);
            setAr(data)

        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (_delId) => {
        try {
            if ( window.confirm("Delete item?")) {
                const data = await doApiMethod(EVENT_DELETE_URL__DELETE, "DELETE");
                if (data.deletedCount) {
                    doApi();
                }
            }
        }
        catch (error) {
            console.log(error);
            alert("There problem")
        }
    }


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        <tr key={item.event_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                            }}  className='bg-red-500 hover:bg-blue-700  text-white font-bold py-1 px-2 rounded'><i className="fa fa-trash-o" aria-hidden="true"></i>
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



