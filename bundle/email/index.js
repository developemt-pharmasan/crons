// const { sendMail } = require('../../../libs/mail')
const { sendMail } = require('../../libs/mail')
const ejs = require('ejs')
const path = require('path')
module.exports = (data) => {
  ejs.renderFile(path.resolve(__dirname, '.', 'views', 'pages', `${data.ejs}.ejs`), data, {}, async (err, html) => {
    if (err) throw err
    const email = {
      from: data.from, // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html
    }
    const response = await sendMail(email)
    console.log(response)
  });


}