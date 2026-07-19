import { Search, ChevronsUpDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { transactions } from '@/data/sample'

export function Transactions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Transactions</h1>
        <p className="text-sm text-muted-foreground">All processed payments with fraud score and decision.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by payment id or merchant…" className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All merchants" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All merchants</SelectItem>
            <SelectItem value="acme">Acme Store</SelectItem>
            <SelectItem value="globex">Globex Ltd</SelectItem>
            <SelectItem value="hooli">Hooli</SelectItem>
          </SelectContent>
        </Select>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="approve">Approve</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="block">Block</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                {['Payment ID', 'Merchant', 'Amount', 'Status', 'Fraud Score', 'Decision', 'Created'].map((h) => (
                  <TableHead key={h} className={cn(h === 'Amount' && 'text-right')}>
                    <span className="inline-flex items-center gap-1">
                      {h}
                      <ChevronsUpDown className="size-3 opacity-40" />
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>{t.merchant}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">${t.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{t.status}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs tabular-nums">{t.score.toFixed(2)}</span>
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <span className={cn('block h-full', scoreColor(t.score))} style={{ width: `${t.score * 100}%` }} />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DecisionBadge decision={t.decision} />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{t.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground">Showing {transactions.length} of 1,957 · example data</p>
    </div>
  )
}
