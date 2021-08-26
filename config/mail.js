module.exports = {
  testService: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    secure: process.env.MAIL_SECURE,
    port: process.env.MAIL_PORT,
  },
  prodService: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    secure: process.env.MAIL_SECURE,
    port: process.env.MAIL_PORT,
  }
}