import React from 'react'
import styles from "@/styles/Home.module.css"
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from 'next/link';
export default function Footer() {
  const today=new Date();
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footer_icon}>
          <div className={styles.github_icon}>
            <FaGithub />
          </div>
          <div className={styles.linkedin_icon}>
            <FaLinkedinIn />
          </div> 
        </div>
        <div className={styles.footer_nav}>
            <Link href="/" className={styles.footer_link}>Home</Link>
            <Link href="/about" className={styles.footer_link}>About</Link>
            <Link href="/contact" className={styles.footer_link}>Contact</Link>
            <Link href="https://github.com/WebSorcery/testcase-generator" target='_blank' className={styles.footer_link}>Contribute</Link>
        </div>
        <div className={styles.copyright}>
          <p>Copyright &copy; {(today.getFullYear())} </p>
        </div>
      </div>
    </>
  )
}
