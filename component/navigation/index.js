import Link from "next/link";
import styles from "@/styles/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" passHref legacyBehavior>
          <a>TestGenie</a>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/generator/integerGenerator" passHref legacyBehavior>
            <a>Integer</a>
          </Link>
        </li>
        <li>
          <Link href="/generator/stringGenerator" passHref legacyBehavior>
            <a>String</a>
          </Link>
        </li>

        <li>
          <Link href="/generator/arrayGenerator" passHref legacyBehavior>
            <a>Array</a>
          </Link>
        </li>

        <li>
          <Link href="/generator/binaryTreeGenerator" passHref legacyBehavior>
            <a>Binary Tree</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
