const express = require('express')
const nodemailer = require('nodemailer');
const { json } = require('body-parser')
const cors = require('./middleware/cors')

const PORT = process.env.PORT || 3001
const app = express()
app.use(json())
app.use(cors)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: process.env.GMAIL,
           pass: process.env.GMAIL_AUTH
       }
   });

app.post('/contact/:email', (req, res) => {
    const { message } =  req.body 
    
    const mailOptions = {
        from: req.params.email, // sender address
        to: process.env.GMAIL, // list of receivers
        subject: 'Message From Portfolio', // Subject line
        html: `<p>${ message }</p>`// plain text body
      };
      
      transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
          console.log(err)
          res.status(500).send('Error!')
        }
        else {
            console.log(info)
            res.status(200).send('Message Sent!')
        }
    });
    
})

app.listen(PORT, () => console.log('Server Up and Running...'))