import { transporter } from "@/config/nodemailer";
import toast from "react-hot-toast";

export default async function handler(req, res) {
    const data=req.body;
    try{
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
        }
        else{
            await transporter.sendMail({
                from: data.email,
                to:process.env.EMAIL,
                subject: data.value,
                html: "<p>Couldn't Generate Test Cases due to some Error.",
            })
        }
    }
    catch(error){
        toast.error(error);
    }
    res.status(200).json({ name: 'John Doe' })
}