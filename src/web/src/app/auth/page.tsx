'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import SignInForm from './components/signIn.form'
import SignUpForm from './components/signUp.form'
import {
  handleResendSignUpCode,
  handleSignIn,
  handleSignInWithRedirect,
  handleSignUp
} from '@/lib/auth' // Import the wrapper functions
import { TProvider } from '@/lib/auth/types'
// import { Google } from "lucide-react"

export default function Auth() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Sign in using the wrapper function
    try {
      const signInResult = await handleSignIn({ username: email, password }) // Use the handleSignIn function
      if (signInResult.isSignedIn) {
        // Check if sign in was successful
        router.push('/') // Redirect to home page after sign in
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const handleProviderSignIn = async (provider: TProvider) => {
    setIsLoading(true)
    try {
      await handleSignInWithRedirect(provider) // Call the sign-in with redirect function
    } catch (error) {
      console.error('Error during provider sign in:', error)
    }
    setIsLoading(false)
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm-password') as string

    if (password !== confirmPassword) {
      console.error('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Sign up using the wrapper function
    try {
      const signUpResult = await handleSignUp(
        { username: email, password },
        { email }
      ) // Use the handleSignUp function
      console.log('signUpResult', signUpResult)
      if (signUpResult.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        await handleResendSignUpCode(email)
        // If the user is already confirmed, redirect to login
        router.push(
          `/auth/confirm-signup?username=${encodeURIComponent(email)}`
        )
      }
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Account Access</CardTitle>
        <CardDescription>Login or create a new account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <SignInForm
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              handleGoogleSignIn={() => handleProviderSignIn('Google')} // Pass provider name
            />
          </TabsContent>
          <TabsContent value="register">
            <SignUpForm
              handleSubmit={handleRegister}
              isLoading={isLoading}
              handleGoogleSignIn={() => handleProviderSignIn('Google')} // Pass provider name
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Protected by reCAPTCHA and subject to the Privacy Policy and Terms of
          Service.
        </p>
      </CardFooter>
    </Card>
  )
}
