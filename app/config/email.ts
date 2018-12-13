const nodemailer = require('nodemailer');

const EMAIL = 'contact@chungxe.vn';
const PASSWORD = 'contact@123';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

async function sendMail({
  sender = EMAIL, receiver,
  subject, content,
}) {
  try {
    const mailOptions = {
      from: "Chungxe.vn <" + sender + ">",
      to: receiver,
      subject,
      html: content,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) throw new Error(error.message);
    });
    return {status: 1};
  } catch (error) {throw new Error(error)}
}

module.exports = {
  sendMail,
};