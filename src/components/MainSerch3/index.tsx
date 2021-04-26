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
  // Первый инпут
  // Состояние репозитория
  const [repository, setRepository] = useState<string>('')
  // Состояние открытия selekt (потом удалить)
  const [dependenciesList, setDependenciesList] = useState('selectInput')
  const [errors, setErrors] = useState('')
  const closeDependenciesList = () => setDependenciesList('selectInput')
  const openDependenciesList = () => setDependenciesList('selectInput selectInput-active')

  // Состояние полученых зависимостей
  const [dependences, setDependences] = useState<DependencesProps[]>([])
  
  // Получаем данные из первого инпута
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
    event.preventDefault()
    setRepository(event.target.value)
  }

  // Сравниваем данные с репозиториями которые у нас есть
  const searchForMatches = (value: any) => {
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
  
  // По нажатию Enter сравнивает с данными из репозиторя
  const onKeydown = ({key}: KeyboardEvent) => {
    switch (key) {
      case 'Enter':
        searchForMatches(repository)
        openDependenciesList()
        openVisible()
        break
    }
  }
  // Отслеживает нажатие кнопок
  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const { repository } = event.target as typeof event.target & {
    //   repository: { value:string }
    // }
      // console.log(event.currentTarget);
      
  }

  // Второй инпут
  const [values, setValues] = useState<DependencesProps[]>([])

  // Добавляет данные в тэги и в состояние значений
  const addValues = (val:DependencesProps):void => {
    val.isActive = !val.isActive 
    setValues((prev:any) => [...prev, val] )
  }

  // Получает данные от выбранных элементов зависимости
  const addHandler = (e: React.MouseEvent<HTMLInputElement>) => {
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

  const removeValues = (id: any) => {
    values.map((i) => {
      if (i.id === id) {
        i.isActive = !i.isActive
      }
      return null
    })
    setValues(values.filter((v) => v.id !== id))
  }

  const removeHandler = (val: any) => {
    
    const id = val.currentTarget.id.substr(0, 1)
    removeValues(id)
  }

  // Открытие второго инпута
  const [visible, setVisiblel] = React.useState('shadow-close')
  const closeVisible = () => {
    setVisiblel('shadow-close')
    closeDependenciesList()
  }
  const openVisible = () => {
    setVisiblel('shadow-open')
    openDependenciesList()
  }

  return(
    <div className="main-serch">
      {/* <div className="shadow" /> */}
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
          className='button'
        >Найти</button>
        <div className="empty" />
      </form>
      <div className="information">
        <div className='errors'>
          {/* <p>Ошибка при попытке найти  репозиторий</p> */}
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
