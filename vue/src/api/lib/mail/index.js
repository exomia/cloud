import nodemailer from 'nodemailer'
import { transport, settings } from '../../../../config/mail.config.json'

const transporter = nodemailer.createTransport(transport)

transporter.verify(error => {
    if (error) {
        return console.log(error)
    }
    console.log('Server is ready to take our messages')
})

export function sendMail(mailOptions) {
    transporter.sendMail(
        {
            from: `${settings['from-host']} <${settings['from-sender']}>`,
            sender: settings['from-sender'],
            ...mailOptions
        },
        (error, info) => {
            if (error) {
                return console.error(error)
            }
            console.log(info)
        }
    )
}

export function sendForgotPasswordMail(origin, { uuid, email, name }, forgotpassword_uuid) {
    return sendMail({
        to: email,
        subject: `${settings['from-host']} - Forgot password`,
        text: `
            ${name},\n
            you requested a password change.\n
            To change your password, follow the link below which will take you\n
            to the change password page where you can enter a new password.\n\n
            If you did not request this email, you can safely ignore it, contact the support or the side owner.\n\n
            Link:\n
            ${origin}/forgotpassword/${uuid}/${forgotpassword_uuid}\n\n
            Best regards,\n
            ${settings['from-host']} - Team`
    })
}

export function sendForgotPasswordInfoMail(origin, { email, name }) {
    return sendMail({
        to: email,
        subject: `${settings['from-host']} - Forgot password`,
        text: `
            ${name},\n
            your password was changed successfully.\n
            If you didn't requested a password change, please contact the support or site-owner immediately!\n\n
            Best regards,\n
            ${settings['from-host']} - Team`
    })
}
