import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './db/connection.js';
import booksRoute from "./routes/book.route.js"

// Load environment variables from .env file
dotenv.config();
const app = express()
const port = process.env.PORT || 8080;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
 {/*
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});
*/}

//routes
app.use('/books', booksRoute);
app.get("/", (req, res)=> {
    res.send("hello there ");
})

app.listen(port, () => {
    dbConnection();
    console.log(`App is listening to port: ${port}`);
  });


