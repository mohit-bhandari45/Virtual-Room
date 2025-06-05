import axios from "axios";

const BASE_URL = "http://localhost:4000";

/* Auth APIs */
const SIGNUP_API = `${BASE_URL}/auth/signup`;
const LOGIN_API = `${BASE_URL}/auth/login`;
export { SIGNUP_API, LOGIN_API };

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/* Api APIs */
const PROFILE_BASE_URL = "/api/user";
const GET_OWN_PROFILE = `${PROFILE_BASE_URL}/me`;
export { GET_OWN_PROFILE };

/* Room APIs */
const ROOM_BASE_URL = "/api/rooms";
const CREATE_ROOM = `${ROOM_BASE_URL}/create`;
const GET_ALL_ROOM = `${ROOM_BASE_URL}/me`;
export { CREATE_ROOM, GET_ALL_ROOM };

export default api;