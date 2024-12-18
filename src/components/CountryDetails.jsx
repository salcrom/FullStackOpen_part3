export const CountryDetails = ({ country }) => {
    console.log(country);
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
        </section>
    );
};
