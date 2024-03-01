import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

import MenuIcon from '@mui/icons-material/Menu';

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import { UserButton } from "@clerk/nextjs";
import * as Sentry from "@sentry/browser";
import LogRocket from "logrocket";
import { v4 as uuidv4 } from "uuid";
"use client";
import { useUser } from "@clerk/nextjs";
import Footer from "./footer";
const inter = Inter({ subsets: ["latin"] });

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ]
});

const links = [
  {
    href: "/generator/integerGenerator",
    title: "Integer",
    description: "Generate random integers",
    iconType: CheckCircleIcon,
    iconColor: "green",
  },
  {
    href: "/generator/stringGenerator",
    title: "String",
    description: "Generate random string of characters",
    iconType: CheckCircleIcon,
    iconColor: "green",
  },
  {
    href: "/generator/arrayGenerator",
    title: "Array",
    description: "Generate random array of integer & float values",
    iconType: CheckCircleIcon,
    iconColor: "green",
  },
  {
    href: "/generator/binaryTreeGenerator",
    title: "Binary Tree",
    description: "Generate random binary tree of integer values",
    iconType: ErrorIcon,
    iconColor: "red",
  },
  {
    href: "/generator/linkedListGenerator",
    title: "Linked List",
    description: "Generate random linked list of integer values",
    iconType: HourglassTopOutlinedIcon,
    iconColor: "green",
  },
  {
    href: "/generator/graphGenerator",
    title: "Graph",
    description: "Generate random graph of integer/char values",
    iconType: CheckCircleIcon,
    iconColor: "green",
  },
  {
    href: "/generator/matrixGenerator",
    title: "Matrix",
    description: "Generate random Matrix of integer/char values",
    iconType: HourglassEmptyIcon,
    iconColor: "blue",
  },
  {
    href: "/generator/palindromeGenerator",
    title: "Palindrome",
    description: "Generate random Palindrome of integer/char values",
    iconType: CheckCircleIcon,
    iconColor: "green",
  },
];

function renderLink(link) {
  return (
    <Link href={link.href} className={styles.card} rel="noopener noreferrer" key={link.href}>
      <h2 className={inter.className}>
        {link.title}{" "}
        {React.createElement(link.iconType, { style: { color: link.iconColor } })}
      </h2>
      <p className={inter.className}>{link.description}</p>
    </Link>
  );
}

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET);

    const logRocketID = isSignedIn
      ? user?.primaryEmailAddress?.emailAddress || "guest-" + uuidv4()
      : uuidv4();

    LogRocket.identify(logRocketID, {
      name: isSignedIn ? user?.fullName || "Guest" : "Guest",
      email: isSignedIn ? user?.primaryEmailAddress?.emailAddress || "guest@example.com" : "guest@example.com",
    });

    const userFeedback = {
      event_id: logRocketID,
      name: isSignedIn ? user?.fullName || "Guest" : "Guest",
      email: isSignedIn ? user?.primaryEmailAddress?.emailAddress || "guest@example.com" : "guest@example.com",
      comments: "I really like your App, thanks!",
    };

    Sentry.setUser({
      id: userFeedback.event_id,
      username: userFeedback.name,
      email: userFeedback.email,
    });

    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [
        Sentry.feedbackIntegration({
          buttonLabel: "Feedback",
          submitButtonLabel: "Send Feedback",
          formTitle: "Send Feedback",
          showBranding: false,
          emailPlaceholder: isSignedIn ? user?.primaryEmailAddress?.emailAddress || "guest@example.com" : "guest@example.com",
          colorScheme: "system",
          useSentryUser: {
            email: "email",
            name: "username",
          },
          additionalFields: [
            {
              name: "feedbackType",
              type: "select",
              label: "Feedback Type",
              options: ["General Feedback", "Bug Report"],
            },
          ],
        }),
      ],
      beforeSend: (event) => {
        if (event.exception) {
          Sentry.showReportDialog({ eventId: userFeedback.event_id });
        }
        return event;
      },
    })


    Sentry.captureMessage("User Feedback", {
      user: userFeedback,
    });
  }, [isSignedIn, user]);

  function func_display() {
    setDisplay(!display);
  }

  return (
    <>
      <Head>
        <title>Create Test Cases</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <div className={styles.lgnav}>
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                <button className={styles.button}>
                  <span className={styles.buttontop}>{link.title}</span>
                </button>
              </Link>
            ))}
          </div>
          <div className={`${display ? styles.smnav : styles.hide}`}>
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className={styles.menu_icon} onClick={func_display}>
            <MenuIcon />
          </div>
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
        <div className={styles.grid}>{links.map(renderLink)}</div>
        <div className={styles.iconInfo}>
          <ul className={styles.horizontalIconList}>
            <div className={styles.fir_two}>
              <li>
                <CheckCircleIcon style={{ color: "green" }} />
                <span className={styles.iconLabel}>Completed</span>
              </li>
              <li>
                <ErrorIcon style={{ color: "red" }} />
                <span className={styles.iconLabel}>Not Started yet</span>
              </li>
            </div>
            <div className={styles.las_two}>
              <li>
                <HourglassTopOutlinedIcon style={{ color: "green" }} />
                <span className={styles.iconLabel}>In Progress</span>
              </li>
              <li>
                <HourglassEmptyIcon style={{ color: "blue" }} />
                <span className={styles.iconLabel}>Next</span>
              </li>
            </div>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
