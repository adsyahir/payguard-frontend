import { useState } from 'react'
import { Check, X, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { DecisionBadge } from '@/components/decision-badge'
import { cn } from '@/lib/utils'
import { reviewQueue, decisionOf } from '@/data/sample'

const levelColor = { lo: 'bg-emerald-500', mid: 'bg-amber-500', hi: 'bg-red-500' } as const

function Gauge({ score }: { score: number }) {
  const r = 62
  const c = 2 * Math.PI * r
  const color = score >= 0.7 ? '#c0392b' : score >= 0.3 ? '#b7791f' : '#1f9d55'
  return (
    <div className="relative size-[150px] shrink-0">
      <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
        <circle cx="75" cy="75" r={r} fill="none" stroke="var(--color-muted)" strokeWidth="14" />
        <circle
          cx="75"
          cy="75"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tabular-nums">{score.toFixed(2)}</span>
        <span className="text-xs text-muted-foreground">fraud score</span>
      </div>
    </div>
  )
}

export function FraudReview() {
  const [selectedId, setSelectedId] = useState(reviewQueue[0].id)
  const item = reviewQueue.find((r) => r.id === selectedId)!

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Fraud Review Queue</h1>
        <p className="text-sm text-muted-foreground">
          Transactions in the REVIEW band (score 0.30–0.69) awaiting a manual decision.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        {/* Queue */}
        <Card className="h-fit">
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Queue · {reviewQueue.length} held</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {reviewQueue.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={cn(
                  'flex w-full flex-col items-start gap-1 border-b px-4 py-3 text-left last:border-b-0 hover:bg-muted/60',
                  r.id === selectedId && 'border-l-2 border-l-amber-500 bg-amber-50 dark:bg-amber-500/10',
                )}
              >
                <span className="font-mono text-sm font-semibold">{r.id}</span>
                <span className="flex w-full justify-between text-xs text-muted-foreground">
                  <span>{r.merchant}</span>
                  <span className="tabular-nums">{r.score.toFixed(2)}</span>
                </span>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Detail */}
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div className="flex flex-wrap items-center gap-8">
              <Gauge score={item.score} />
              <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Payment ID</dt>
                <dd className="font-mono font-semibold">{item.id}</dd>
                <dt className="text-muted-foreground">Merchant</dt>
                <dd className="font-semibold">{item.merchant}</dd>
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="font-semibold tabular-nums">${item.amount.toFixed(2)}</dd>
                <dt className="text-muted-foreground">Decision</dt>
                <dd><DecisionBadge decision={decisionOf(item.score)} /></dd>
                <dt className="text-muted-foreground">Scored by</dt>
                <dd className="font-semibold">{item.scoredBy}</dd>
                <dt className="text-muted-foreground">Received</dt>
                <dd className="font-semibold">{item.received}</dd>
              </dl>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Feature Contributions</h3>
              <div className="space-y-3">
                {item.features.map((f) => (
                  <div key={f.name}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span>{f.name}</span>
                      <span className="tabular-nums text-muted-foreground">{f.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className={cn('h-full', levelColor[f.level])} style={{ width: `${f.weight * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-3">
              <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Check className="size-4" /> Approve &amp; Capture
              </Button>
              <Button variant="destructive">
                <X className="size-4" /> Block &amp; Alert Merchant
              </Button>
              <Button variant="outline">
                <HelpCircle className="size-4" /> Request more info
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Thresholds:</span>
              <Badge variant="secondary" className="border-transparent bg-emerald-100 text-emerald-700">0.00–0.29 APPROVE</Badge>
              <Badge variant="secondary" className="border-transparent bg-amber-100 text-amber-700">0.30–0.69 REVIEW</Badge>
              <Badge variant="secondary" className="border-transparent bg-red-100 text-red-700">0.70–1.00 BLOCK</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
