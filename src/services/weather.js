import axios from "axios";

const baseUrl = `https://api.openweathermap.org`;
const baseUrlIcon = `https://openweathermap.org`;
const api_key = import.meta.env.VITE_SOME_KEY;

const getWeatherCountry = async (lat, log) => {
    // console.log(lat, log);
    const request = axios.get(
        `${baseUrl}/data/3.0/onecall?lat=${lat}&lon=${log}&appid=${api_key}`
    );

    return await request.then((response) => {
        // console.log("response-weather", response.data);
        return response.data;
    });
};

const getIconWeather = async (icon) => {
    console.log("icon", icon);
    const request = axios.get(`${baseUrlIcon}/img/wn/${icon}@2x.png`);
    // console.log("request-icon", request);
    return await request.then((response) => {
        // console.log("response-icon", response);
        return response.data;
    });
};

export default {
    getWeatherCountry,
    getIconWeather,
};
