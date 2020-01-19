const express = require('express');
const graphQLHttp = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const gqlSchema = require('./gql/queries');

const app = express();

app.use(cors());
//Grapql code here

app.use('/public',express.static(path.join(__dirname, 'public')));
/*app.use((req, resp, next) => {
  setTimeout(next, 3000);
});*/
app.use('/graphql',
  graphqlUploadExpress({maxFileSize: 10000000, maxFiles: 10}),
  graphQLHttp({
    schema: gqlSchema,
    graphiql: true
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then((param) => {
        console.log('Conected to database');
    })
    .catch(err => console.log(err));

module.exports = app;
