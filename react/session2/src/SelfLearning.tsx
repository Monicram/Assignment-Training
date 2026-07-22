import type { ReactNode, ReactElement } from 'react'

/*
1. React.FC

React.FC is a generic type used to define React function components.
Example:
const MyComponent: React.FC<MyProps> = ({ name }) => { ... }

Difference:
- React.FC automatically includes the children prop.
- Typing the props parameter directly gives more control and is the modern recommended approach.
- Most projects now prefer function Component(props: Props) instead of React.FC.
*/

interface GreetingProps {
  name: string
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h2>Hello, {name}</h2>
}

/*
2. PropsWithChildren

PropsWithChildren automatically adds an optional children prop.
Instead of writing:

interface CardProps {
  children: ReactNode
}

you can write:

PropsWithChildren<CardProps>

This reduces code when components accept children.
*/

/*
3. key Prop

The key prop is used internally by React to identify elements in a list.
It helps React update, remove, or reorder components efficiently.
The key prop is NOT passed to the component,
so props.key is always undefined.
*/

/*
4. Multiple ReactNode Slots

children is passed between opening and closing tags.

Named props like header and footer are passed explicitly.

Use children for the main content.
Use named slots when a layout requires fixed sections
such as header, sidebar, footer, or navigation.
*/

interface PageLayoutProps {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
}

function PageLayout({
  header,
  children,
  footer,
}: PageLayoutProps) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        margin: '20px',
        borderRadius: '8px',
      }}
    >
      <header
        style={{
          background: '#f0f0f0',
          padding: '12px',
        }}
      >
        {header}
      </header>

      <main
        style={{
          padding: '16px',
        }}
      >
        {children}
      </main>

      <footer
        style={{
          background: '#f0f0f0',
          padding: '12px',
        }}
      >
        {footer}
      </footer>
    </div>
  )
}

/*
5. ReactNode vs ReactElement vs JSX.Element

ReactNode
 Accepts everything React can render.
 Best for children and layout content.

ReactElement
 Accepts only JSX elements.
 Rejects strings and numbers.

JSX.Element
 Similar to ReactElement.
 Used when a component must receive exactly one JSX element.
 Does not allow null or undefined.
*/

interface WrapperProps {
  content: ReactNode
}

function Wrapper({ content }: WrapperProps) {
  return <div>{content}</div>
}

interface IconButtonProps {
  icon: ReactElement
  label: string
}

function IconButton({
  icon,
  label,
}: IconButtonProps) {
  return (
    <button>
      {icon} {label}
    </button>
  )
}

interface TooltipProps {
  trigger: ReactElement
  tip: string
}

function Tooltip({
  trigger,
  tip,
}: TooltipProps) {
  return <span title={tip}>{trigger}</span>
}

function SelfLearning() {
  return (
    <div>

      <Greeting name="Monica" />

      <PageLayout
        header={<h1>Intern Dashboard</h1>}
        footer={<p>© 2026 Aarvihsolutions</p>}
      >
        <p>Main content goes here as children.</p>
        <p>Any JSX works — text, elements, or other components.</p>
      </PageLayout>

      <Wrapper content="This is ReactNode content." />

      <IconButton
        icon={<span>⭐</span>}
        label="Star"
      />

      <br />
      <br />

      <Tooltip
        trigger={<button>Hover Me</button>}
        tip="Tooltip Example"
      />

      {/*
       TypeScript errors

      <IconButton
        icon="⭐"
        label="Star"
      />

      Error:
      Type 'string' is not assignable to type 'ReactElement'.

      <Tooltip
        trigger={null}
        tip="Tooltip"
      />

      Error:
      Type 'null' is not assignable to type 'ReactElement'.
      */}

    </div>
  )
}

export default SelfLearning