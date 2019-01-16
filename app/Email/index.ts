import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
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
    this.transporter = transporter;
  }

  /**
   * @description Отправка заказа
   */
  sendOrder(data: any) {
    const mailOptions = {
      from: "\"LAAPL DELIVERY\" <noreply@laapl.ru>",
      to: "bersenoff@bk.ru",
      subject: "📧 Поступил новый заказ!",
      text: `
        Это текст
      `,
      html: `
        <span style="color: red">Это HTML</span>
      `
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

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  }
}

// Example
// new Mailer().sendVerificationEmail({
//     toEmail: "laapl@yandex.ru",
//     toName: "Никита",
//     code: "SNsdnbxjsj227632jdjskje83"
// });
