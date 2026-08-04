type InternRowProps = {
  id: number
  name: string
  score: number
  onRemove: (id: number) => void
}

export default function InternRow({
  id,
  name,
  score,
  onRemove,
}: InternRowProps) {
  return (
    <div>
      <span>{name}</span>
      <span>Score: {score}</span>
      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  )
}