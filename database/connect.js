const mongoose = require('mongoose');

async function connect(){
    console.log("Conectando a la base de datos.")
    await mongoose.connect('mongodb connection url', {
         useNewUrlParser: true, 
         useUnifiedTopology: true 
    }).catch(e => console.log(e))

    console.log("Conectado!")
}

module.exports = connect()
