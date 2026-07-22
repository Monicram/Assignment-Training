function SelfLearning() {
  return <div>Self Learning</div>
}

export default SelfLearning

/*
1. React.memo
It prevents unnecessary re-renders when props do not change.
It works well with useCallback because useCallback keeps the same function.

2. When we have not to use useMemo and useCallback
Do not use them for simple calculations.
Using them everywhere makes the code harder to read and can reduce performance.

3. useReducer
useReducer is useful when state updates are more complex.
It is better than using many useState hooks.

Example:
const [state, dispatch] = useReducer(reducer, { count: 0 })

4. Zustand / Redux Toolkit
useContext is good for small projects.
Zustand and Redux Toolkit are better for large projects with complex shared state.
*/