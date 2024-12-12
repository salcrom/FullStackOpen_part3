import { useEffect, useState } from "react";

// import axios from "axios";
import personService from "./services/persons";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";
import { SuccessNotification } from "./components/SuccessNotification";
import { ErrorNotification } from "./components/ErrorNotification";

const App = () => {
    const [persons, setPersons] = useState();
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState();

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

                personService
                    .update(updatedPerson)
                    .then((response) => {
                        console.log("response", response);
                        setSuccessMessage(
                            `El teléfono de ${updatedPerson.name} ha sido modificado`
                        );
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 5000);
                        setPersons(
                            persons.map((person) =>
                                person.id !== existingPerson.id
                                    ? person
                                    : updatedPerson
                            )
                        );
                    })
                    .catch((error) => {
                        setErrorMessage(error.message);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
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

            personService
                .create(personObject)
                .then((response) => {
                    setSuccessMessage(`${personObject.name} ha sido añadido`);
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 5000);
                    setPersons(persons.concat(response));
                    setNewName("");
                    setNewNumber("");
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
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

                {successMessage ? (
                    <SuccessNotification message={successMessage} />
                ) : (
                    ""
                )}

                {errorMessage ? (
                    <ErrorNotification message={errorMessage} />
                ) : (
                    ""
                )}

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
