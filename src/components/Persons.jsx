export const Persons = ({ filter, persons, deletePerson }) => {
    // console.log({ filter, persons });
    const personsToShow = filter
        ? persons.filter((person) =>
              person.name.toLowerCase().includes(filter.toLowerCase())
          )
        : persons;

    return (
        <ul>
            {personsToShow.map((person) => (
                <li key={person.name}>
                    {person.name} : {person.number} -{" "}
                    <button onClick={() => deletePerson(person.id)}>
                        {" "}
                        delete
                    </button>
                </li>
            ))}
        </ul>
    );
};
