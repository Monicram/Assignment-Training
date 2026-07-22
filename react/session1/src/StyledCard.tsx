function StyledCard() {
  return (
    <div className="card">
      <h3 className="card-title">Styled with className</h3>
      <p style={{ color: 'steelblue', fontSize: '14px' }}>
        This paragraph uses inline styles in TSX.
      </p>
      <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
        Bold and uppercase text.
      </p>
    </div>
  )
}

export default StyledCard

// Inline styles use an object and camelCase because TSX uses JavaScript.