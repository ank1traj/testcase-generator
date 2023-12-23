import React from 'react'
import { SignIn } from '@clerk/nextjs'
import styles from "@/styles/Home.module.css";
export default function SignInPage() {
  return (
    <div>
        <div className={styles.signContainer}>
            <SignIn />
        </div>
    </div>
  )
}
