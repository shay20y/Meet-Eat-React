// eslint-disable-next-line no-unused-vars
const API_URL = 'http://localhost:3001';

//Auth Routes

// User Routes
export const USER_URL__GET_POST = `${API_URL}/users`;
export const USER_URL__GET_POST_DELETE = `${API_URL}/users`;
export const LOGIN_URL__POST = `${API_URL}/users/login`;
export const USER_INFO_URL__GET = `${API_URL}/users/userInfo`;
export const USER_DESCRIBE_URL__GET = `${API_URL}/users/describe`;
export const USER_BEN_URL__PATCH = `${API_URL}/users/ban`;
export const USER_ROLE_UPDATE_URL__PATCH = `${API_URL}/users/updateRole`;
export const USER_CHACK_TOKEN_URL__GET = `${API_URL}/users/checkToken`;


// Events Routes
export const EVENT_URL__GET_POST = `${API_URL}/events`;
export const EVENT_URL__GET_POST_logged = `${API_URL}/events/loggedIn`;
export const EVENT_WHITE_USER_INFO_URL__GET = `${API_URL}/events/forShow`;
export const EVENT_USERS_URL__GET = `${API_URL}/events/users`;
export const EVENT_SINGLE_URL__GET = `${API_URL}/events/single`;
export const EVENT_COUNT_USERS_URL__GET = `${API_URL}/events/users/count`;
export const EVENT_DESCRIBE_URL__GET = `${API_URL}/events/describe`;
export const EVENT_USERS_DESCRIBE_URL__GET = `${API_URL}/events/users/describe`;
export const EVENT_USERS_APPROVE_URL__PATCH = `${API_URL}/events/users/approve`;
export const EVENT_DELETE_URL__DELETE = `${API_URL}/events/deleteEvent`;
export const EVENT_PATICIPANTS__GET = `${API_URL}/events/users/count`;
export const EVENT_JOIN__POST = `${API_URL}/events/joinEvent`;

export const USER_EVENT_URL__GET = `${API_URL}/events/users/getAllMyEvents`;
export const USER_EVENT_PARTICIPANTS_URL__GET = `${API_URL}/events/users/getParticipants`;

// Api url
const MAIN_URL = 'https://www.themealdb.com/api/json/v1/1/'

export const API_LIST_AREA = `${MAIN_URL}list.php?a=list`
export const API_LIST_CATWGORIES = `${MAIN_URL}list.php?c=list`
export const API_LIST_CATWGORIES_ALL = `${MAIN_URL}categories.php`
export const API_LIST_INGREDIENTS = `${MAIN_URL}list.php?u=list`

export const API_MEAL_AREA= `${MAIN_URL}filter.php?a=`
export const API_MEAL_CATEGORY= `${MAIN_URL}filter.php?c=`
export const API_MEAL_SEARCH= `${MAIN_URL}search.php?s=`
export const API_MEAL_SEARCH_BY_LETTER= `${MAIN_URL}search.php?f=`


export const API_MEAL_BY_ID= `${MAIN_URL}lookup.php?i=`
export const API_MEAL_RANDOM= `${MAIN_URL}random.php`


// token
export const TOKEN_KEY = "user_token"
export const USER_INFO_KEY = "user_id"