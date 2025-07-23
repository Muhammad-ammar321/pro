const express = require("express");
const fsPromises = require("fs/promises");
const path =require('path')
const app = express();


app.use(express.json({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))

app.get('/student', async (req, res) => {
    try {
        const contents = await fsPromises.readFile('./data.json', { encoding: 'utf8' });
        const data = JSON.parse(contents);
        const students = data.students.filter(s => !s.deleted_at);
        
        res.render("user",{
                // data:students
                student_name: students[0].student_name,
                father_name: students[0].father_name,
                id: students[0].id,
                D_O_B: students[0].D_O_B,
                cnic:students[0].cnic,
                email:students[0].email,
                phone_number:students[0].phone_number
            

        });
    }   catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
});

app.get('/student/edit', async (req, res) => {
    try {
        const contents = await fsPromises.readFile('./data.json', { encoding: 'utf8' });
        const data = JSON.parse(contents);
        const students = data.students.filter(s => !s.deleted_at);
        
        res.render("edit",{
                // data:students
                student_name: students[0].student_name,
                father_name: students[0].father_name,
                id: students[0].id,
                D_O_B: students[0].D_O_B,
                cnic:students[0].cnic,
                email:students[0].email,
                phone_number:students[0].phone_number
            

        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});
app.patch('/student/edit', async (req, res) => {
    try {
        const contents = await fsPromises.readFile('./data.json', { encoding: 'utf8' });
        const data = JSON.parse(contents);
        const students = data.students.filter(s => !s.deleted_at);
        
        res.render("edit",{
                // data:students
                student_name: students[0].student_name,
                father_name: students[0].father_name,
                id: students[0].id,
                D_O_B: students[0].D_O_B,
                cnic:students[0].cnic,
                email:students[0].email,
                phone_number:students[0].phone_number
            

        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
