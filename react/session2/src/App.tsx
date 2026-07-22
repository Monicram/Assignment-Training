// Section 1

// import InternCard from './InternCard'

// function App() {
//   return (
//     <div>
//       <InternCard name="Rahul" score={92} isPresent={true} />
//       <InternCard name="Priya" score={78} isPresent={true} />
//       <InternCard name="Amit" score={45} isPresent={false} />
//     </div>
//   )
// }

// export default App

// 1. Score as a string

//import InternCard from './InternCard'

// function App() {
//   return (
//     <div>
//       Error: Type 'string' is not assignable to type 'number'.
//           TypeScript catches the incorrect data type before runtime,
//           preventing calculation and rendering errors. 
//       <InternCard name="Rahul" score="92" isPresent={true} />

//       <InternCard name="Priya" score={78} isPresent={true} />
//       <InternCard name="Amit" score={45} isPresent={false} />
//     </div>
//   )
// }

// export default App


// 2. isPresent as a string

// import InternCard from './InternCard'

// function App() {
//   return (
//     <div>
//      Error: Type 'string' is not assignable to type 'boolean'.
//           TypeScript ensures boolean values are passed correctly,
//           avoiding logical errors in the application.
//       <InternCard name="Rahul" score={92} isPresent="true" />

//       <InternCard name="Priya" score={78} isPresent={true} />
//       <InternCard name="Amit" score={45} isPresent={false} />
//     </div>
//   )
// }

// export default App

// 3. Removing the isPresent prop

// import InternCard from './InternCard'

// function App() {
//   return (
//     <div>
//        Error: Property 'isPresent' is missing but required.
//           TypeScript ensures all required props are provided,
//           preventing incomplete component rendering. 
//       <InternCard name="Rahul" score={92} />

//       <InternCard name="Priya" score={78} isPresent={true} />
//       <InternCard name="Amit" score={45} isPresent={false} />
//     </div>
//   )
// }

// export default App

// 4. Adding an extra prop

//import InternCard from './InternCard'

// function App() {
//   return (
//     <div>
//      Error: Property 'age' does not exist on type 'InternCardProps'.
//           TypeScript prevents passing unexpected props,
//           making components easier to maintain. 
//       <InternCard
//         name="Rahul"
//         score={92}
//         isPresent={true}
//         age={25}
//       />

//       <InternCard name="Priya" score={78} isPresent={true} />
//       <InternCard name="Amit" score={45} isPresent={false} />
//     </div>
//   )
// }

// export default App


// Section 2

// import ProfileCard from './ProfileCard'

// function App() {
//   return (
//     <div>
//       <ProfileCard
//         name="Rahul"
//         role="Frontend"
//         score={92}
//         skills={['React', 'TypeScript', 'JavaScript']}
//       />

//       <ProfileCard
//         name="Priya"
//         skills={['Python', 'SQL']}
//       />

//       <ProfileCard />
//     </div>
//   )
// }

// export default App

// Section 3

// import InternProfile from './InternProfile'

// interface Intern {
//   id: number
//   name: string
//   score: number
//   isPresent: boolean
//   skills: string[]
// }

// function App() {
//   const rahul: Intern = {
//     id: 1,
//     name: 'Rahul',
//     score: 92,
//     isPresent: true,
//     skills: ['HTML', 'CSS', 'TypeScript', 'React'],
//   }

//   const priya: Intern = {
//     id: 2,
//     name: 'Priya',
//     score: 78,
//     isPresent: true,
//     skills: ['Node.js', 'TypeScript'],
//   }

//   return (
//     <div>
//       <InternProfile intern={rahul} />

//       {/* These two are equivalent */}
//       <InternProfile intern={priya} />
//       <InternProfile intern={{ ...priya }} />
//     </div>
//   )
// }

// export default App

// Section 4

// import './App.css'
// import Card from './Card'

// function App() {
//   return (
//     <div>
//       <Card title="Rahul">
//         <p>Score: 92</p>
//         <p>Status: Present</p>
//         <button>View Profile</button>
//       </Card>

//       <Card title="Announcements">
//         <ul>
//           <li>Session 3 tomorrow at 10am</li>
//           <li>Submit PRs by EOD</li>
//         </ul>
//       </Card>

//       <Card title="Empty Card" />
//     </div>
//   )
// }

// export default App

// Section 5

// import './App.css'
// import InternCard from './InternCard'

// function App() {
//   return (
//     <div>
//       <InternCard
//         name="Rahul"
//         score={92}
//         isPresent={true}
//         role="Frontend"
//       />

//       <InternCard
//         name="Priya"
//         score={78}
//         isPresent={true}
//         role="Backend"
//       />

//       <InternCard
//         name="Amit"
//         score={45}
//         isPresent={false}
//         role="Intern"
//       />
//     </div>
//   )
// }

// export default App

// Section 6

import './App.css'
import Dashboard from './Dashboard'

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default App