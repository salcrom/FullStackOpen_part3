import { useEffect, useState } from "react";
import countriesService from "./services/countries";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [newCountry, setNewCountry] = useState("");

    useEffect(() => {
        countriesService.getAll().then((response) => {
            setCountries(response);
        });
    }, []);

    if (!countries) return null;

    const searchCountry = (event) => {
        event.preventDefault();
        console.log("Estoy buscando un país");
        console.log(countries);

        const countrySearched = countries.find((country) => {
            country.name === newCountry;
        });
        console.log(countrySearched);
    };

    const handleInputChange = (event) => {
        setNewCountry(event.target.value);
    };

    return (
        <form onSubmit={searchCountry}>
            find countries:
            <input value={newCountry} onChange={handleInputChange} />
        </form>
    );
};

export default App;
