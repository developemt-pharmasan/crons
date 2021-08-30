const nodemailer = require('nodemailer')
const {testService} = require('../config/mail')

const sendMail = async (message = {from,to,subject,html}) => {
  const {host,password:pass,port,user} = testService
  const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  })
  const  info = await  transport.sendMail(message)
  return info
}

module.exports = {
  sendMail
}