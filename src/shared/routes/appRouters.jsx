import React from 'react';
import HeaderAdmin from '../components/admin/admin_genaral/headerAdmin';
import Header from '../components/general/Header';
import Page404 from '../components/general/page404';
import Index from '../..';
import Login from '../components/user/login';
import Signup from '../components/user/signup';
import Event from '../../pages/event';
import EventListAdmin from '../components/admin/events/eventListAdmin';
import LoginAdmin from '../components/admin/users/loginAdmin';
import UserList from '../components/admin/users/userList';
import { BrowserRouter, Route, Routes } from 'react-router-dom/dist';
import EeventListAdminForUser from '../components/admin/events/eventListAdminForUser';
import CreateEvent from '../components/user/events/createEvent';
import EditEvent from '../components/user/events/editEvent';
import JoinToEvent from '../components/user/events/joinToEvent';
import ManageEvents from '../components/user/events/manageEvents';
import ManagePaticipants from '../components/user/events/managePaticipants';
import FindByCat from '../components/api/meals/findByCat';
import SingleMeal from '../components/api/meals/singleMeal';
import Profile from '../components/user/profile';
import Test from '../../test';
import Tests from '../components/admin/test';
// import SearchMapCanvas from '../components/api/map/searchMapCanvas';

export default function AppRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<HeaderAdmin />} />
        <Route path="/*" element={<Header />} />
      </Routes>
      <Routes>
        {/* admin */}
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/events" element={<EventListAdmin />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/user/events/:id" element={<EeventListAdminForUser />} />

        <Route path="/" element={<Index />} />
        <Route path="/manageEvents" element={<ManageEvents />} />
        <Route path="/ManagePaticipants/:id" element={<ManagePaticipants />} />
        <Route path="/myEvent/edit/:id" element={<EditEvent />} />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/JoinToEvent/:id" element={<JoinToEvent />} />


        <Route path="/test" element={<Tests />} />

        <Route path="/logIn" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<Profile />} />


        {/* api */}
        <Route path="/findByCat" element={<FindByCat />} />
        <Route path="/singleMeal/:id" element={<SingleMeal />} />
        <Route path="/test" element={<Test />} />


        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

