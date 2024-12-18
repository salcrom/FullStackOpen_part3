export const CountriesList = ({ countriesToShow, handleShowClick }) => {
    console.log({ countriesToShow });
    return (
        <ul>
            {countriesToShow.map((country) => (
                <li key={country.name}>
                    {country.name}
                    <button onClick={() => handleShowClick(country)}>
                        show
                    </button>
                </li>
            ))}
        </ul>
    );
};
