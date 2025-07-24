const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const dataPath = path.join(__dirname, "data.json");


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


class services{
    async update(req,res){
        
        const data = await readData();
        const student = data.students.find(s => s.id === req.params.id);
        console.log(student)
        if (!student) return res.status(404).send("Student not found");
        res.render("edit", { student });
    
        
        
    }

    async destroy(req,res){
        const id = req.params.id;
        try {
            const data = readData()
            const student = data.students.find(s=> s.id === id);
            if(!student) return;
            student.deleted_at = new Date()
            await writeData(data)
            res.status(203).send('user deleted')
        } catch (error) {
            return error.message
        }
    }
}