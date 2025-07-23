
const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, "data.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const readData = async () => {
    const contents = await fs.readFile(dataPath, "utf8");
    return JSON.parse(contents);
};

const writeData = async (data) => {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

// GET all students
app.get("/students", async (req, res) => {
    try {
        const data = await readData();
        const students = data.students.filter(s => !s.deleted_at);
        res.render("dashboard", { students });
    } catch (err) {
        res.status(500).send("Error reading student data.");
    }
});

//login
app.get('/login',(req,res)=>{
    res.render('login',{err:null})
})
app.post('/login', async (req, res) => {
    try {
        const data = await readData();
        const { email, password } = req.body || {};
        console.log(email, password);

        if (!email || !password) {
            return res.status(400).send("Requirement not filled");
        }

        const stud = data.students.find(s => s.email === email.trim() && s.password === password.trim());
        console.log(stud);

        if (stud) {
            res.render('user', stud);
        } else {
             err = res.status(401).render('login',{err:"Incorrect username or password"});
        }
    } catch  {
        return res.status(500).send("An error occurred while processing your request");
    }
});


// GET single student by id
app.get("/student/:id", async (req, res) => {
    try {
        const data = await readData();
        const student = data.students.find(s => s.id == req.params.id);
        if (!student) return res.status(404).send("Student not found");
        res.render("user", student);
        // res.redirect('/student/:id/edit',student)
    } catch (err) {
        res.status(500).send("Error loading student profile.");
    }
});

// Create student
app.post("/student", async (req, res) => {
    const data = await readData();
    data.students.push({ ...req.body, deleted_at: null });
    await writeData(data);
    res.redirect("/students");
});

// Edit form
app.get("/student/edit/:id", async (req, res) => {
    const data = await readData();
    const student = data.students.find(s => s.id === req.params.id);
    console.log(student)
    if (!student) return res.status(404).send("Student not found");
    res.render("edit", { student });
});


// Update student
app.put("/student/:id", async (req, res) => {
    const data = await readData();
    const index = data.students.findIndex(s => s.id === req.params.id);
    if (index === -1) return res.status(404).send("Student not found");
    data.students[index] = { ...data.students[index], ...req.body };
    await writeData(data);
    res.redirect("/student/:id");
});


//Delete
app.delete("/student/:id", async (req, res) => {
    const data = await readData();
    const student = data.students.find(s => s.id === req.params.id);
    if (!student) return res.status(404).send("Student not found");
    student.deleted_at = new Date().toISOString();
    await writeData(data);
    res.redirect("/students");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
