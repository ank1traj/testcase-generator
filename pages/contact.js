import styles from "@/styles/Home.module.css";
import {useState} from "react";
import Nav from "./nav";
import Footer from "./footer";
export default function contact() {
    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [subject, setSubject] = useState("");
    const [msg, setMsg] = useState("");
    const send=(e)=>{
        alert("Message is handled in this function");
    }
return (
<>
    <div>
        <Nav />
        <div className={styles.contact_form} style={{ padding:"20px"}}>
            <div className={styles.getintouch}>
                <h2>Get In Touch</h2>
            </div>
            <div className={styles.details}>
                <div className={styles.message}>
                    <div className={styles.name_email}>
                        <input className={styles.inputcss} type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input className={styles.inputcss} type="email" placeholder="Email" value={email} onChange={(e)=> setMail(e.target.value)} required />
                    </div>
                    <div className={styles.others}>
                        <input  className={styles.inputcss} type="text" placeholder="Subject" value={subject} onChange={(e)=> setSubject(e.target.value)} />
                        <textarea className={styles.textareacss} type="text" rows={4} placeholder="Message..." value={msg} onChange={(e)=> setMsg(e.target.value)} required></textarea>
                        <button type="submit" onClick={send}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</>
);
}
