// Task 1 

// import PropDrillingDemo from './components/PropDrillingDemo'

// function App() {
//   return <PropDrillingDemo />
// }

// export default App

// Task 2

// import Navbar from './components/Navbar'
// import ThemedCard from './components/ThemedCard'
// import { useInterns } from './contexts/intern-context'

// function App() {
//   const { interns, isLoading } = useInterns()

//   if (isLoading) {
//     return <p>Loading...</p>
//   }

//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: '16px' }}>
//         {interns.map(intern => (
//           <ThemedCard
//             key={intern.id}
//             name={intern.name}
//             score={intern.score}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default App

// Task 3.1

// import CounterDemo from './components/CounterDemo'

// function App() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <CounterDemo />
//     </div>
//   )
// }

// export default App

// Task 3.2
// import Navbar from './components/Navbar'
// import ThemedCard from './components/ThemedCard'
// import AddInternForm from './components/AddInternForm'
// import { useInterns } from './contexts/intern-context'

// function App() {
//   const { interns, isLoading } = useInterns()

//   if (isLoading) {
//     return <p>Loading...</p>
//   }

//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: '16px' }}>
//         <AddInternForm />

//         {interns.map(intern => (
//           <ThemedCard
//             key={intern.id}
//             name={intern.name}
//             score={intern.score}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default App

// Task 3.3

// import Navbar from './components/Navbar'
// import AddInternForm from './components/AddInternForm'
// import InternSearch from './components/InternSearch'
// import ThemedCard from './components/ThemedCard'
// import { useInterns } from './contexts/intern-context'

// function App() {
//   const { interns, isLoading } = useInterns()

//   if (isLoading) {
//     return <p>Loading...</p>
//   }

//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: '16px' }}>
//         <AddInternForm />

//         <InternSearch />

//         <h2>All Interns</h2>

//         {interns.map((intern) => (
//           <ThemedCard
//             key={intern.id}
//             name={intern.name}
//             score={intern.score}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default App

// Task 4.1

// import Navbar from './components/Navbar'
// import AddInternForm from './components/AddInternForm'
// import InternSearch from './components/InternSearch'
// import ScoreStats from './components/ScoreStats'
// import ThemedCard from './components/ThemedCard'
// import { useInterns } from './contexts/intern-context'

// function App() {
//   const { interns, isLoading } = useInterns()

//   if (isLoading) {
//     return <p>Loading...</p>
//   }

//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: '16px' }}>
//         <AddInternForm />

//         <ScoreStats />

//         <InternSearch />

//         <h2>All Interns</h2>

//         {interns.map((intern) => (
//           <ThemedCard
//             key={intern.id}
//             name={intern.name}
//             score={intern.score}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default App

// Task 4.2

// import Navbar from './components/Navbar'
// import AddInternForm from './components/AddInternForm'
// import InternSearch from './components/InternSearch'
// import ScoreStats from './components/ScoreStats'
// import InternListWithCallback from './components/InternListWithCallback'

// function App() {
//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: '16px' }}>
//         <AddInternForm />
//         <ScoreStats />
//         <InternSearch />
//         <InternListWithCallback />
//       </div>
//     </div>
//   )
// }

// export default App

// Task 5

import Navbar                 from './components/Navbar'
import ScoreStats             from './components/ScoreStats'
import AddInternForm          from './components/AddInternForm'
import InternSearch           from './components/InternSearch'
import InternListWithCallback from './components/InternListWithCallback'

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '16px' }}>
        <ScoreStats />
        <AddInternForm />
        <InternSearch />
        <InternListWithCallback />
      </div>
    </div>
  )
}

export default App


// Contexts stores the shared data like theme and intern details.
// Hooks contains reusable logic such as form, search, and counter.
// Components displays the UI and use contexts and hooks to work.