const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.urlencoded({}))
app.use(express.json())

const dataPath = path.join(__dirname, "../data.json");

const readData = async () => {
    const contents = await fs.readFile(dataPath, "utf8");
    return JSON.parse(contents);
};

const sessionId = Math.ceil(Math.random() * 10000)

const secret = "🤫 no data"
  


module.exports= {
    page(req,res){
        
        res.render('login',{err:null})
        
        
    },
    async attemp (req,res){
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).send("Requirement not filled");
        }
        
        
        try {
            const data = await readData();
            const students = data.students.filter(s => !s.deleted_at);

    
    
            const student = students.find(s => s.email === email.trim() && s.password === password.trim());
    
            if (student) {
                const token = jwt.sign({id:student.id},secret,{expiresIn:60*60})
                
                res.cookie("token",token,{httpOnly:true}) 
                res.render("dashboard",student)
            } else {
                    return res.status(401).render('login',{err:"Incorrect username or password"});
            }
        } catch  {
            return res.status(500).send("An error occurred while login");
        }
     }
        
}


//bot id:miboco5211@0tires.com  , pass: miboco5211@0tires.co



//commited code made by bot


// const express = require("express");
// const fs = require("fs/promises");
// const path = require("path");

// const app = express();
// const dataPath = path.join(__dirname, "../data.json");

// // Middleware to parse JSON and URL-encoded bodies
// app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// // Function to read data from the file
// const readData = async () => {
//     try {
//         const contents = await fs.readFile(dataPath, "utf8");
//         return JSON.parse(contents);
//     } catch (err) {
//         console.error("Error reading data from file:", err);
//         throw new Error("Error reading data file");
//     }
// };

// module.exports = {
//     page(req, res) {
//         res.render('login', { err: null });
//     },

//     async attemp(req, res) {
//         try {
//             // Check if req.body exists and log incoming data
//             const { email, password } = req.body || {};
//             console.log("Received email:", email);
//             console.log("Received password:", password);

//             if (!email || !password) {
//                 return res.status(400).send("Requirement not filled");
//             }

//             const data = await readData();
//             const stud = data.students.find(s => s.email === email.trim() && s.password === password.trim());

//             if (stud) {
//                 return res.render('dashboard', stud);
//             } else {
//                 return res.status(401).render('login', { err: "Incorrect username or password" });
//             }
//         } catch (err) {
//             // Log the error in case of failure
//             console.error("Error during login attempt:", err);
//             return res.status(500).send("An error occurred while processing your request");
//         }
//     }
// };

// You should define your routes in your main app.js or server.js file:
// app.post("/login", module.exports.attemp);
