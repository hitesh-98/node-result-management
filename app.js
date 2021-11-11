/* starting point of application 
   requiring dependency
*/

const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

/* using .env for customizing individual working environment variables */
dotenv.config({
    path: './.env'
})

const app = express();


/* creating database connection  */
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//parse url-encoded bodies (sent by html forms)
app.use(express.urlencoded({
    extended: false
}));

//parse json bodies (sent by api clients)
app.use(express.json());

//setting view engine
app.set('view engine', 'hbs');

/* connecting with database */
db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySql Connected..");
    }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//define port
app.listen(7000, () => {
    console.log("Server started on port 7000")
});