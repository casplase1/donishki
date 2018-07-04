import nodemailer from 'nodemailer';
import { config } from '../config';

export default (mailType, data) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    pool: true,
    host: 'smtp.gmail.com',
    ignoreTLS: true,
    tls: {
      rejectUnauthorized: false,
    },
    port: 587,
    secure: false,
    auth: {
      user: config.notificationMail,
      pass: config.notificationPass,
    },
  });

  let output = '';
  output += data.name ? `Имя: ${data.name} <br />` : ``;
  output += `Телефон: ${data.phone} <br />`;
  output += data.items ? `Toвары: <br /> ${data.items}` : ``;

  const mailOptions = {
    from: config.notificationMail,
    to: config.notificationRecipient,
    subject: mailType,
    html: output,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      logger.error(error);
    }
  });
};
