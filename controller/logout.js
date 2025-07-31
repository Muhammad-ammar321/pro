const express = require("express");
const fs = require("fs/promises");
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.urlencoded({}))
app.use(express.json())
const secret = "🤫 no data"


module.exports={
    signout(req,res){
        const token = req.cookies.token
        try {
            
            if(token){
                res.clearCookie('token')
                return res.redirect("/login")
            }else{
                return res.status(403).render('login', { err: "Invalid or expired token" });

            }
        } 
        catch (error) {
            return res.status(500).send("Cannot logout because of some Internal problem")
        }
        
    }
}