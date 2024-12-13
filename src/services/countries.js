import axios from "axios";

const baseUrl = `https://studies.cs.helsinki.fi/restcountries`;

const getAll = async () => {
    const request = axios.get(`${baseUrl}/api/all`);

    return await request.then((response) => {
        // console.log("response", response.data);
        return response.data.map(
            ({ name, capital, area, languages, flags }) => ({
                name: name["official"],
                capital,
                area,
                languages,
                flags,
            })
        );
    });
};

export default {
    getAll,
};
