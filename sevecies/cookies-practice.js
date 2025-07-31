const express = require('express')
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))


const port =3001;



module.exports={ cookieParser(headers){
    if(!headers.cookie) return {};
    
    const cookieObj = {}
    const cookiesArr = headers.cookie.split(';')

    for(let i= 0;i < cookiesArr.length;i++){
        const cookie = cookiesArr[i].trim();
        const cookieArr =  cookie.split('=')
        cookieObj[cookieArr[0]] = cookieArr[1] 
    }
    return cookieObj
    

}
}
const kcookieParser = (headers) => {
    if (!headers.cookie) return {};

    const cookieObj = {};
    const cookiesArr = headers.cookie.split(';');

    for (let i = 0; i < cookiesArr.length; i++) {
        const cookie = cookiesArr[i].trim();
        const [key, ...val] = cookie.split('=');
        if (!key || val.length === 0) continue;
        cookieObj[key.trim()] = val.join('=').trim();
    }

    return cookieObj;
};

app.use((req,res,next)=>{
    const cookies = cookieParser(req.headers)
    req.cookies = cookies
    
    next()
})

const checkAuth = (req,res,next)=>{
 const {sessionId} = req.body || {}
 console.log(sessionId)
 if(!sessionId || !sessions[sessionId] ) return res.status(401).send('Unauthorized');
 next()

}




const users = [
    { id: 1, username: 'asd', password: '123' },
    { id: 2, username: 'bob', password: 'abc' }
  ];

const sessions ={
    
}



app.get('/login',checkAuth,(req,res)=>{
    res.send('>>>> protect your data by yourself, we are not your Empoly')
})


  
  

app.post('/login',(req,res)=>{
    const {username,password} = req.body || {};
    console.log(req.body);
    if(!username || !password ) return  res.status(422).send('requriment  is not fullfill') 
    // const user = users.find(u=> u.username == username && u.password == password )
    const user = users.find(u => u.username === username && u.password === password);
    console.log(user);
    // // if(users.username !== username || users.password !== password ) return res.status(401).send('requriment  is not fullfill')
    if(!user) return res.status(401).send('requriment  is incorrect')
    
    const sessionId = Math.ceil(Math.random() * 10000)
    sessions[sessionId] = user.id;
    res.setHeader('Set-Cookie',`sessionId=${sessionId}; HttpOnly; Path=/dasboard; Max-Age=${60*5}`)
    
  
    res.send({

        message:"succesfull",
        sessionId
    })
  
    // res.send('>>>>')
})

app.listen(port,(req,res)=>{
    console.log('sever port>>>>>',port)
})