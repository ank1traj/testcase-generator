import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { UserButton } from "@clerk/nextjs";
import Footer from "./footer";
"use client";
import { useUser } from "@clerk/nextjs";
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
