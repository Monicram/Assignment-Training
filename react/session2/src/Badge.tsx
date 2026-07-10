interface BadgeProps {
  label: string
  color: string
}

function Badge({ label, color }: BadgeProps) {
  return (
    <span style={{
      background: color,
      color: 'white',
      padding: '2px 10px',
      borderRadius: '4px',
      fontSize: '12px',
    }}>
      {label}
    </span>
  )
}

export default Badge

// This component is responsible only for displaying a colored badge.