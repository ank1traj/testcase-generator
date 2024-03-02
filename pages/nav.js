import Link from "next/link";
import styles from "@/styles/Home.module.css";
"use client";
export default function Nav() {
return (
        <>
            <div className={styles.contact}>
                <nav className={styles.nav}>
                    <div>
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                </nav>
                <div className={styles.description}>
                    <p>An Open Source Comprehensive Test Case Generator</p>
                    <div className={styles.author}>
                        <a
                        href="https://www.linkedin.com/in/ank1traj/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        By Ankit Raj
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
