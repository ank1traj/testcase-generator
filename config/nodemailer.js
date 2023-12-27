import nodemailer from "nodemailer";
import toast from "react-hot-toast";

const { EMAIL_SENDER, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.in",
    secure: true,
    port: 465,
    auth: {
        user: EMAIL_SENDER,
        pass: EMAIL_PASSWORD,
    },
});

transporter.verify((error) => {
    if (error) {
        toast.error("Error verifying transporter:", error);
    } else {
        toast.success("Transporter is ready for sending emails");
    }
});

export { transporter };
