import { useEffect, useState } from "react";

import axios from "axios";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";

const App = () => {
    const [persons, setPersons] = useState();
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // console.log("persons - antes useEffect", persons);
    // console.log("isLoading", isLoading);

    useEffect(() => {
        // console.log("persons - dentro useEffect", persons);
        // console.log("isLoading - dentro useEffect - antes de axios", isLoading);

        (async () => {
            await axios
                .get("http://localhost:3001/persons")
                .then((response) => {
                    setPersons(response.data);
                });
            setIsLoading(false);
        })();
    }, []);

    const handleInputChange = (setter) => (event) => setter(event.target.value);

    const addPerson = (event) => {
        event.preventDefault();

        const existingPerson = persons.find(
            (person) => person.name === newName
        );

        if (existingPerson) {
            if (alert(`${newName} está ya añadido a la app de phonebook`)) {
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

    if (isLoading) return <>is loading...</>;

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
