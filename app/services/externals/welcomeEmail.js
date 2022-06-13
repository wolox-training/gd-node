const nodemailer = require('nodemailer');

const welcomeEmailUser = async userParams => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    const info = await transporter.sendMail({
      from: userParams.from,
      to: userParams.to,
      subject: userParams.subject,
      text: userParams.text,
      html: userParams.html
    });
    return info;
  } catch (error) {
    return error;
  }
};

module.exports = {
  welcomeEmailUser
};
