import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useApiHooks } from '../../hooks/useApiHooks';
import { USER_URL__GET_POST } from '../../constant/constant';
import { successToast } from '../../utils/toastMes';

export default function Signup() {
    const { useApiMethodAxios } = useApiHooks();
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubForm = (_bodyData) => {
        console.log(_bodyData);
        doApiPost(_bodyData);
    };

    const doApiPost = async (_bodyData) => {
        try {
            const data = await useApiMethodAxios(USER_URL__GET_POST, 'POST', _bodyData);
            console.log(data);
            if (data.fieldCount!=null) {
                successToast("successfully registered , Login please")
                nav('/login');
            }
        } catch (err) {
            console.log(err.response.data.code);
            if (err.response.data.code === 11000) {
                return toast.error('Email already in system please log in');
            }
            console.log(err);
            alert('There is a problem, come back later');
        }
    };

    return  (
        <div className="py-6 flex items-center justify-center ">
            <div className="max-w-lg w-full p-6 bg-white shadow-md rounded">
                <h1 className="text-4xl font-bold text-center ">Sign up</h1>
                <form onSubmit={handleSubmit(onSubForm)}>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            {...register('name', { required: true, minLength: 2 })}
                            className="w-full appearance-none bg-gray-200 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            placeholder="Jane"
                        />
                        {errors.name && <div className="text-red-500">* Enter a valid Name (min 2 chars)</div>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                            className="w-full appearance-none bg-gray-200 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            placeholder="example@end.co.il"
                        />
                        {errors.email && <div className="text-red-500">* Enter a valid email</div>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register('password', { required: true, minLength: 3 })}
                            className="w-full appearance-none bg-gray-200 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="password"
                            placeholder="******************"
                        />
                        {errors.password && (
                            <div className="text-red-500">* Enter a valid password (min 3 chars)</div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign Up
                        </button>
                    </div>
                    <Link className="block mt-4 text-blue-500 hover:underline lowercase" to="/login">I already have an account</Link>
                </form>
            </div>
        </div>
    );
}
