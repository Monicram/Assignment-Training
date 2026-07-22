interface User {
  name:    string
  isAdmin: boolean
}

// Grandchild — actually uses the user
function UserBadge({ user }: { user: User }) {
  return (
    <div>
      <p>Logged in as: {user.name}</p>
      {user.isAdmin && <span>Admin</span>}
    </div>
  )
}

// Middle component — receives user only to pass it down, never uses it
// Passes user to child without using it.
// If User changes, this component also needs the updating.
function InternCard({ user }: { user: User }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '8px' }}>
      <p>Intern Card Content</p>
      <UserBadge user={user} />
    </div>
  )
}

// Parent — passes user down to InternCard
// Only forwards the user prop.
// New fields in User require the changes here also.
function InternList({ user }: { user: User }) {
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  )
}

// Top level — owns the user
function PropDrillingDemo() {
  const user: User = { name: 'Rahul', isAdmin: true }
  return <InternList user={user} />
}

export default PropDrillingDemo