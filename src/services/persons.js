import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
    const request = axios.get(baseUrl);
    return await request.then((response) => response.data);
};

const create = async (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return await request.then((response) => response.data);
};

const deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    console.log("request", request);

    return await request.then((response) => {
        console.log(`Deleted person with id ${id}`);
    });
};

export default {
    getAll,
    create,
    deletePerson,
};
