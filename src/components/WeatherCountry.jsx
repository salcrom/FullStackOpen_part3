export const WeatherCountry = ({ weatherCountry }) => {
    console.log("weatherCountry", weatherCountry);
    console.log(weatherCountry);
    const icon = weatherCountry.current.weather[0].icon;
    console.log("icon", icon);
    const imgIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    console.log(imgIcon);
    const description = weatherCountry.current.weather[0].description;
    console.log(description);
    const temperature = (weatherCountry.current.temp - 273.15).toFixed(2);
    const wind = weatherCountry.current.wind_speed.toFixed(2);

    return (
        <>
            {weatherCountry && (
                <article>
                    <p>
                        La temperatura es de {temperature} ºC
                        <br />
                        <img src={imgIcon} alt={description} />
                        <br />
                        La velocidad del viento es de {wind} m/s
                    </p>
                </article>
            )}
        </>
    );
};
