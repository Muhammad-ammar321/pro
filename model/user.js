const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const dataPath = path.join(__dirname, "../data.json");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));


const readData = async () => {
    const contents = await fs.readFile(dataPath, "utf8");
    return JSON.parse(contents);
};

const writeData = async (data) => {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};


module.exports = {
    async create(req, res) {
        try {
            const data = await readData();  
               let newId = 1;
        if (data.students.length > 0) {
            const lastStudent = data.students[data.students.length - 1];
            newId = lastStudent.id + 1;
        }


            const newStudent = { id : newId, ...req.body, deleted_at: null };  
            data.students.push(newStudent);  

            await writeData(data);  

            res.redirect("/login");  
        } catch (err) {
            console.error("Error in registration:", err);
            res.status(500).send("Server Error");
        }
    },

    async update(req, res) {
        const data = await readData();
        // console.log("data>>>>>>>>",data)
        const index = data.students.findIndex(s => s.id === req.user.id);
        // console.log(">>>>>>>>>>>>>>>>>  ",index)
        if (index === -1) return res.status(404).send("Student not found");
        data.students[index] = { ...data.students[index], ...req.body };
        await writeData(data);
        return res.redirect("/student/profile")
    },

    async destroy(req, res) {
        const id = req.params.id;
        try {
            const data = readData()
            const student = data.students.find(s => s.id === req.user.id);
            if (!student) return;
            student.deleted_at = new Date()
            await writeData(data)
            res.status(203).send('user deleted')
        } catch (error) {
            return error.message
        }
    }
}