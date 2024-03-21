const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

// create sendmail function
const sendMail = async (options)=>{

    // create transport service to send  mail
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        service: process.env.SMTP_SERVICE,
        secure: false,

        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS
        }
    })

    // parse path, where template of the mail
    const templatePath = path.join(__dirname, "../../utils/mails", options.template)

    // use ejs to render html file, including data in the template
    const html = ejs.renderFile(templatePath, options.data)

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.mail, //who to send to
        subject: options.subject, // subject of the mail
        html: html //html to render
    }
    // let info = await transporter.sendMail({
    //     from: ,
    //     to: ,
    //     subject: ,
    //     html: 
    // }):

    let info = await transporter.sendMail(mailOptions)
    console.log(`Message sent: ${info.messageId}`)
};




module.exports = sendMail;