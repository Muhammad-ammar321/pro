const { profile } = require("console");
const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
app.use(express.urlencoded({}))
app.use(express.json())

const dataPath = path.join(__dirname, "../data.json");

const readData = async () => {
    const contents = await fs.readFile(dataPath, "utf8");
    // console.log(contents);
    return JSON.parse(contents);
};


module.exports= {
    async dashboard(req, res) {
        try {
            const data = await readData();
            const students = data.students.filter(s => !s.deleted_at);
            const student = students.find(s => s.email === email.trim() && s.password === password.trim());
            console.log(student)
            res.render("dashboard", student );
        } catch (err) {
            res.status(500).send("Error reading student data.");
        }
    },
    async profile(req, res) {
        try {
            const data = await readData();
            // const students = data.students.filter(s => !s.deleted_at);
            // console.log(students)
            
            // const student = students.find(s => s.email === email.trim() && s.password === password.trim());
            const student =data.students.find(s=> s.id === id)
            // console.log(student)
            res.render("user", student );
        } catch (err) {
            res.status(500).send("Error reading student data.");
        }
    }
}