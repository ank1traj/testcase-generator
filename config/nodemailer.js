import nodemailer from "nodemailer"
export const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS,
    }

});

export const mailOptions={
    from:"vivekkr694@gmail.com",
    to:"vivekkr694@gmail.com",
}