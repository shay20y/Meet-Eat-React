import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useApiHooks } from '../hooks/useApiHooks';
import { USER_CHACK_TOKEN_URL__GET } from '../constant/constant';

export default function ChackUserLogin() {
    const {useApiGetAxios} = useApiHooks();
    const nav = useNavigate();


    useEffect(() => {       
        getTokenData()
    }, [])


    const getTokenData = async () => {
        try {
            const url = USER_CHACK_TOKEN_URL__GET;
            const data = await useApiGetAxios(url);
            if (data.role == "user") {
              
            }
        } catch (error) {
            nav("/login")
            console.log(error);
        }
    }


    return (
        <>
        </>
    )
}
