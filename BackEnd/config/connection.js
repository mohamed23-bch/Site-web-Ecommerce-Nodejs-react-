const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/foodRecipe')
        .then(()=>{
            console.log('connection bien')
        }).catch(()=>{
            console.log('male a connection ')
        })