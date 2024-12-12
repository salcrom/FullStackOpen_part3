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
                setPersons(initialPersons);
                setIsLoading(false);
                // console.log("response en App.js", initialPersons);
                // console.log(persons);
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
        console.log("existingPerson", existingPerson);

        if (existingPerson) {
            if (
                window.confirm(
                    `${newName} está ya añadido al phonebook, ¿quieres cambiar el número de teléfono`
                )
            ) {
                const updatedPerson = { ...existingPerson, number: newNumber };

                personService.update(updatedPerson).then((response) => {
                    console.log("response", response);
                    setPersons(
                        persons.map((person) =>
                            person.id !== existingPerson.id
                                ? person
                                : updatedPerson
                        )
                    );
                });

                setNewName("");
                setNewNumber("");
            } else {
                setNewName("");
                setNewNumber("");
            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
            };

            personService.create(personObject).then((response) => {
                setPersons(persons.concat(response));
                setNewName("");
                setNewNumber("");
            });
        }
    };

    const deletePerson = (id) => {
        console.log(`person con ${id} va a ser borrada`);
        const personToDelete = persons.find((person) => person.id === id);
        console.log(personToDelete);
        if (!personToDelete) return;
        personService.deletePerson(id).then((response) => {
            console.log(`Deleted person with id ${id}`);
            setPersons(persons.filter((person) => person.id !== id));
        });
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
                <Persons
                    persons={persons}
                    filter={filter}
                    deletePerson={deletePerson}
                />
            </footer>
        </>
    );
};

export default App;
