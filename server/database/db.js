const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://JuanEstebanCC:juanes75@cluster0.tle37.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((db) => console.log(`BD is connected`))
  .catch((error) => console.error(error));
