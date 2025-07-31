const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
app.use(express.urlencoded({}))
app.use(express.json())

const dataPath = path.join(__dirname, "../data.json");


const cookieParser = (headers) => {
  if (!headers.cookie) return {};
  const cookieObj = {};

  const cookiesArr = headers.cookie.split('; ');
  for (let i = 0; i < cookiesArr.length; i++) {
    const cookie = cookiesArr[i];
    const cookieArr = cookie.split('=');
    cookieObj[cookieArr[0]] = cookieArr[1];
  }
  return cookieObj;
};

module.exports= {
  async read (){
    const data = await fs.readFile(dataPath,"utf8")  
    return JSON.parse(data)
    next()
  },
  async write(data){
    await fs.writeFile(dataPath,JSON.stringify(data,null,2))
  }

}