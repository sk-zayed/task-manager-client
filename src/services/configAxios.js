import axios from "axios";
import store from "@/store";

axios.interceptors.request.use(
    // this function is called automatically whenever any request goes out
    request => {
        if( request.url.includes("calendar") /* || request.url.includes( 'sessions' ) || request.url.includes( 'profilephoto' ) */ ) {
            request.headers['Authorization'] = store.state.auth.token;
        }

        return request;
    },
    error => Promise.reject( error )
);