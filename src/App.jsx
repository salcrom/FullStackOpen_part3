import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import { CountryDetails } from "./components/CountryDetails";
import { CountriesList } from "./components/CountriesList";

// import weatherService from "./services/weather";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        countriesService
            .getAll()
            .then((response) => {
                setCountries(response); //Array de todos los países -> name, capital, coordCapital, area, languages, flags,
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleShowClick = (country) => {
        setSelectedCountry(country);
    };

    const countriesToShow = filter
        ? countries.filter((country) =>
              country.name.toLowerCase().includes(filter.toLowerCase())
          )
        : [];

    console.log("filter", filter);
    console.log("countries", countries);
    console.log("countriesToShow", countriesToShow);
    console.log("countriesToShow.lenght", countriesToShow.length);

    if (countries.length === 0) return <h1>Loading...</h1>;

    return (
        <>
            <label>
                Find countries:
                <input
                    type="text"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </label>

            {countriesToShow.length === 0 ? (
                ""
            ) : (
                <div>
                    {countriesToShow.length > 10 ? (
                        <div>Too many matches, specify another filter</div>
                    ) : countriesToShow.length === 1 ? (
                        <CountryDetails country={countriesToShow[0]} />
                    ) : (
                        <CountriesList
                            countriesToShow={countriesToShow}
                            handleShowClick={handleShowClick}
                        />
                    )}
                    {selectedCountry && (
                        <CountryDetails country={selectedCountry} />
                    )}
                </div>
            )}
        </>
    );
};

export default App;
