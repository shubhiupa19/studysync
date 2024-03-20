const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');
const responseRoutes = require('./routes/responseRoutes');
require('dotenv').config();
const app = express();
app.use(express.json());

//connecting to the database
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log('MongoDB connection established'))
  .catch(err => console.error('MongoDB connection error:', err));



//routes 
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);

//welcome route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


//starting the server
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});