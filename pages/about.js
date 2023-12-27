import Link from "next/link";
import styles from "@/styles/Home.module.css";
"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Footer from "./footer";
export default function About() {
const { isSignedIn, user } = useUser();
return (
<>
    <div className={styles.contact}>
    <nav className={styles.nav}>
        <div>
        <Link href="/">Home</Link>
        <Link href="/contact">Contact</Link>
        </div>
        <div>
        <div>
        {!isSignedIn &&
            <>
            <Link
            href="sign-in"
            rel="noopener noreferrer"
            >
            <code className={styles.code}>Sign In</code>
            </Link>
            <Link
            href="sign-up"
            rel="noopener noreferrer"
            >
            <code className={styles.code}>Sign Up</code>
            </Link>
            </>
        }  
        {isSignedIn &&
        <>
            <UserButton afterSignOutUrl="/"/>
        </>
        }
        </div>
        </div>
    </nav>
    </div>
    <Footer />
</>
);
}
