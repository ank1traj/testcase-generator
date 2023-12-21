import React from 'react'
import { SignIn } from '@clerk/nextjs'
export default function SignInPage() {
  return (
    <div>
        <div style={{display:"flex", justifyContent:"center",height:"100vh",alignItems:"center"}}>
            <SignIn />
        </div>
    </div>
  )
}
