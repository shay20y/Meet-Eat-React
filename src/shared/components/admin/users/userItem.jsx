import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { USER_ROLE_UPDATE_URL__PATCH, USER_URL__GET_POST_DELETE } from '../../../constant/constant';
import { useApiHooks } from '../../../hooks/useApiHooks';

export default function UserItem(props) {

    useEffect(()=>{

    },[])

    const { useApiMethodAxios } = useApiHooks();

    const doApiUsers = props.doApiUsers
    const item = props.item
    const i = props.i

    const [btnChangeRole, setBtnChangeRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");


    const onChangeBtn = (event) => {
        setSelectedRole(event.target.value)
        setBtnChangeRole(true)
    }

    const changeRole = async (userInfo, newRole) => {
        try {
            const url = `${USER_ROLE_UPDATE_URL__PATCH}/${userInfo.user_id}/${newRole}`;
            const data = await useApiMethodAxios(url, 'PATCH');
            if (data.fieldCount == 0) {
                doApiUsers();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async () => {
        try {
            const url = USER_URL__GET_POST_DELETE + '/' + item.user_id;
            const data = await useApiMethodAxios(url, 'DELETE');
            if (data.fieldCount != null) {
                doApiUsers();
            }
        } catch (error) {
            console.log(error);
            alert('There is a problem');
        }
    };

    return (
        <tr
            key={i}
            className='bg-t-white border-b '
        >
            <td className='whitespace-nowrap px-6 py-4'>{i + 1}</td>
            <td className='whitespace-nowrap px-6 py-4'>{item.user_id}</td>
            <td className='whitespace-nowrap px-6 py-4'>{item.name}</td>
            <td className='whitespace-nowrap px-6 py-4'>{item.email}</td>
            <td className="whitespace-nowrap px-6 py-4 text-black">
                <select  defaultValue={item.role}onChange={(event) => { onChangeBtn(event) }}>       
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                    <option value="banned">banned</option>
                </select>
                {btnChangeRole && (
                    <button
                        className="bg-transparent hover:bg-green-400 text-green-300 font-semibold hover: border border-green-300 hover:border-transparent rounded"
                        onClick={() => {
                            changeRole(item, selectedRole);
                            setBtnChangeRole(false);
                        }}
                    >
                        Confirm
                    </button>
                )}
            </td>
            <td className='px-6 py-4'>
                <button onClick={() => { if (window.confirm(`Delete ${item.name}?`)) { deleteItem(item.user_id) } }} className='btn btn-danger'>
                    X
                </button>
            </td>
            <td className='px-6 py-4'>
                <Link to={`/admin/user/events/${item.user_id}`}>
                    <i className='fa fa-arrow-left' aria-hidden='true'></i>
                </Link>
            </td>
        </tr>
    )
}
