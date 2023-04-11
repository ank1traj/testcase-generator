import Link from 'next/link'
import styles from "@/styles/Home.module.css"; 
import SearchBar from "pages/searchbar.js";

export default function contact() {
    return (
        <>
            <div className={styles.contact}>
                <nav className={styles.nav}>
                    <div>
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                    </div>
                    <div>
                        <Link
                            href='https://github.com/ank1traj/testcase-generator'
                            rel='noopener noreferrer'
                        >
                            <code className={styles.code}>Contribute &hearts;</code>
                        </Link>
                    </div>
                    <div className={styles.search}>
                        <SearchBar onSearch={"handleSearch"} /> {/* handleSearch function */}
                    </div>
                </nav>
            </div>
        </>
    )
}