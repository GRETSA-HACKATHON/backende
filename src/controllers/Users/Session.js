const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const {UserInputError} = require('apollo-server-express');
require('dotenv').config();
const UserModel = require("../../datasources/Users/UserModel");

class Session {
    async signUp({input:{
        password,email,name
    }}){
        try{
            const response = await UserModel.findOne({email:email});
        
            if(response){
              throw new UserInputError('Email already in use')
            }
            
             const newUser = new UserModel({
                 _id:uuidv4(),
                 name,
                 email
             });

            const hash = await bcrypt.hash(password, 10);
            
    
            newUser.password = hash;
            const user = await newUser.save();
            const token = jwt.sign({email:user.email,id:user._id},process.env.SECRET,{expiresIn: '1d'});
            return {
                status:true,
                message:"Successfully signed up",
                token
            }
        }catch(e){
            console.log(e);
            throw new Error(e.message)
        }
    }

    async signIn({input:{
        email,
        password
    }},res){
        try {
            const response =  await UserModel.findOne({email:email})

                if(!response){
                    throw new UserInputError('No such email registered')
                }

                const match = await bcrypt.compare(password,response.password);

                if(!match){
                    throw new UserInputError('Passwords do not match')
                }

                const token= jwt.sign({email:response.email,id:response._id},process.env.SECRET,{expiresIn: '1d'});

                res.cookie('host', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", //on https
                    maxAge:1000 * 60 * 60 * 24 * 1,
                    sameSite:process.env.NODE_ENV === "production" ? "none" :"strict"
                    //domain: 'example.com', //set your domain
                });
                return {
                    status:true,
                    id:response._id,
                    message:"Successfully authenticated",
                    token:token
                };
        }catch(e){
            console.log(e);
            throw new Error(e.message)
        }

    }

    async logOut(res){
        try{
            res.clearCookie("host",{
                path:"/",
                // sameSite:"none"
            })
            return {
                status:true,
                message:"successfully logged you out"
            }
        }catch(err){
            return {
                status: false,
                message: "failed to log you out"
            }
        }
    }

    async userDetails(found){
        try{
             if(!found){
            throw new Error("Please sign in");
        }
        const response = await UserModel.find({_id:found._id});
        console.log(response)
        return response[0];
        }catch(e){
            throw new Error("An error occured");
        }
    }

}

module.exports = Session;