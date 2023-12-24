import { transporter,mailOptions } from "@/config/nodemailer";

export default async function handler(req, res) {
    const data=req.body;
    try{
        if (data.value=="Test Case Generated Successfully!!!"){
            await transporter.sendMail({
                ...mailOptions,
                subject: data.value,
                html: "<strong>Test Cases has been generated successfully.</strong>"
            })
        }
        else{
            await transporter.sendMail({
                ...mailOptions,
                subject: data.value,
                html: "<p>Couldn't Generate Test Cases due to some Error."
            })
        }
    }
    catch(error){
        console.log(error);
    }
    res.status(200).json({ name: 'John Doe' })
}