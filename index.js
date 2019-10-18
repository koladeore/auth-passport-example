const express =  require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookiesSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const routes = require('./api/routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./api/models/User');
require('./api/services/passport');

mongoose.connect(keys.mongoURI);
mongoose.connection.on('connected', ()=>{
    console.log('connected to database');
})

const app = express();

app.use(cookiesSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.use(bodyParser.json());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req,res) => {
    res.status(200).send('The api is working');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});