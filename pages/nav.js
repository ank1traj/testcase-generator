import Link from "next/link";
import styles from "@/styles/Home.module.css";
"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
export default function Nav() {
const { isSignedIn, user } = useUser();
return (
<>
    <div className={styles.contact}>
        <nav className={styles.nav}>
            <div>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
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
                {/* <p>{user.primaryEmailAddress.emailAddress}</p> */}
            </>
            }
            </div>
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
