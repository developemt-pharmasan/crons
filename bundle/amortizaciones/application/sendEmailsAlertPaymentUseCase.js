const {sendMail} = require('../../../libs/mail')
const ejs = require('ejs')
const path = require('path')
module.exports =  (data) => {
  ejs.renderFile(path.resolve(__dirname,'..','views','pages','alertaPago.ejs'), data ,{}, async (err, html) =>{
    if (err) throw err
    const email = {
      from: process.env.AMORTIZATIONS_EMAIL, // sender address
      to: "go.juangomez23@gmail.com", // list of receivers
      subject: data.title, // Subject line
      text: data.message, // plain text body
      html
    }
    const response = await sendMail(email)
    console.log(response)
  });
  
  
}