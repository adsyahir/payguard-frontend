// Static example data for UI mockups only — no backend wiring.

export type Decision = 'APPROVE' | 'REVIEW' | 'BLOCK'

export type Transaction = {
  id: string
  merchant: string
  amount: number
  currency: string
  status: string
  score: number
  decision: Decision
  time: string
}

export function decisionOf(score: number): Decision {
  if (score >= 0.7) return 'BLOCK'
  if (score >= 0.3) return 'REVIEW'
  return 'APPROVE'
}

export const kpis = [
  { label: 'Volume Today', value: '$248,910', delta: '+6.2%', trend: 'up' as const, hint: 'vs yesterday' },
  { label: 'Approved', value: '1,842', delta: '94.1%', trend: 'flat' as const, hint: 'of transactions' },
  { label: 'In Review', value: '73', delta: '0.30–0.69', trend: 'flat' as const, hint: 'score band' },
  { label: 'Blocked', value: '42', delta: '+4', trend: 'up' as const, hint: 'vs yesterday' },
]

// fraud-rate %, last 14 days
export const fraudRate = [1.8, 1.6, 1.9, 1.3, 1.5, 1.0, 1.2, 0.8, 1.1, 0.7, 0.9, 0.6, 0.8, 0.5]

export const transactions: Transaction[] = [
  { id: 'pay_9f3a21', merchant: 'Acme Store', amount: 129.0, currency: 'USD', status: 'completed', score: 0.11, decision: 'APPROVE', time: 'Jul 18 · 11:04' },
  { id: 'pay_9f3a19', merchant: 'Globex Ltd', amount: 1940.0, currency: 'USD', status: 'in_review', score: 0.52, decision: 'REVIEW', time: 'Jul 18 · 11:02' },
  { id: 'pay_9f3a17', merchant: 'Initech', amount: 78.5, currency: 'USD', status: 'completed', score: 0.08, decision: 'APPROVE', time: 'Jul 18 · 10:59' },
  { id: 'pay_9f3a12', merchant: 'Umbrella Co', amount: 3200.0, currency: 'USD', status: 'blocked', score: 0.86, decision: 'BLOCK', time: 'Jul 18 · 10:57' },
  { id: 'pay_9f3a08', merchant: 'Soylent Inc', amount: 44.99, currency: 'USD', status: 'completed', score: 0.19, decision: 'APPROVE', time: 'Jul 18 · 10:55' },
  { id: 'pay_9f3a05', merchant: 'Hooli', amount: 612.0, currency: 'USD', status: 'in_review', score: 0.41, decision: 'REVIEW', time: 'Jul 18 · 10:53' },
  { id: 'pay_9f39f8', merchant: 'Pied Piper', amount: 255.0, currency: 'USD', status: 'completed', score: 0.14, decision: 'APPROVE', time: 'Jul 18 · 10:50' },
  { id: 'pay_9f39f1', merchant: 'Wonka Corp', amount: 5780.0, currency: 'USD', status: 'blocked', score: 0.91, decision: 'BLOCK', time: 'Jul 18 · 10:47' },
]

export type ReviewItem = {
  id: string
  merchant: string
  amount: number
  score: number
  scoredBy: string
  received: string
  features: { name: string; value: string; weight: number; level: 'lo' | 'mid' | 'hi' }[]
}

export const reviewQueue: ReviewItem[] = [
  {
    id: 'pay_9f3a19',
    merchant: 'Globex Ltd',
    amount: 1940.0,
    score: 0.52,
    scoredBy: 'model v2.4.1',
    received: 'Jul 18 · 11:02',
    features: [
      { name: 'Transaction velocity (1h)', value: '7 txns · high', weight: 0.78, level: 'hi' },
      { name: 'Amount z-score vs merchant avg', value: '+3.1σ', weight: 0.7, level: 'hi' },
      { name: 'Geo mismatch (billing vs IP)', value: 'yes', weight: 0.55, level: 'mid' },
      { name: 'New device fingerprint', value: 'no', weight: 0.15, level: 'lo' },
      { name: 'Merchant risk tier', value: 'medium', weight: 0.45, level: 'mid' },
    ],
  },
  {
    id: 'pay_9f3a05',
    merchant: 'Hooli',
    amount: 612.0,
    score: 0.41,
    scoredBy: 'model v2.4.1',
    received: 'Jul 18 · 10:53',
    features: [
      { name: 'Transaction velocity (1h)', value: '3 txns · normal', weight: 0.35, level: 'mid' },
      { name: 'Amount z-score vs merchant avg', value: '+1.4σ', weight: 0.42, level: 'mid' },
      { name: 'Geo mismatch (billing vs IP)', value: 'no', weight: 0.1, level: 'lo' },
      { name: 'New device fingerprint', value: 'yes', weight: 0.6, level: 'mid' },
      { name: 'Merchant risk tier', value: 'low', weight: 0.2, level: 'lo' },
    ],
  },
  {
    id: 'pay_9f39e7',
    merchant: 'Vandelay',
    amount: 880.0,
    score: 0.63,
    scoredBy: 'model v2.4.1',
    received: 'Jul 18 · 10:49',
    features: [
      { name: 'Transaction velocity (1h)', value: '9 txns · high', weight: 0.82, level: 'hi' },
      { name: 'Amount z-score vs merchant avg', value: '+2.2σ', weight: 0.58, level: 'mid' },
      { name: 'Geo mismatch (billing vs IP)', value: 'yes', weight: 0.6, level: 'mid' },
      { name: 'New device fingerprint', value: 'yes', weight: 0.55, level: 'mid' },
      { name: 'Merchant risk tier', value: 'high', weight: 0.7, level: 'hi' },
    ],
  },
  {
    id: 'pay_9f39d2',
    merchant: 'Stark Ind',
    amount: 420.0,
    score: 0.37,
    scoredBy: 'model v2.4.1',
    received: 'Jul 18 · 10:44',
    features: [
      { name: 'Transaction velocity (1h)', value: '2 txns · normal', weight: 0.25, level: 'lo' },
      { name: 'Amount z-score vs merchant avg', value: '+1.1σ', weight: 0.38, level: 'mid' },
      { name: 'Geo mismatch (billing vs IP)', value: 'no', weight: 0.1, level: 'lo' },
      { name: 'New device fingerprint', value: 'yes', weight: 0.5, level: 'mid' },
      { name: 'Merchant risk tier', value: 'medium', weight: 0.45, level: 'mid' },
    ],
  },
]
