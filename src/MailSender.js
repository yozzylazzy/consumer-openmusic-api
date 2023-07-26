const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._mailer = nodemailer.createTransport({
      pool: true,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music API v3.0',
      to: targetEmail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir hasil dari ekspor playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };
    return this._mailer.sendMail(message);
  }
}

module.exports = MailSender;
