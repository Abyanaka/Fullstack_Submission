const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

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


