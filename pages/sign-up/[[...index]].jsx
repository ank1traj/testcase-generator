import React from 'react'
import { SignUp } from '@clerk/nextjs'
import styles from "@/styles/Home.module.css";
export default function SignUpPage() {
  return (
      <div className={styles.signContainer}>
          <SignUp />
      </div>
  )
}
