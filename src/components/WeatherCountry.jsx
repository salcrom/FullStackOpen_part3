import { useEffect } from "react";
import weatherService from "../services/weather.js";

export const WeatherCountry = ({ weatherCountry }) => {
    console.log("weatherCountry", weatherCountry);
    const icon = weatherCountry.current.weather[0].icon;
    console.log("icon", icon);

    useEffect(() => {
        weatherService.getIconWeather(icon);
    }, [weatherCountry]);

    // const temperature = (weatherCountry.current.temp - 273.15).toFixed(2);
    // const wind = weatherCountry.current.wind_speed.toFixed(2);

    return (
        <article>
            <p>
                {/* La temperatura es de {temperature} ºC
                <br />
                <img src={""} alt={`Imagen del clima`} />
                <br />
                La velocidad del viento es de {wind} m/s */}
            </p>
        </article>
    );
};
