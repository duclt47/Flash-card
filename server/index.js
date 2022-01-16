const express = require ("express");
const mongoose = require("mongoose");
const cors = require('cors');
var bodyParser = require('body-parser');

require('dotenv').config();
const cardRouter = require('./routes/card');

const connectDB = async () => {
    const options = {
        autoIndex: true, 
        useNewUrlParser: true, 
    }
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@flashcard.txiwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, options);
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
}

connectDB();
const app = express();

app.use(express.json());
// app.use(express.urlencoded());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use('/api/card', cardRouter)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))