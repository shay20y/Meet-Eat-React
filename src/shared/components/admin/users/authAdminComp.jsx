import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {USER_CHACK_TOKEN_URL__GET} from '../../../constant/constant'
import { useApiHooks } from '../../../hooks/useApiHooks';

export default function AuthAdminComp() {
const {useApiGetAxios} = useApiHooks();

    const nav = useNavigate();

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            const url = USER_CHACK_TOKEN_URL__GET;
            const data = await useApiGetAxios(url);
            if (data.role != "admin") {
                nav("/login")
            }
        } catch (error) {
            nav("/admin")
            console.log(error);
        }
    }

    return (
        <React.Fragment></React.Fragment>
    )
}