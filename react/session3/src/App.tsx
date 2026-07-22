// import './App.css'
// import Dashboard from './Dashboard'

// function App() {
//   return (
//     <div>
//       <Dashboard />
//     </div>
//   )
// }

// export default App

import './App.css'
import Counter from './Counter'
import StateTypes from './StateTypes'
import InternForm from './InternForm'
import TogglePanel from './TogglePanel'
import InternObjectForm from './InternObjectForm'
import InternLoader from './InternLoader'
import FilteredInterns from './FilteredInterns'
import EscapeHandler from './EscapeHandler'
import FocusInput from './FocusInput'
import RefVsState from './RefVsState'
import StopwatchRef from './StopwatchRef'
import Dashboard from './Dashboard'
import SelfLearning from './SelfLearning'

function App() {
  return (
    <div>
      <Counter />
      <hr />
      <StateTypes />
      <hr />
      <InternForm />
      <hr />
      <TogglePanel />
      <hr />
      <InternObjectForm />
      <hr />
      <InternLoader />
      <hr />
      <FilteredInterns />
      <hr />
      <EscapeHandler />
      <hr />
      <FocusInput />
      <hr />
      <RefVsState />
      <hr />
      <StopwatchRef />
      <hr />
      <Dashboard />
      <hr />
      <SelfLearning />
    </div>
  )
}

export default App