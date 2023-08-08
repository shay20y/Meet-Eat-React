import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import useUserInfo from '../hooks/useUserData';

export default function ChackUserLogin() {
    const { userInfo } = useContext(UserContext);
    const {checkToken} = useUserInfo()

    const nav = useNavigate();


    useEffect(() => {
        console.log(userInfo);
        checkToken();
        if (userInfo.user_id == undefined){
            nav('/signup')
        }
    }, [])

    return (
        <>
        </>
    )
}
