import { useState } from "react";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    const handleInputChange = (setter) => (event) => setter(event.target.value);

    const addPerson = (event) => {
        event.preventDefault();

        const existingPerson = persons.find(
            (person) => person.name === newName
        );

        if (existingPerson) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                const updatedPerson = { ...existingPerson, number: newNumber };

                setPersons(
                    persons.map((person) =>
                        person.id !== existingPerson.id ? person : updatedPerson
                    )
                );
            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
            };
            setPersons(persons.concat(personObject));
            setNewName("");
            setNewNumber("");
        }
    };

    return (
        <>
            <header>
                <h2>Phonebook</h2>

                <Filter
                    filter={filter}
                    handleFilterChange={handleInputChange(setFilter)}
                />
            </header>

            <main>
                <h2>Add a New</h2>

                <PersonForm
                    addPerson={addPerson}
                    newName={newName}
                    handleNameChange={handleInputChange(setNewName)}
                    setNumber={newNumber}
                    handleNumberChange={handleInputChange(setNewNumber)}
                />
            </main>

            <footer>
                <h3>Numbers</h3>
                <Persons persons={persons} filter={filter} />
            </footer>
        </>
    );
};

export default App;
