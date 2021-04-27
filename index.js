const dotenv = require('dotenv');
const express = require('express');
const expressSession = require('express-session');
dotenv.config();

const PORT = process.env.PORT || 1234;
const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Hello",
  cookie: {
    secure: false,
    maxAge: (1000*60*60)
  }
}));

app.use((req, res, next) => {
if(!req.session.deck){
  req.session.deck = [];
}
next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
