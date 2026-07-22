import { useInterns } from '../contexts/intern-context'
import useInternSearch from '../hooks/useInternSearch'

function InternSearch() {
  const { interns } = useInterns()
  const { search, setSearch, filtered, stats } = useInternSearch(interns)

  return (
    <div style={{ padding: '16px' }}>
      <input
        type="text"
        placeholder="Search Intern"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>Total: {stats.total}</p>
      <p>Present: {stats.present}</p>
      <p>Average Score: {stats.avg}</p>

      <ul>
        {filtered.map((intern) => (
          <li key={intern.id}>
            {intern.name} - {intern.role} - {intern.score}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InternSearch