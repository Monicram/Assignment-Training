interface SummaryBarProps {
  total: number
  presentCount: number
  averageScore: number
}

export function SummaryBar({
  total,
  presentCount,
  averageScore,
}: SummaryBarProps) {
  return (
    <div>
      <p>Total: {total}</p>
      <p>Present: {presentCount}</p>
      <p>Average Score: {averageScore}</p>
    </div>
  )
}