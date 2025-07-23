
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
// const methodOverride = require("method-override");

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, "data.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Read/Write helpers
const readData = async () => {
    const contents = await fs.readFile(dataPath, "utf8");
    return JSON.parse(contents);
};

const writeData = async (data) => {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

// List all students
app.get("/students", async (req, res) => {
    const data = await readData();
    const students = data.students.filter(s => !s.deleted_at);
    res.render("dashboard", { students });
});

// Register form
app.get("/register", (req, res) => {
    res.render("register");
});

// Create student
app.post("/student", async (req, res) => {
    const data = await readData();
    data.students.push({ ...req.body, deleted_at: null });
    await writeData(data);
    res.redirect("/students");
});



// student  profile
app.get("/student/:id/profile", async (req,res)=>{
    const data = await readData();
    const student = data.students.find(s=> s.id === req.params.id)
    if(!student) return res.status(400).send("Student not found");
    res.render("user",{student})
    // res.redirect("/student/:id/edit",{student})

});

// Edit form
app.get("/student/:id/edit", async (req, res) => {
    const data = await readData();
    const student = data.students.find(s => s.id === req.params.id);
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
    res.redirect("/students");
});

//login
app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{
    const data = req.body
    const student = data.students
})

app.get('/login/forget',(req,res)=>{
    res.render('forget_password')
})
// Delete student
app.delete("/student/:id", async (req, res) => {
    const data = await readData();
    const student = data.students.find(s => s.id === req.params.id);
    if (!student) return res.status(404).send("Student not found");
    student.deleted_at = new Date().toISOString();
    await writeData(data);
    res.redirect("/students");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
