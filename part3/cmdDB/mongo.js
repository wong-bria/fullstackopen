const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://brianwong134:${password}@cluster0.hwthkko.mongodb.net/phonebook?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', PersonSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
} else if (process.argv.length === 3) {
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 4) {
    console.log('give name and number as arguments')
    process.exit(1)
} else if (process.argv.length === 5) {
    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}