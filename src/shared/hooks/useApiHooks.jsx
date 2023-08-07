import axios from 'axios';
import { TOKEN_KEY } from '../services/userService';

export const useApiHooks = () => {

  const useApiMethodFetch = async (_url, _method, _body) => {
    try {
      const respMethod = {
        method: _method,
        body: JSON.stringify(_body),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": localStorage.getItem(TOKEN_KEY),
        },
      };
      const response = await fetch(_url, respMethod);
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  const useApiGetFetch = async (_url) => {
    try {
      const respMethod = {
        method: "GET",
        headers: {
          "x-api-key": localStorage[TOKEN_KEY]
        }
      };
      const response = await fetch(_url, respMethod);
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };  

  const useApiMethodAxios = async (_url, _method, _body) => {
    try {
      const resp = await axios({
        url: _url,
        method: _method,
        data: _body,
        headers: {
          "x-api-key": localStorage[TOKEN_KEY]
        }
      });
      return resp.data;
    } catch (err) {
      throw err;
    }
  };

  const useApiGetAxios = async (_url) => {
    try {
      const resp = await axios({
        url: _url,
        headers: {
          "x-api-key": localStorage[TOKEN_KEY]
        }
      });
      return resp.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    useApiMethodFetch,
    useApiGetFetch,
    useApiMethodAxios,
    useApiGetAxios
  };
};
