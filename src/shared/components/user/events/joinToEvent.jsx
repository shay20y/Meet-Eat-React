import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApiHooks } from '../../../hooks/useApiHooks';
import useUserInfo from '../../../hooks/useUserData';
import { EVENT_JOIN__POST } from '../../../constant/constant';

export default function JoinToEvent() {
    const { useApiMethodAxios } = useApiHooks();
    const [sended, setSended] = useState(false);
    const { checkToken } = useUserInfo();
    const params = useParams();

    useEffect(() => {
        checkToken();
        doApi();
    }, [params, sended]);

    const doApi = async () => {
        try {
            const url = EVENT_JOIN__POST + '/' + params['id'];
            const data = await useApiMethodAxios(url, 'PATCH');
            if (data.fieldCount != null) {
                setSended(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {sended ? (
                <div className="bg-green-200 text-green-800 px-4 py-2 rounded">
                    Event join request was successful!
                </div>
            ) : (
                <div className="bg-red-200 text-red-800 px-4 py-2 rounded">
                    Custom message for when the event join request was not successful.
                </div>
            )}
        </div>
    );
}
