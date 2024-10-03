'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { handleConfirmSignUp } from '@/lib/auth' // Import the confirm sign-up handler

export default function ConfirmSignUp() {
  const searchParams = useSearchParams()
  const initialUsername = searchParams.get('username') || ''
  const [username, setUsername] = useState<string>(initialUsername)
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await handleConfirmSignUp(username, confirmationCode)
      // Redirect to login page upon successful confirmation
      router.push('/auth')
    } catch (err) {
      console.error(err)
      setError('Confirmation failed. Please check your code and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Confirm Your Account</CardTitle>
        <CardDescription>
          Enter the confirmation code sent to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirm-username">Username</Label>
              <Input
                id="confirm-username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {}}
                disabled
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmation-code">Confirmation Code</Label>
              <Input
                id="confirmation-code"
                name="confirmationCode"
                type="text"
                placeholder="Enter your confirmation code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? 'Confirming...' : 'Confirm Account'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="relative my-4 w-full">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            Already confirmed?
          </span>
        </div>
        <Button
          variant="link"
          className="text-primary underline"
          onClick={() => router.push('/auth')}
        >
          Go to Login
        </Button>
      </CardFooter>
    </Card>
  )
}
