import { useState } from "react";
import { Person } from "./components/Person";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newSearch, setNewSearch] = useState("");
    const [newPersons, setNewPersons] = useState([]);

    const addPhone = (event) => {
        event.preventDefault();
        // console.log("form clicked", event.target);

        persons.forEach((person) => {
            if (newName === person.name) {
                alert(`${newName} is already added to phonebok`);
                setPersons(persons);
                setNewName("");
                return;
            } else {
                const personObject = {
                    name: newName,
                    number: newNumber,
                    id: persons.length + 1,
                };
                setPersons(persons.concat(personObject));
                setNewName("");
                setNewNumber("");
            }
        });
    };

    const handlePhoneChange = (event) => {
        // console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    const searchNumbers = (event) => {
        event.preventDefault();
        // console.log("search", newSearch);
        const newPersons = persons.filter((person) =>
            person.name.toLowerCase().startsWith(newSearch.toLowerCase())
        );
        // console.log(newPersons);
        setNewPersons(newPersons);
        setNewSearch("");
    };

    const handleSearchChange = (event) => {
        // console.log(event.target.value);
        setNewSearch(event.target.value);
    };

    return (
        <div>
            <h1>Phonebook</h1>
            {/* <form onSubmit={searchPhone}> */}
            <form onSubmit={searchNumbers}>
                <div>
                    filter shown with
                    <input value={newSearch} onChange={handleSearchChange} />
                </div>
                <div>
                    <button type="submit">search</button>
                </div>
            </form>

            <h2>add a new</h2>
            <form onSubmit={addPhone}>
                <div>
                    name: <input value={newName} onChange={handlePhoneChange} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <>
                <h2>Numbers</h2>
                {persons.length === newSearch.length ? (
                    <div>
                        {persons.map((person) => (
                            <Person key={person.id} person={person} />
                        ))}
                    </div>
                ) : (
                    <div>
                        {newPersons.map((newPerson) => (
                            <Person key={newPerson.id} person={newPerson} />
                        ))}
                    </div>
                )}
            </>
        </div>
    );
};

export default App;
