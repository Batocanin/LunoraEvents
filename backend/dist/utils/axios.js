import axios from "axios";
export var AxiosLemonSqueezy = axios.create({
    baseURL: process.env.LEMONSQUEEZY_API_URL,
    headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: "Bearer ".concat(process.env.LEMONSQUEEZY_API_KEY),
    },
});
