'use client'

const AccountComponent = () => {
  const session = {
    user: {
      name: 'John Doe'
    }
  }

  const signOut = () => {
    console.log('Implement sign out')
  }

  const signIn = () => {
    console.log('Implement sign in')
  }

  return (
    <div>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          {/* <Link href="/auth">Sign In</Link> */}
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      )}
    </div>
  )
}

export default AccountComponent
