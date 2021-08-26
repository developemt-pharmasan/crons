const nodemailer = require('nodemailer')
const {testService} = require('../config/mail')

const sendMail = (message = {from,to,subject,html}) => {
  const {host,password:pass,port,user} = testService
  const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  })
  // const message = {
  //   from,
  //   to,
  //   subject,
  //   text,
  // }

  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log(info)
  })
}

module.exports = {
  sendMail
}