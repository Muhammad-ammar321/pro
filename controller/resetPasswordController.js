const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const dataPath = path.join(__dirname, "../data.json");

const readData = async () => {
    const contents = await fs.readFile(dataPath, "utf8");
    return JSON.parse(contents);
};

const writeData = async (data) => {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

const reset = "reset password"
  


module.exports= {
    async emailForReset(req,res){
        const {email} = req.body ;
        if(!email) return res.status(401).render("verify-email",{err:"Please enter your email "});
        
        try {
            const data = await readData();
            const user = data.students.filter(s=> !s.deleted_at )

            const student = user.find(s=> s.email === email.trim())
            if(!student) {
                return res.status(200).render("verify-email",{err : "Not found or maybe banned"})  
            }
            else{  
                const token = jwt.sign({email: student.email},reset,{expiresIn:60})
                res.cookie("reset",token,{httpOnly:true })
                res.render("reset-password",{err:null})
            }
        } catch (err) {
            res.status(500).render('login',{err:"Server Error: Cannot sent email ",mess:null})   
        }
    },
    async reset(req,res){
        const {password,confirm} = req.body;
        console.log(req.body)

        console.log(password, confirm)
        if(newpassword !== confirm) return res.status(400).render('reset-password',{ err :"Password not match"})
        try {
            
            const data = await readData()
            const student = data.students.findIndex(s=> s.email === req.user.email)
            data.students[student].password = password
            await writeData(data);
            res.render("login",{mess:"Password reset successfully"})
            
            
        } catch (err) {
            res.status(500).render('login',{err:"Server Error: Cannot reset password ",mess:null})   
        }        
    }
}


