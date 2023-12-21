import React from 'react'
import { SignUp } from '@clerk/nextjs'
export default function SignUpPage() {
  return (
    <div>
        <div style={{display:"flex", justifyContent:"center",height:"100vh",alignItems:"center"}}>
            <SignUp />
        </div>
    </div>
  )
}
