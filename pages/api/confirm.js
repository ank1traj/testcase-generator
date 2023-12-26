import { transporter } from "@/config/nodemailer";

export default async function handler(req, res) {
    const data=req.body;
    if (data.value=="Test Case Generated Successfully!!!"){
        await transporter.sendMail({
            from: data.email,
            to:process.env.EMAIL,
            subject: data.value,
            html: "<strong>Test Cases has been generated successfully.</strong>",
            attachments:[
                {
                    filename: data.filename,
                    content: data.content,
                    contentType: "text/plain"
                }
            ]
        })
        return res.json({status: 200});
    }
    else{
        await transporter.sendMail({
            from: data.email,
            to:process.env.EMAIL,
            subject: data.value,
            html: "<p>Couldn't Generate Test Cases due to some Error.",
        })
        return res.json({status: 400});
    }
}