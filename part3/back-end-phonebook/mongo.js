const mongoose = require('mongoose')


const password = process.argv[2]
const url = 
`mongodb+srv://abe_fullstack_db:${password}@cluster0.kq5ajkv.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`
// const url = `mongodb+srv://abe_fullstack_db:${password}@cluster0.kq5ajkv.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

const phoneBook = new PhoneBook({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length < 4) {
  PhoneBook.find({}).then(result => {
  result.forEach(phoneBook => {
    console.log(phoneBook)
  })
  mongoose.connection.close()
})
}
else {
    
    phoneBook.save().then(result => {
      console.log('added ' + phoneBook.name + ' number ' + phoneBook.number + ' to phonebook')
      mongoose.connection.close()
    })
}


