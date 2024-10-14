'use client'

import Link from 'next/link'
import { currentAuthenticatedUser, handleSignOut } from '@/lib/auth' // Import the sign out handler
import { GetCurrentUserOutput } from 'aws-amplify/auth' // Import Auth from aws-amplify/auth
import { useEffect, useState } from 'react' // Import useEffect and useState
import { useRouter, usePathname } from 'next/navigation'

const AccountComponent = () => {
  const [user, setUser] = useState<GetCurrentUserOutput | undefined>(undefined) // State to hold user information
  const router = useRouter()
  const pathname = usePathname()

  const fetchUser = async () => {
    try {
      const currentUser = await currentAuthenticatedUser() // Get the current user
      console.log(currentUser)
      setUser(currentUser || undefined) // Set the user state, defaulting to null if no user is found
    } catch (error) {
      console.error('Error fetching user:', error)
    } // Close the try block
  }

  useEffect(() => {
    fetchUser() // Call the function to fetch user
  }, []) // Close the useEffect hook

  const signOut = async () => {
    try {
      await handleSignOut() // Handle sign out
      await fetchUser() // Refresh user after sign out
      if (pathname !== '/') {
        // Check if the current path is not the home page
        router.push('/') // Redirect to home page
      }
    } catch (error) {
      console.log('Test')
      console.error('Sign out error:', error)
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p> {/* Display username */}
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <Link href="/auth">Sign In</Link>
        </div>
      )}
    </div>
  )
}

export default AccountComponent
