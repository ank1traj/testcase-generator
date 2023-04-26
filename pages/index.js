import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";

import * as Sentry from "@sentry/browser";
import LogRocket from "logrocket";
import { v4 as uuidv4 } from "uuid";
import Footer from "./footer";

const inter = Inter({ subsets: ["latin"] });

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    new Sentry.Replay({
      // Additional SDK configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  beforeSend: (event) => {
    // Check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  },
});

LogRocket.init("mbkjpk/testcase-generator");
// import { useMediaQuery } from '@mui/material'
LogRocket.identify(uuidv4());

export default function Home () {

  return (
    <>
      <Head>
        <title>Create Test Cases</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* navBar */}
        <nav className={styles.nav}>
          <div>
            {/* routes */}
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          {/* GitHub */}
          <div>
            <Link
              href="https://github.com/ank1traj/testcase-generator"
              rel="noopener noreferrer"
            >
              <code className={styles.code}>Contribute &hearts;</code>
            </Link>
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
            {/* <div className={styles.glow} /> */}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <Link
            href="/generator/integerGenerator"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Integer <CheckCircleIcon style={{ color: "green" }} />
            </h2>
            <p className={inter.className}>Generate random integers</p>
          </Link>

          <Link
            href="/generator/stringGenerator"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              String <CheckCircleIcon style={{ color: "green" }} />
            </h2>
            <p className={inter.className}>
              Generate random string of characters.
            </p>
          </Link>

          <Link
            href="/generator/arrayGenerator"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Array <CheckCircleIcon style={{ color: "green" }} />
            </h2>
            <p className={inter.className}>
              Generate random array of integer & float values.
            </p>
          </Link>

          <Link
            href="/generator/binaryTreeGenerator"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Binary Tree <ErrorIcon style={{ color: "red" }} />
            </h2>
            <p className={inter.className}>
              Generate random binary tree of integer values.
            </p>
          </Link>

          <Link
            href="/generator/linkedListGenerator"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Linked List
              <HourglassTopOutlinedIcon style={{ color: "green" }} />
            </h2>
            <p className={inter.className}>
              Generate random linked list of integer values.
            </p>
          </Link>

          <Link
            href="/generator/graphGenerator"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Graph <CheckCircleIcon style={{ color: "green" }} />
            </h2>
            <p className={inter.className}>
              Generate random graph of integer/char values.
            </p>
          </Link>
          <Link
            href="/generator/matrixGenerator"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Matrix <HourglassEmptyIcon style={{ color: "Blue" }} />
            </h2>
            <p className={inter.className}>
              Generate random Matrix of integer/char values.
            </p>
          </Link>
          <Link
            href="/generator/palindromeGenerator"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Palindrome <CheckCircleIcon style={{ color: "green" }} />
            </h2>
            <p className={inter.className}>
              Generate random Palindrome of integer/char values.
            </p>
          </Link>
        </div>
      </main>
      
      <Footer/>
    </>
  );
}
