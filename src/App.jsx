import { useEffect, useState } from "react";

// import axios from "axios";
import personService from "./services/persons";
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
        // console.log("dentro del effect");

        (async () => {
            await personService.getAll().then((initialPersons) => {
                // console.log("response en App.js", initialPersons);
                setPersons(initialPersons);
                // console.log(persons);
                setIsLoading(false);
            });
        })();
    }, []);

    // console.log("persons - después useEffect", persons);
    // console.log("isLoading", isLoading);

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
            personService.create(personObject).then((response) => {
                setPersons(persons.concat(response.data));
                setNewName("");
                setNewNumber("");
            });
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
                    newNumber={newNumber}
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
