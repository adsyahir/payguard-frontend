import { useState } from 'react'
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/store/auth'

export function Login() {
  const login = useAuth((s) => s.login)
  const [email, setEmail] = useState('admin@novosoft.dev')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  // UI only — no validation, no request. Just flips the auth gate.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email || 'admin@novosoft.dev')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-[#2f4f8f] text-white">
            <ShieldCheck className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">PayGuard</h1>
          <p className="text-sm text-muted-foreground">Admin Console — sign in to continue</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sign in</CardTitle>
            <CardDescription>Use your merchant admin or risk analyst account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <a href="#" className="text-xs text-[#2f4f8f] hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={show ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="px-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#2f4f8f] hover:bg-[#26417a]">
                Sign in
              </Button>
            </form>

            <div className="my-4 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>

            <Button variant="outline" className="w-full" onClick={() => login('admin@novosoft.dev')}>
              Continue with SSO
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          No account? <a href="#" className="text-[#2f4f8f] hover:underline">Request merchant onboarding</a>
        </p>
      </div>
    </div>
  )
}
