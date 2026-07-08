function SelfLearning() {
  return (
    <div>
      <h2>Self Learning Tasks</h2>

      {/* React.StrictMode helps find potential problems in the app during development. It checks components and shows warnings, but it does not affect the production build. */}

      {/* A controlled component is managed by React state, while an uncontrolled component manages its own state using the DOM. */}

      {/* The key prop helps React identify each item in a list. Using the array index as a key is not recommended because items can change order. Use a unique id instead. */}

      {/* Fragments group multiple elements without adding an extra HTML element. A Fragment can have a key only when using <React.Fragment key={...}>. The short syntax <>...</> cannot have a key. */}

      <p>Completed self-learning research.</p>
    </div>
  )
}

export default SelfLearning