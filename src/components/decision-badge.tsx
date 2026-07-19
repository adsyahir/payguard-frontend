import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Decision } from '@/data/sample'

const styles: Record<Decision, string> = {
  APPROVE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  REVIEW: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  BLOCK: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
}

export function DecisionBadge({ decision }: { decision: Decision }) {
  return (
    <Badge variant="secondary" className={cn('border-transparent font-semibold', styles[decision])}>
      {decision}
    </Badge>
  )
}

export const scoreColor = (score: number) =>
  score >= 0.7 ? 'bg-red-500' : score >= 0.3 ? 'bg-amber-500' : 'bg-emerald-500'
