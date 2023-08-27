import { useEffect, useState } from 'react';
import { TOKEN_KEY, USER_CHACK_TOKEN_URL__GET, USER_INFO_KEY, USER_INFO_URL__GET } from '../constant/constant';
import { useApiHooks } from './useApiHooks';

export default function useUserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const [role , setRole] = useState("");
    const { useApiGetFetch } = useApiHooks();

    useEffect(() => {
        checkToken();
    }, []);
    
    const checkToken = async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            try {
                const url = USER_CHACK_TOKEN_URL__GET;
                const data = await useApiGetFetch(url);
                console.log(data);
                if (data != null) {
                    doApiUser();
                    setRole(data.role)
                }
            }
            catch {
                localStorage.removeItem[TOKEN_KEY]
                localStorage.removeItem[USER_INFO_KEY]
            }
        } else {

        }
    };

    const checkTokenAndReturn = async (setItem) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            try {
                const url = USER_CHACK_TOKEN_URL__GET;
                const data = await useApiGetFetch(url);
                setItem(data);
            }
            catch {
                localStorage.removeItem[TOKEN_KEY]
                localStorage.removeItem[USER_INFO_KEY]
            }
        }
    };


    const doApiUser = async () => {
        const data = await useApiGetFetch(USER_INFO_URL__GET);
        setUserInfo(data[0]);
        const d = data[0].user_id;
        localStorage.setItem(USER_INFO_KEY, d)
    };

    const userSignOut = () => {
        setRole("")
        setUserInfo({});
        localStorage.removeItem[TOKEN_KEY]
        localStorage.removeItem[USER_INFO_KEY]
    };

    return {
        userInfo,
        role,
        setRole,
        doApiUser,
        userSignOut,
        checkToken,
        checkTokenAndReturn
    };
}
