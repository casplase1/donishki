import nodemailer from 'nodemailer';
import config from '../config';

export default async (subject, html, attachments, recipient) => {
  const transporter = nodemailer.createTransport({
    service: 'Yandex',
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: config.notificationMail,
      pass: config.notificationPass,
    },
  });

  const mailOptions = {
    from: config.notificationMail,
    to: recipient,
    subject,
    html,
  };

  if (attachments) {
    mailOptions.attachments = attachments;
  }

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
