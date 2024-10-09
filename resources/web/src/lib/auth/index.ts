import {
  signIn,
  signInWithRedirect,
  signUp,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  signOut,
  SignInOutput,
  SignUpOutput,
  ConfirmSignUpOutput,
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession,
  deleteUser,
  updatePassword,
  updateUserAttributes
} from 'aws-amplify/auth'
import { TAuthParams, TAccount, TAttributes, TProvider } from './types'

export const handleSignIn = async (
  params: TAuthParams
): Promise<SignInOutput> => {
  const { username, password } = params
  try {
    const result = await signIn({ username, password })
    console.log(result)
    if (!result) {
      throw new Error('Invalid username or password')
    }

    return result
  } catch (error) {
    console.error('Sign in error:', error)
    throw new Error('Sign in failed. Please try again.')
  }
}

export const handleSignInWithRedirect = async (
  provider: TProvider
): Promise<void> => {
  try {
    await signInWithRedirect({
      provider
    })
  } catch (error) {
    console.error('Sign in with redirect error:', error)
  }
}

export const handleSignUp = async (
  params: TAuthParams,
  attributes: TAttributes,
  autoSignIn: boolean = true
): Promise<SignUpOutput> => {
  const { username, password } = params
  try {
    const result = await signUp({
      username,
      password,
      options: {
        userAttributes: attributes,
        autoSignIn: autoSignIn
      }
    })
    if (!result) {
      throw new Error('Sign up failed. Please try again.')
    }
    return result
  } catch (error) {
    console.error('Sign up error:', error)
    throw new Error('Sign up failed. Please try again.')
  }
}

export const handleResendSignUpCode = async (
  username: string
): Promise<void> => {
  try {
    await resendSignUpCode({
      username
    })
  } catch (error) {
    console.error('Resend sign up code error:', error)
  }
}

export const handleConfirmSignUp = async (
  username: string,
  confirmationCode: string
): Promise<ConfirmSignUpOutput> => {
  try {
    const result = await confirmSignUp({
      username,
      confirmationCode
    })
    if (!result || !result.isSignUpComplete) {
      throw new Error(
        'Confirmation failed. Invalid username or confirmation code.'
      )
    }
    return result
  } catch (error) {
    console.error('Confirm sign up error:', error)
    throw new Error('Confirm sign up failed. Please try again.')
  }
}

export const handleResetPassword = async (username: string): Promise<void> => {
  try {
    await resetPassword({
      username
    })
  } catch (error) {
    console.error('Reset password error:', error)
    throw new Error('Reset password failed. Please try again.')
  }
}

export const handleSignOut = async (): Promise<void> => {
  try {
    await signOut()
  } catch (error) {
    console.error('Sign out error:', error)
  }
}

export const currentAuthenticatedUser = async (): Promise<
  TAccount | undefined
> => {
  try {
    await fetchAuthSession({ forceRefresh: true })
    const crrUser = await getCurrentUser()
    const userAttributes = await fetchUserAttributes()
    const user: TAccount = {
      username: crrUser?.username,
      userId: crrUser?.userId,
      attributes: userAttributes
    }
    return user
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export const handleDeleteUser = async (): Promise<void> => {
  try {
    await deleteUser()
    console.log(`User deleted successfully.`)
  } catch (error) {
    console.error('Delete user error:', error)
    throw new Error('Delete user failed. Please try again.')
  }
}

export const handleUpdatePassword = async (
  newPassword: string,
  oldPassword: string
): Promise<void> => {
  try {
    await updatePassword({ newPassword, oldPassword })
    console.log('Password updated successfully.')
  } catch (error) {
    console.error('Update password error:', error)
    throw new Error('Update password failed. Please try again.')
  }
}
