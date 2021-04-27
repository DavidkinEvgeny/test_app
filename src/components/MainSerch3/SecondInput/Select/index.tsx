import React from 'react'

interface SelectProps<T> {
  id: string
  label: string
  isActive: boolean
  addHandler: (item: T) => void
  visible: string
  onClose: () => void
  onOpen: () => void
}

function Select (props: SelectProps<any>) {
  const onKeydown = ({key}: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        props.onClose()
        break
    }
  }

  React.useEffect(() => {
      document.addEventListener('keydown', onKeydown)
      return () => document.removeEventListener('keydown', onKeydown)
  })

  if (!props.visible) return null;

  return(
    <>
      <li className='selectInput-item' key={props.id}>
        <span id={props.id} onClick={props.addHandler}>
          <input
            id={props.id}
            readOnly
            checked={props.isActive}
            type='checkbox'
            defaultValue={props.id}
          />
          <p>{ props.label }<span>{'~>'} 12.0</span></p>
        </span>
      </li>
    </>
  )
}

export default Select