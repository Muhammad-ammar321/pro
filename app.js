const express = require("express");
// const fs = require("fs/promises");
const path = require("path");
const cookieParser = require("cookie-parser");
const login = require("./controller/loginController")
const showPage = require('./controller/showPageController')
const resetPassword = require("./controller/resetPasswordController")
const studentList = require("./controller/listStudentController")
const logout = require("./controller/logout")
const auth = require('./sevecies/auth')
const userFunction = require('./model/user')

const app = express();
const PORT = 3000;

// app.use(auth.cookieParser); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())



//create
app.get("/register", showPage.create)
app.post('/register', userFunction.create)
//login
app.get('/login', auth.islogin, showPage.login,)
app.post('/student', login.attemp);

//forget
app.get('/verifyemail', showPage.forget)
app.post('/reset', resetPassword.emailForReset)
app.get('/reset', auth.reset_password, showPage.reset)
app.post('/login',auth.reset_password, resetPassword.reset)

//get all studend and their profile
app.get('/students',auth.checkGuest,auth.isAuthentication,studentList.allStudent)
app.get("/students/:id",auth.checkGuest,studentList.studentProfile)

// GET single student 
app.get("/student", auth.checkGuest, auth.isAuthentication, showPage.dashboard)
app.get('/student/profile', auth.checkGuest, auth.isAuthentication, showPage.profile)

//delte
app.delete('/students/:id',userFunction.destroy)

// Edit form
app.get("/student/edit", auth.checkGuest, auth.isAuthentication, showPage.edit)
app.post("/student/profile", auth.isAuthentication, userFunction.update)
app.get('/students/:id/edit',auth.checkGuest,studentList.studentEdit)
app.post('/students/:id',userFunction.update)


//logout 
app.get("/signin", logout.signout)


//run
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})





