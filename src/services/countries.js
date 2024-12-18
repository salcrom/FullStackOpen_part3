import axios from "axios";

const baseUrl = `https://studies.cs.helsinki.fi/restcountries`;

const getAll = async () => {
    const request = axios.get(`${baseUrl}/api/all`);

    return await request.then(({ data }) => {
        // console.log("response", data);
        return data.map(
            ({
                name,
                capital,
                capitalInfo,
                population,
                area,
                languages,
                flags,
            }) => ({
                name: name["common"],
                capital,
                population,
                coordCapital: capitalInfo.latlng,
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
