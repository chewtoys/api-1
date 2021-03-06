import nodemailer from "nodemailer";
import Logger from "../Main/Logger";

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 25,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

interface MOptions {
  toEmail: string;
  toName: string;
  code: string;
}

export default class Mailer {
  transporter: nodemailer.Transporter;

  constructor() {
    Logger.info("Email Class init");
    this.transporter = transporter;
  }

  /**
   * @description Отправка заказа
   */
  sendOrder(data: any) {
    const mailOptions = {
      from: '"LAAPL DELIVERY" <noreply@laapl.ru>',
      to: "bersenoff@bk.ru",
      subject: "📧 Поступил новый заказ!",
      text: `
        Это текст
      `,
      html: `
        <span style="color: red">Это HTML</span>
      `,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  }

  sendVerificationEmail(options: MOptions) {
    const mailOptions = {
      from: '"LAAPL DELIVERY" <noreply@laapl.ru>',
      to: options.toEmail,
      subject: "📧 Laapl Email Verification",
      text: `
                Привет, ${options.toName}!
                
                Это твой код потверждения email: ${options.code}
            `,
      html: `
                Привет, ${options.toName}!
                <br />
                <br />
                Это твой код потверждения email: <b>${options.code}</b>
            `,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          Logger.error("Email err");
          return reject(error);
        }
        resolve("Message sent: %s");
      });
    });
  }
}

// Example
