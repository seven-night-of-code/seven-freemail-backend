const nodemailer = require("nodemailer");
class MailService {

    transporter () {
        console.log("email password:",process.env.MAIL_PASSWORD);
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            service: 'gmail',
            secure: true,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    async send (receivers, subject, content) {
        try {

            await this.transporter().sendMail({
                from: "Free Email <billytatangwa5@gmail.com>",
                to: receivers,
                subject: subject,
                text: content,
            });

            return { error: false };
        } catch (error) {

            console.log(error);
            return { error: true };
        }
    }
}

module.exports = new MailService();