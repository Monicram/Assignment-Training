function SkillList() {
  const skills: string[] = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'React']

  return (
    <div>
      <h3>Skills Covered</h3>
      <ul>
        {skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <p>Total: {skills.length} skills</p>
    </div>
  )
}

export default SkillList


// It uses keys to identify list items and update them correctly.
// If we remove keys it shows error.