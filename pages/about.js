import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { UserButton } from "@clerk/nextjs";
import Footer from "./footer";
"use client";
export default function About() {
    return (
        <>
            <div className={styles.contact}>
                <nav className={styles.nav}>
                    <div>
                        <Link href="/">Home</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                </nav>
            </div>
            <Footer />
        </>
    );
}
