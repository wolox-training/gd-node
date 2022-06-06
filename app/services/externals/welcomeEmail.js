const nodemailer = require('nodemailer');

async function welcomeEmailUser(userParams) {
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
      from: 'Welcom New Joiners <welcomNewJoiners@wolox.com>',
      to: userParams.email,
      subject: 'Welcom to Wolox ✔',
      text: 'Welcom New Joiner',
      html: '<b>Welcom New Joiner</b>'
    });
    return info;
  } catch (error) {
    return error;
  }
}

module.exports = {
  welcomeEmailUser
};
