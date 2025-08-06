const Persons = ({ persons, filter, handleDelete }) => {
    const peopleToShow = filter === '' ? persons
        : persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))

    return (
        <ul>
            {peopleToShow.map(person =>
                <li key={person.name}>{person.name} {person.number}
                    <button onClick={() => handleDelete(person.id)}>Delete</button>
                </li>
            )}
        </ul>
    )

}

export default Persons