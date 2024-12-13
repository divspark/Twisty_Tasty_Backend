const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const path = require("path");
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    await User.create({
                name,
                email,
                password,
            });
    // res.status(201).send("User created successfully");
    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    console.log("User found:", user);
    if (!user) {
      return res.redirect("/login");
      
    }
    else{
      const sessionId = uuidv4();
      setUser(sessionId, user);
      res.cookie("uid", sessionId);
      console.log("yes");
      return res.redirect("http://localhost:3000/");
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

  async function handleUserLogin2(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    fs.readFile(htmlFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(data);
      }
    });
  }

  async function handleUserSignup2(req, res) {
    const htmlFilePath = path.join(__dirname, 'views', 'index2.html');
    fs.readFile(htmlFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(data);
      }
    });
  }

  async function Logggedin(req, res) {
    try {
      const htmlFilePath = path.join(__dirname, 'views', 'home.html');
      res.sendFile(htmlFilePath);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }


  

module.exports = { handleUserSignup, handleUserLogin ,handleUserLogin2,handleUserSignup2,Logggedin };
