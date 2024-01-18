require('dotenv').config()
const express= require('express');
const expressLayouts =require("express-ejs-layouts");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path=require("path");
const connectDB=require("./server/config/db");
const app=express();
const PORT= process.env.PORT  || 7595;


connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
//templating  engine
app.use(expressLayouts);
app.set("layout","./layouts/main");
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");
app.use('/',require('./server/routes/main'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
  });

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter using your email provider
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'transitxpressbooking@gmail.com',
            pass: 'thui sees zsdx kbib',
        },
        tls:{
            rejectUnauthorized:false,
        }
    });

    // Email options
    const mailOptions = {
        from: 'transitxpressbooking@gmail.com',
        to: 'transitxpressbooking@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
        res.send('<h2>Message sent successfully</h2>');
    });
});

app.listen(PORT,()=>{
    console.log(`Server is working ${PORT}` );
});
