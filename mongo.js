const mongoose = require('mongoose')


if (process.argv.length<3) {
 console.log('give password as argument')
 process.exit(1)
}


const password = process.argv[2]
const n = process.argv[3]
const pn = process.argv[4]




const url = `mongodb+srv://ryantanliner:${password}@phone.pxrqtgo.mongodb.net/?retryWrites=true&w=majority&appName=phone`




mongoose.set('strictQuery',false)


mongoose.connect(url)


const personSchema = new mongoose.Schema({
 name: String,
 number: String,
})


const Person = mongoose.model('Person', personSchema)


const person = new Person({
 name: n,
 number: pn,
})


if(process.argv.length == 3){
   console.log('phonebook:')
   Person.find({}).then(result => {
   result.forEach(person => {
       console.log(person.name + ' ' + person.number)
   })
   mongoose.connection.close()
   })
}
else {
   person.save().then(result => {
       console.log('added ' + n + ' number ' + pn + ' to phonebook')
       mongoose.connection.close()
     })
}





