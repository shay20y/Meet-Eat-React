// import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL__POST, TOKEN_KEY } from '../../../constant/constant';
import { useApiHooks } from '../../../hooks/useApiHooks';
import { UserContext } from '../../../context/userContext';

export default function LoginAdmin() {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { useApiMethodFetch } = useApiHooks();
    const { checkToken } = useContext(UserContext);

    const onSubForm = (_bodyData) => {
        doApiPost(_bodyData);
    }

    const doApiPost = async (_bodyData) => {
        try {
            const data = await useApiMethodFetch(LOGIN_URL__POST, "POST", _bodyData)
            if (data.token) {
                localStorage.setItem(TOKEN_KEY, data.token);
                checkToken();
                nav("/admin/users")
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='container'>
            <h1 className='display-4 text-center'>Login to admin</h1>
            <form className="bg-t-white max-w-lg shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubForm)}>
                <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2">
                        Email
                    </label>
                    <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder='example@end.co.il' />
                    {errors.email && <div className="text-danger">* Enter valid email</div>}
                </div>
                <div className="mb-6">
                    <label className="block  text-sm font-bold mb-2" >
                        Password
                    </label>
                    <input {...register("password", { required: true, minLength: 3 })} className="shadow appearance-none border  rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" />
                    {errors.password && <div className="text-danger">* Enter valid password (min 3 chars)</div>}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-main  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}