const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/taskeitor',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db=>console.log(`BD is connected`))
.catch(error => console.error(error));

