import Vue from "vue";
import config from "@/config";

const formatDate = (date) => {
    return new Date(date).toGMTString().substr(0, 16);
};

const sliceStr = (str) => {
    if (str) {
        return str.slice(0, 100);
    }
};

const showToast =(message, type) => {
    Vue.$toast.open({
        message,
        duration: config.duration,
        type
    });
}

export default {
    formatDate,
    sliceStr,
    showToast
};
