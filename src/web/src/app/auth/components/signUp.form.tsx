import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@radix-ui/react-separator'

export default function SignUpForm({
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
            <Label htmlFor="register-name">Name</Label>
            <Input
              id="register-name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="register-confirm-password">Confirm Password</Label>
            <Input
              id="register-confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
        <Button className="w-full mt-4" type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      <div className="relative my-4">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          Or register with
        </span>
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleGoogleSignIn()} // Call the function with provider name
        disabled={isLoading}
      >
        {/* <Google className="mr-2 h-4 w-4" /> */}
        {isLoading ? 'Registering...' : 'Register with Google'}
      </Button>
    </>
  )
}
