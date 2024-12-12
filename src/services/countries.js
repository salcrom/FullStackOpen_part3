import axios from "axios";

const baseUrl = `https://studies.cs.helsinki.fi/restcountries`;

const getAll = async () => {
    const request = await axios.get(`${baseUrl}/api/all`);
    console.log("request", request.data);
    return request.then((response) => response.data);
};

export default {
    getAll,
};
