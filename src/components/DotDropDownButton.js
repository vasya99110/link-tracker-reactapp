import React from 'react'
import { Dropdown } from 'react-bootstrap'

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className="dot-dropdown-toggle"
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
    style={{color: '#505F79'}}
  >
    {children}
  </a>
))

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = React.useState('')

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        {React.Children.toArray(children).filter(
          (child) =>
            !value || child.props.children.toLowerCase().startsWith(value),
        )}
      </div>
    )
  },
)

export default function DotDropDownButton ({ className, itemList, style, children }) {
  return <Dropdown className={className} style={style}>
    <Dropdown.Toggle as={CustomToggle} key="left" drop="left"
                     className="dropdown-custom-components">
      {children}
    </Dropdown.Toggle>

    <Dropdown.Menu as={CustomMenu} className="text-center">{itemList}</Dropdown.Menu>
  </Dropdown>
}