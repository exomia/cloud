import nodemailer from 'nodemailer'
import cfg from '../../../../config/mail.config.json'

const transporter = nodemailer.createTransport(cfg)

transporter.verify(error => {
    if (error) {
        console.log(error)
    } else {
        console.log('Server is ready to take our messages')
    }
})

export function sendMail(obj) {
    transporter.sendMail(obj, (error, info) => {
        if (error) {
            return console.error(error)
        }
        console.log(info)
    })
}

export const TestMail = usernameOrEmail => ({
    from: 'Exomia.com <no-reply@exomia.com>',
    to: '',
    subject: 'Exomia.com - Forgot Password',
    text: `${usernameOrEmail}`
})
