import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_URL__POST } from '../../constant/constant';
import { useApiHooks } from '../../hooks/useApiHooks';
import { TOKEN_KEY } from '../../services/userService';
import { UserContext } from '../../context/userContext';
import { successToast } from '../../utils/toastMes';

export default function Login() {
  const nav = useNavigate();

  const { useApiMethodFetch,useApiMethodAxios } = useApiHooks();
  const { checkToken } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = (_bodyData) => {
    // console.log(_bodyData);
    doApiPost(_bodyData);
  }

  const doApiPost = async (_bodyData) => {
    try {
      const data = await useApiMethodAxios(LOGIN_URL__POST, 'POST', _bodyData);
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        checkToken();
        successToast("successfully connected")
        nav('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className="max-w-lg w-full p-6 bg-t-white shadow-md rounded">
        <h1 className="text-4xl font-bold text-center mb-8">Site Login</h1>
        <form onSubmit={handleSubmit(onSubForm)}>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
              className="w-full appearance-none bg-gray-200 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-t-white focus:border-gray-500"
              type="text"
              placeholder="example@end.co.il"
            />
            {errors.email && <div className="text-red-500">* Enter a valid email</div>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              {...register('password', { required: true, minLength: 3 })}
              className="w-full appearance-none bg-gray-200 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-t-white focus:border-gray-500"
              type="password"
              placeholder="******************"
            />
            {errors.password && (
              <div className="text-red-500">* Enter a valid password (min 3 chars)</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-secondary hover:bg-btn-hover text-t-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
          </div>
          <Link className="block mt-4 text-secondary hover:text-main hover:underline lowercase" to="/signup">I don't have an account</Link>
        </form>
      </div>
    </div>
  );
}
