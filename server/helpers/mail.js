const nodemailer = require("nodemailer");
const mailCreds = require("../config/email");

function sendMail(receiver, subject, body) {
  let transporter = nodemailer.createTransport({
    host: "send.one.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: mailCreds.login,
      pass: mailCreds.password,
    },
  });
  const mailParams = {
    from: mailCreds.login,
    to: receiver,
    subject: subject,
    html: body,
  };
  // send mail with defined transport object
  transporter.sendMail(mailParams, (error, info) => {
    if (error) {
      resolve(false);
    }
    console.log(`Email with id: ${info.messageId} sent.`);
    resolve(true);
  });
}

module.exports = sendMail;
