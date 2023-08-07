import axios from "axios";

export const API_URL = "http://localhost:3001";
// export const API_URL = "https://pink-butterfly-suit.cyclic.app/";

export const TOKEN_KEY = "videos_token"

export const doApiGet = async (_url) => {
    try {
        const resp = await axios({
            url: _url,
            headers: {
                "x-api-key": localStorage[TOKEN_KEY]
            }

        })
        return resp.data;
    }
    catch (err) {
        throw err;
    }
}

export const doApiMethod = async (_url, _method, _body = {}) => {
    try {
        const resp = await axios({
            url: _url,
            method: _method,
            data: _body,
            headers: {
                "x-api-key": localStorage[TOKEN_KEY]
            }
        })
        return resp.data;
    }
    catch (err) {
        throw err;
    }
}