module.exports ={
 sessions : {

},
app_key : "secret",

 checkGuest(req, res, next) {

    if (!req.cookies.sessionId || jwt.verify(req.cookies.sessionId,app_key)) return res.

    next()
},

 isAuthentication(req, res, next) {
    // if(loggedIN) return res.redirect('/')
    if (!sessionId || !sessions[sessionId]) {
        sessions.error = {error : "Please login first"}
        return res.status(401).redirect('/login');
        
    }
},

 attempLogin(req, res, next) {

},

 generateId(req, res, next) {
    //provide seeionId
    const sessionId = Math.ceil(Math.random() * 10000)

},

 savedLogin(req, res, next) {

}
}