const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
app.use(express.urlencoded({}))
app.use(express.json())

const dataPath = path.join(__dirname, "../data.json");

const readData = async () => {
    const contents = await fs.readFile(dataPath, "utf8");
    return JSON.parse(contents);
};

module.exports = {
    async allStudent(req, res) {
        try {
            const data = await readData();
            const student = data.students.filter(s => !s.deleted_at);
            res.render("student_list", { student ,err:null })
        } catch (err) {
            res.status(500).render('dashboard',{err:"Server error: Cannot get page."});

        }
    },
    async studentProfile(req, res) {
        try {
            const data = await readData();
            const students = data.students.filter(s => !s.deleted_at);
            throw new Error("no data")
            const student = students.find(s => s.id === Number(req.params.id))
            res.render("user", student);
        } catch (err) {
            const data = await readData();
            const student = data.students.filter(s => !s.deleted_at);
            res.status(500).render("student_list",{student,err:"Server error: Cannot read student data."});
        }
    },
    async studentEdit(req,res){
        try {
            const data = await readData();
            const students = data.students.filter(s => !s.deleted_at);
            const student = students.find(s => s.id === Number(req.params.id))
            res.render("user", student);
        } catch (err) {
            res.status(500).render("user",{err:"Server error: Cannot read student data."});
        }   
        
    }
}