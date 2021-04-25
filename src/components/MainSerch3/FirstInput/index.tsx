import React from 'react'

interface FirstInputProps<T> {
  changeHandler: (item: T) => void
  repository: T
}

function FirstInput (props: FirstInputProps<any>) {
  return(
    <>
      <h3 className='repository-title'>Репозиторий<span className='tooltip'>?</span></h3>
      <div className="repository">
        <input 
          onChange={props.changeHandler}
          value={props.repository}
          placeholder='Flask/Flask-hub' 
        />
      </div>
    </>
  )
}

export default FirstInput