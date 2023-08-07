// import logo from './logo.svg';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { UserContext } from './shared/context/userContext';
import useUserData from './shared/hooks/useUserData';
import AppRouters from './shared/routes/appRouters';
import 'react-toastify/dist/ReactToastify.css';



function App() {
const {doApiUser,userInfo,userSignOut ,checkToken} = useUserData()

  return (

    
    <UserContext.Provider value={{
      userInfo,
      doApiUser , userSignOut , checkToken
    }}>
      <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <AppRouters />
          </div>
        </main>
        <ToastContainer theme="colored" />
    </UserContext.Provider>
  );
}

export default App;
