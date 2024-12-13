import { useEffect, useState } from "react";
import countriesService from "./services/countries";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [newCountry, setNewCountry] = useState("");
    const [searchedCountries, setSearchedCountries] = useState([]);

    useEffect(() => {
        countriesService.getAll().then((response) => {
            setCountries(response);
        });
    }, []);

    if (!countries) return null;

    const searchCountry = (event) => {
        event.preventDefault();
        console.log("Estoy buscando un país");
        // console.log(countries);

        const countriesSearched = countries.filter((country) =>
            country.name.toLowerCase().includes(newCountry.toLowerCase())
        );
        // console.log(countriesSearched);
        setSearchedCountries(countriesSearched);
    };
    // console.log(searchedCountries);

    const handleInputChange = (event) => {
        setNewCountry(event.target.value);
    };

    return (
        <>
            <form onSubmit={searchCountry}>
                find countries:
                <input value={newCountry} onChange={handleInputChange} />
            </form>
            <div>
                {searchedCountries.length > 10 ? (
                    <div>Too many matches, specify another filter</div>
                ) : searchedCountries.length > 1 ? (
                    searchedCountries.map((searchedCountry) => (
                        <div key={searchedCountry.name}>
                            {searchedCountry.name}
                        </div>
                    ))
                ) : (
                    searchedCountries.map((searchedCountry) => (
                        <div key={searchedCountry.name}>
                            <h1>{searchedCountry.name}</h1>
                            capital {searchedCountry.capital}
                            <br />
                            area {searchedCountry.area}
                            <br />
                            <br />
                            <strong>languages:</strong>
                            <ul>
                                {Object.keys(searchedCountry.languages).map(
                                    (key, i) => (
                                        <li key={i}>
                                            {searchedCountry.languages[key]}
                                        </li>
                                    )
                                )}
                            </ul>
                            <div>
                                {
                                    <img
                                        src={searchedCountry.flags.png}
                                        alt={searchedCountry.flags.alt}
                                    />
                                }
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default App;
