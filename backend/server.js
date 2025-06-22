const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const database = require('./config/db');
const userRouter = require('./routes/userRoutes');
dotenv.config();

const app = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());
database();

app.use('/api/auth', userRouter);

app.get('/', (req, res)=>{
    res.json('server is working');
})

app.listen(port, ()=>{
    console.log(`server running on port : ${port}`);
})