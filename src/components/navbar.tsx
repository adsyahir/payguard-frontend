import { ShieldCheck, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/store/auth'

export type Page = 'dashboard' | 'transactions' | 'fraud'

const links: { key: Page; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'transactions', label: 'Transactions' },
  { key: 'fraud', label: 'Fraud Review' },
]

export function Navbar({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  const email = useAuth((s) => s.email)
  const logout = useAuth((s) => s.logout)
  const initials =
    email
      .split('@')[0]
      .split(/[.\-_]/)
      .map((s) => s[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'AR'
  return (
    <header className="sticky top-0 z-20 border-b bg-[#2f4f8f] text-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <ShieldCheck className="size-5" />
            PayGuard
            <span className="ml-1 text-xs font-normal text-white/70">Admin Console</span>
          </div>
          <nav className="flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => onNavigate(l.key)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm text-white/70 transition-colors hover:text-white',
                  page === l.key && 'bg-white/15 font-semibold text-white',
                )}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            <Avatar className="size-8">
              <AvatarFallback className="bg-white/20 text-xs text-white">{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="text-sm font-medium">Signed in</div>
              <div className="text-xs text-muted-foreground">{email || 'admin@novosoft.dev'}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="size-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
