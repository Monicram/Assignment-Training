interface ScoreBarProps {
  score: number
}

function ScoreBar({ score }: ScoreBarProps) {
  return (
    <div style={{ background: '#eee', borderRadius: '4px', height: '8px' }}>
      <div style={{
        width: `${score}%`,
        background: score >= 50 ? 'green' : 'red',
        height: '8px',
        borderRadius: '4px',
      }} />
    </div>
  )
}

export default ScoreBar

// This component is responsible only for displaying the score as a progress bar.