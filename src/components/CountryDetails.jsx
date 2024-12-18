import { useEffect, useState } from "react";

import { WeatherCountry } from "./WeatherCountry";
import weatherService from "../services/weather";

export const CountryDetails = ({ country }) => {
    const [weatherCountry, setWeatherCountry] = useState([]);
    const lat = country.coordCapital[0];
    const log = country.coordCapital[1];

    useEffect(() => {
        weatherService
            .getWeatherCountry(lat, log)
            .then((response) => {
                console.log(response);
                return setWeatherCountry(response);
            })
            .catch((error) => console.log(error));
    }, [country]);

    console.log("weatherCountry", weatherCountry);

    return (
        <section>
            <h2>{country.name}</h2>

            <article>
                <h3>Basic Data:</h3>
                <p>
                    capital: {country.capital}
                    <br />
                    area: {country.area}
                    <br />
                </p>
            </article>

            <article>
                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map((lang) => (
                        <li key={lang}>{lang}</li>
                    ))}
                </ul>
            </article>

            <article>
                <img
                    src={country.flags.png}
                    alt={country.flags.alt}
                    width={150}
                />
            </article>

            <article>
                <h3>Weather in {country.name}</h3>
                <WeatherCountry weatherCountry={weatherCountry} />
            </article>
        </section>
    );
};
