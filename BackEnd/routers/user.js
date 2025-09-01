const express = require('express')

const router = express.Router();

const User = require('../model/UserSchema')

const bcrypt =  require('bcrypt')

const jwt = require('jsonwebtoken')



router.post('/register',async(req,res)=>{
    const {tel,password,email,Username} = req.body
      if (!password || !email || !Username || !tel) {
        res.status(400).json({
            message: 'Tous les champs sont requis: email, password, Username, tel'
        })}
    const user = await User.findOne({email})
    if(user)
    {
        res.status(403).json({message : 'user already existe'})
    }
    const HashPassword = await bcrypt.hash(password,10);
    const UserRegister = await new User({
        email,
        password:HashPassword,
        Username,
        tel
    })
    await UserRegister.save();
    let token = jwt.sign({email,id:UserRegister._id},process.env.SECRET_KEY ,{expiresIn:'1w'})
    return res.status(201).json({message : 'User Registered', token, UserRegister})

})


router.post('/signin',async(req,res)=>{
     const {password,email} = req.body
      if (!password || !email) {
        res.status(400).json({
            message: 'incorrcet : email, password'
        })}

        const user =  await User.findOne({email});
        if (user && await bcrypt.compare(password,user.password))
        {
            let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY ,{expiresIn:'1w'})
            return res.status(201).json({message : 'User ', token, user
            })
        }
        else{
            res.status(404).json({message : 'user not found'})
        }


})

router.get('/:id',async(req,res)=>{
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400).json({
            message: 'cette user introvabel'
        })}
    res.status(200).json({user}) 

})






module.exports = router;