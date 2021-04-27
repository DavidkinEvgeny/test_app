import React, { useState } from 'react'
import FirstInput from './FirstInput'
import close from './../../icons/close.svg'
import './index.scss'
import SecondInput from './SecondInput'

export interface DependencesProps {
  id: string
  label: string
  isActive: boolean
}

const testAPI = [
  {
    id: '1',
    nameRepository: 'Flask/Flask-hub',
    dependences: [
      { id: '1', label: 'opt1', isActive: false },
      { id: '2', label: 'opt2', isActive: false },
      { id: '3', label: 'opt3', isActive: false },
      { id: '4', label: 'opt4', isActive: false },
      { id: '5', label: 'opt5', isActive: false },
      { id: '6', label: 'opt6', isActive: false },
      { id: '7', label: 'opt7', isActive: false },
      { id: '8', label: 'opt8', isActive: false }
    ]
  },
  {
    id: '2',
    nameRepository: 'Flask-hub',
    dependences: [
      { id: '1', label: 'opt1', isActive: false },
      { id: '2', label: 'opt2', isActive: false },
      { id: '3', label: 'opt3', isActive: false },
      { id: '4', label: 'opt4', isActive: false },
    ]
  },
  {
    id: '3',
    nameRepository: 'Flask',
    dependences: [
      { id: '1', label: 'opt1', isActive: false },
      { id: '2', label: 'opt2', isActive: false },
      { id: '3', label: 'opt3', isActive: false },
      { id: '4', label: 'opt4', isActive: false },
      { id: '5', label: 'opt5', isActive: false },
      { id: '6', label: 'opt6', isActive: false },
    ]
  },
  {
    id: '4',
    nameRepository: 'None',
    dependences: []
  },
]

const MainSearch:React.FC = () => {

  const [repository, setRepository] = useState<string>('')
  const [dependenciesList, setDependenciesList] = useState<string>('selectInput')
  const [errors, setErrors] = useState<string>('')
  const [dependences, setDependences] = useState<DependencesProps[]>([])
  const [values, setValues] = useState<DependencesProps[]>([])
  const [visible, setVisiblel] = React.useState<string>('shadow-close')

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  const closeDependenciesList = () => setDependenciesList('selectInput')
  const openDependenciesList = () => setDependenciesList('selectInput selectInput-active')
  
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
    event.preventDefault()
    setRepository(event.target.value)
  }

  const searchForMatches = (value: any): void => {
    const deps = testAPI.find(o => o.nameRepository === value)
    if (deps !== undefined) {
      setDependences(deps.dependences)
      if (deps.dependences.length === 0){
        setErrors('В репозитории отсутствуют зависимости')
      }
    } else if (deps === undefined){
      setErrors('Репозиторий не найден')
    }
  }
  
  const onKeydown = ({key}: KeyboardEvent): void => {
    switch (key) {
      case 'Enter':
        searchForMatches(repository)
        openDependenciesList()
        openVisible()
        break
    }
  }


  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }


  const addValues = (val:DependencesProps):void => {
    val.isActive = !val.isActive 
    setValues((prev:any) => [...prev, val] )
  }

  const addHandler = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.preventDefault()
    const id = e.currentTarget.id
    const dep = dependences.find(o => o.id === id)
    if (dep !== undefined) {
      addValues(dep)
    }
    if (values.find(o => o.id === id)) {
      removeValues(id)
    }
  }
  

  const removeValues = (id: any): void => {
    values.map((i) => {
      if (i.id === id) {
        i.isActive = !i.isActive
      }
      setValues(values.filter((v) => v.id !== id))
      return null
    })

  }

  const removeHandler = (val: any): void => {
    const id = val.currentTarget.id.substr(0, 1)
    removeValues(id)
  }
    
  const closeVisible = (): void => {
    setVisiblel('shadow-close')
    closeDependenciesList()
  }
  const openVisible = (): void => {
    setVisiblel('shadow-open')
    openDependenciesList()
  }

  return(
    <div className="main-serch">
      <form className="field" onSubmit={submitHandler}>
        <FirstInput 
          changeHandler={changeHandler}
          repository={repository}
        />
        <SecondInput 
          dependences={dependences}
          addHandler={addHandler}
          visible={visible}
          closeVisible={closeVisible}
          openVisible={openVisible}
          dependenciesList={dependenciesList}
        />
        <button 
          className={values.length !== 0 ? 'button button-active' : 'button'}
        >Найти</button>
        <div className="empty" />
      </form>
      <div className="information">
        <div className='errors'>
          <p>{ errors }</p>
        </div>
        <div className='tags'>
          { values.map((i) => {
            return (
              <div id={i.id +'_tag'} className="tag" key={i.id} onClick={removeHandler}>
                <p >{ i.label }</p>
                <img src={close} alt='close' />
              </div>
            )
          }) }
        </div>
      </div>
      <p>Для повышения качества поиска по репозиториям, советуем подключить аккаунт компании</p>
    </div>
  )
}

export default MainSearch
