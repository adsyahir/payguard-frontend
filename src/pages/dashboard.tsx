import { ArrowUpRight, CheckCircle2, ShieldAlert, Ban } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DecisionBadge, scoreColor } from '@/components/decision-badge'
import { cn } from '@/lib/utils'
import { kpis, fraudRate, transactions } from '@/data/sample'

const kpiIcon = [ArrowUpRight, CheckCircle2, ShieldAlert, Ban]

function Sparkline({ data }: { data: number[] }) {
  const w = 720
  const h = 120
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * (h - 12) - 6
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full" preserveAspectRatio="none">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} className="stroke-border" strokeWidth="1" />
      ))}
      <polygon fill="var(--color-primary)" fillOpacity="0.08" points={`0,${h} ${pts.join(' ')} ${w},${h}`} />
      <polyline fill="none" stroke="var(--color-primary)" strokeWidth="2.5" points={pts.join(' ')} />
    </svg>
  )
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Overview — Today</h1>
        <p className="text-sm text-muted-foreground">Live snapshot of payment volume and fraud decisions.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => {
          const Icon = kpiIcon[i]
          return (
            <Card key={k.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription className="text-xs uppercase tracking-wide">{k.label}</CardDescription>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{k.value}</div>
                <p className={cn('mt-1 text-xs', k.trend === 'up' ? 'text-emerald-600' : 'text-muted-foreground')}>
                  {k.delta} <span className="text-muted-foreground">{k.hint}</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Fraud Rate — Last 14 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <Sparkline data={fraudRate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 6).map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>{t.merchant}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">${t.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs tabular-nums">{t.score.toFixed(2)}</span>
                      <span className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                        <span className={cn('block h-full', scoreColor(t.score))} style={{ width: `${t.score * 100}%` }} />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DecisionBadge decision={t.decision} />
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{t.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
