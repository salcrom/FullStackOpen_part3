import { useState } from "react";
import { Person } from "./components/Person";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "+34 123.123.123" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const addPhone = (event) => {
        event.preventDefault();
        console.log("form clicked", event.target);

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
                };
                setPersons(persons.concat(personObject));
                setNewName("");
            }
        });
    };

    const handlePhoneChange = (event) => {
        // console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
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
                <div>
                    {persons.map((person) => (
                        <Person key={person.name} person={person} />
                    ))}
                </div>
            </>
        </div>
    );
};

export default App;
