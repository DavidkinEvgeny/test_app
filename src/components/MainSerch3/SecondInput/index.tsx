import React from 'react'
import Select from './Select'
import { DependencesProps } from './../index'

interface SecondInputProps<T> {
  dependences: T
  addHandler: (item: T) => void
  visible: string
  closeVisible: () => void
  openVisible: () => void
  dependenciesList: string
}

function SecondInput (props:  SecondInputProps<any>) {
  return(
    <>
      <div className={props.visible} onClick={props.closeVisible}></div>
      <h3 className='dependencies-title' >Зависимости<span className='tooltip'>?</span></h3>
      <div className="dependencies" onClick={props.openVisible}>

        <ul className={props.dependenciesList}>
        { props.dependences.map((d: DependencesProps) => {
          return(
            <Select 
              key={d.id} 
              id={d.id} 
              label={d.label} 
              isActive={d.isActive} 
              addHandler={props.addHandler}
              visible={props.visible}
              onClose={props.closeVisible}
              onOpen={props.openVisible}
            />
          )
        }) }
        </ul>
      </div>
    </>
  )
}

export default SecondInput