import React, { useContext, useEffect, useState } from 'react'
import { useApiHooks } from '../../../hooks/useApiHooks';
import { UserContext } from '../../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { EVENT_DELETE_URL__DELETE, USER_EVENT_URL__GET , USER_CHACK_TOKEN_URL__GET} from '../../../constant/constant';
import ChackUserLogin from '../../../utils/chackUserLogin';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import EventsGlobelList from './eventsGlobelList';
import { errorToast, errorToastGlobel } from '../../../utils/toastMes';

export default function ManageEvents() {
    const [arAll, setArAll] = useState([]);
    const [arMange, setArMange] = useState([]);
    const [role, setRole] = useState("");
    const { useApiGetAxios, useApiMethodAxios } = useApiHooks();
    const { userInfo } = useContext(UserContext);

    const nav = useNavigate();

    useEffect(() => {
        doApiAll();
        doApiMange();
        getRole();
    }, [userInfo]);

    const getRole = async () =>{
        try {
            const url = `${USER_CHACK_TOKEN_URL__GET}`;
            const data = await useApiGetAxios(url);
            setRole(data?.role);
        } catch (error) {
            console.log(error);
            errorToastGlobel();
        }
    }

    const doApiAll = async () => {
        try {
            const url = `${USER_EVENT_URL__GET}`;
            const data = await useApiGetAxios(url);
            setArAll(data);
        } catch (error) {
            console.log(error);
            errorToastGlobel();
        }
    };

    const doApiMange = async () => {
        try {
            const url = `${USER_EVENT_URL__GET}?host=1`;
            const data = await useApiGetAxios(url);
            setArMange(data);
        } catch (error) {
            console.log(error);
            errorToastGlobel();
        }
    };

    const deleteItem = async (_delId) => {
        try {
            const url = EVENT_DELETE_URL__DELETE + '/' + _delId;
            const data = await useApiMethodAxios(url, 'DELETE');
            if (data.insertId !== null) {
                doApiMange();
                doApiAll();
            }
        } catch (error) {
            console.log(error);
            errorToast('There was a problem');
        }
    };

    return (
        <>
            <ChackUserLogin />
            <Accordion className=''>
                <AccordionItem className={'bg-secondary text-t-white  text-center m-5 p-2 text-2xl rounded-xl hover:bg-purple-500 '}

                    header={({ state }) => `${state.isEnter ? "⮝" : "⮟"} All of my events ${state.isEnter ? "⮝" : "⮟"}`}
                >
                    <EventsGlobelList arr={arAll} />
                </AccordionItem>

                <AccordionItem className={'bg-secondary text-center text-t-white  m-5 p-2 text-2xl rounded-xl hover:bg-purple-500 '} header={({ state }) => `${state.isEnter ? "⮝" : "⮟"}  Mange your events ${state.isEnter ? "⮝" : "⮟"}`}>
                    <div className="relative overflow-x-auto  sm:rounded-lg py-7">
                        <div className="w-full overflow-hidden">
                            <div className="w-full overflow-x-auto">
                                {arMange.length > 0 ? (
                                    <table className="w-full text-sm text-left text-black  table-auto min-w-full divide-y divide-gray-200">
                                        <thead className="text-xs uppercase bg-gray-50 ">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                                                >
                                                    Title
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                                                >
                                                    Place
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                                                >
                                                    Description
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                                                >
                                                    Max Of Participant
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                                                >
                                                    Manage Participants
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6"
                                                >
                                                    del/edit
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {arMange.map((item, i) => {
                                                return (
                                                    <tr
                                                        key={item.event_id + i + 1}
                                                        className="bg-t-white border-b hover:bg-gray-50 "
                                                    >
                                                        <th
                                                            scope="row"
                                                            className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 font-medium whitespace-nowrap "
                                                        >
                                                            {item.title}
                                                        </th>
                                                        <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                                            {item.city}
                                                        </td>
                                                        <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                                            {item.description.substring(0, 30)}..
                                                        </td>
                                                        <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                                            {item.max_paticipants}
                                                        </td>
                                                        <td className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6">
                                                            <button
                                                                onClick={() => {
                                                                    nav('/ManagePaticipants/' + item.event_id);
                                                                }}
                                                                className="bg-main hover:bg-btn-hover font-bold py-1 px-2 rounded"
                                                            >
                                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                            </button>
                                                        </td>
                                                        {/* px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 */}
                                                        <td className="">
                                                            <button
                                                                onClick={() => {
                                                                    if (window.confirm(`Delete ${item.title}?`)) { deleteItem(item.event_id); }
                                                                }}
                                                                className="bg-orange-500 hover:bg-red-500 font-bold p-2 rounded"
                                                            >
                                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                            </button>
                                                            &nbsp;
                                                            &nbsp;
                                                            <button
                                                                onClick={() => {
                                                                    nav('/myEvent/edit/' + item.event_id);
                                                                }}
                                                                className="bg-main hover:bg-btn-hover font-bold p-2 rounded"
                                                            >
                                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No events found</p>
                                )}
                            </div>
                        </div>
                    </div>
                </AccordionItem>
                {/* <AccordionItem className={''} header="Why do we use it?"> 
                </AccordionItem> blank Accordion Item for referance */}
            </Accordion>
                {role == "admin"?
                <button onClick={() => nav(`/admin/users`)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center  rounded-lg  hover:bg-btn-hover bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 text-t-white">
                Move to Admin 
              </button>
               :<></>}
        </>
    );
}
