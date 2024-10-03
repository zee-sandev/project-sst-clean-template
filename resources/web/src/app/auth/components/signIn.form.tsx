import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@radix-ui/react-separator'
export default function SignInForm({
  handleSubmit,
  isLoading,
  handleGoogleSignIn
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  handleGoogleSignIn: () => void
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <Button className="w-full mt-4" type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      <div className="relative my-4">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          Or continue with
        </span>
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        {/* <Google className="mr-2 h-4 w-4" /> */}
        {isLoading ? 'Signing in...' : 'Sign in with Google'}
      </Button>
    </>
  )
}
