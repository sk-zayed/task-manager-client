import axios from "axios";
import config from "@/config";

const fetchEvents = async () => {
    try{
        const response = await axios.get(`${config.BASE_URL}/api/calendar/getevents`);
        return response.data;
    } catch(error) {
        return error;
    }
}

export default {
    fetchEvents
}