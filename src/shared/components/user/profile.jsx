import React, { useEffect, useState } from 'react'
import { USER_INFO_URL__GET } from '../../constant/constant'
import { useApiHooks } from '../../hooks/useApiHooks'

export default function Profile() {

    const [data, setData] = useState({});
    const { useApiGetAxios } = useApiHooks();
    useEffect(() => {
        doApi()
    }, [])


    const doApi = async () => {
        const url = USER_INFO_URL__GET
        const data = await useApiGetAxios(url)
        console.log(data[0]);
        setData(data[0])
    }
    return (
        <div class="flex items-center justify-center">

            <div class="max-w-xs">
                <div class="bg-white shadow-xl rounded-lg py-3">
                    <div class="p-2 text-center">
                        <i className="fa fa-user rounded-full mx-auto text-9xl" aria-hidden="true"></i>
                    </div>
                    <div class="p-2">
                        <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{data.name}</h3>
                        <table class="text-xs my-3">
                            <tbody>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                    <td class="px-2 py-2">{data.email}</td>
                                </tr>
                            </tbody></table>

                    </div>
                </div>
            </div>

        </div>
    )
}
