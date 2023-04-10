import Link from 'next/link'
import styles from "@/styles/Home.module.css";

export default function about() {
    return (
        <div className={styles.about}>
            <nav className={styles.nav}>
                <div>
                    <Link href="/">Home</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                <div>
                    <Link
                        href='https://github.com/ank1traj/testcase-generator'
                        rel='noopener noreferrer'
                    >
                        <code className={styles.code}>Contribute &hearts;</code>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
