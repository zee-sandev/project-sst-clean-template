export const generatePassword = (length = 12) => {
  // Define character sets
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const numberChars = '0123456789'
  const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?'

  // Ensure the password meets Cognito requirements
  if (length < 8) {
    throw new Error('Password length must be at least 8 characters')
  }

  // Pick at least one character from each required set
  const getRandomChar = (chars: string) =>
    chars[Math.floor(Math.random() * chars.length)]

  let password = ''
  password += getRandomChar(uppercaseChars)
  password += getRandomChar(lowercaseChars)
  password += getRandomChar(numberChars)
  password += getRandomChar(specialChars)

  // Fill the remaining characters randomly
  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars
  for (let i = password.length; i < length; i++) {
    password += getRandomChar(allChars)
  }

  // Shuffle the password to avoid predictable patterns
  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('')

  return password
}
