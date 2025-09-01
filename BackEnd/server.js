require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connection');
const recipeRouter = require('./routers/recipe');
const userRouter = require('./routers/user')
const cros = require('cors')
const app = express();
app.use('/public',express.static('public'))
app.use(express.json())
app.use(cros())
// Routes
// app.use('/CreatRecipe', recipeRouter);
app.use('/recipe', recipeRouter);
app.use('/user', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});