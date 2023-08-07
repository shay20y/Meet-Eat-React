import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function ChackUserLogin() {
    const { userInfo } = useContext(UserContext);

    const nav = useNavigate();


    useEffect(() => {
        if (userInfo.user_id == undefined){
            nav('/signup')
        }
    }, [])

    return (
        <>
        </>
    )
}
