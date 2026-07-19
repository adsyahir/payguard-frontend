import { useState } from 'react'
import { Navbar, type Page } from '@/components/navbar'
import { Dashboard } from '@/pages/dashboard'
import { Transactions } from '@/pages/transactions'
import { FraudReview } from '@/pages/fraud-review'
import { Login } from '@/pages/login'
import { useAuth } from '@/store/auth'

function App() {
  const isAuthed = useAuth((s) => s.isAuthed)
  const [page, setPage] = useState<Page>('dashboard')

  if (!isAuthed) return <Login />

  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <Navbar page={page} onNavigate={setPage} />
      <main className="mx-auto max-w-6xl px-6 py-8">
        {page === 'dashboard' && <Dashboard />}
        {page === 'transactions' && <Transactions />}
        {page === 'fraud' && <FraudReview />}
      </main>
    </div>
  )
}

export default App
