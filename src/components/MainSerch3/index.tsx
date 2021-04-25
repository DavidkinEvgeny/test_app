import React, { useState } from 'react'
import FirstInput from './FirstInput'
import close from './../../icons/close.svg'
import './index.scss'

interface DependencesProps {
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
    } 
  }
  
  // По нажатию Enter сравнивает с данными из репозиторя
  const onKeydown = ({key}: KeyboardEvent) => {
    switch (key) {
      case 'Enter':
        searchForMatches(repository)
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

    const { repository } = event.target as typeof event.target & {
      repository: { value:string }
    }

  }

  const changeHandlerDependenciesList = (event: React.FocusEvent<any>) => {
    setDependenciesList('selectInput selectInput-active')
  }

  // Второй инпут
  const [values, setValues] = useState<{}[]>([])

  // Добавляет данные в тэги и в состояние значений
  const addValues = (val:DependencesProps):void => {
    setValues((prev:any) => [...prev, val] )
  }

  // Получает данные от выбранных элементов зависимости
  const addHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id
    const dep = dependences.find(o => o.id === id)
    if (dep !== undefined) {
      addValues(dep)
    }
    
    // let tr = values.find(el => el === id)
    // console.log(tr);
    
    // if (tr === id ) {
      //   console.log(tr);
      //   removeValues(id)
      // } 
    }
    console.log('зависимости values', values);
 
  const removeValues = (val: any) => {
    setValues(values.filter((v) => v!== val))
  }

  const removeHandler = (val: any) => {
    setValues(values.filter((v) => v!== val.currentTarget.innerText))

  }

  return(
    <div className="main-serch">
      {/* <div className="shadow" /> */}
      <form className="field" onSubmit={submitHandler}>
        <FirstInput 
          changeHandler={changeHandler}
          repository={repository}
        />
        <h3 className='dependencies-title' >Зависимости<span className='tooltip'>?</span></h3>
        <div className="dependencies" onClick={changeHandlerDependenciesList}>
        <ul className='selectInput selectInput-active'> 
        {/* <ul className={dependenciesList}>  */}
          { dependences.map((d) => {
            return(
              <li className='selectInput-item' key={d.id}>
              <span id={d.id} onClick={addHandler}>
                <input
                  id={d.id}
                  // onClick={addHandler}
                  // checked={d.isActive}
                  type='checkbox'
                  defaultValue={d.id}
                />
                <p>{ d.label }<span>{'~>'} 12.0</span></p>
              </span>
            </li>
            )
          }) }
          </ul>
        </div>
        <button className='button button-active'>Найти</button>
        <div className="empty" />
      </form>
      <div className="information">
        <div className='errors'>
          <p>Ошибка при попытке найти  репозиторий</p>
        </div>
        <div className='tags'>
        {/* { values.map((i) => {
          return (
            <div className="tag" key={i}>
              <p onClick={removeHandler}>{ i }</p>
              <img src={close} alt='sdf' />
            </div>
          )
        }) } */}
          <div className='tag'>
            <p>resk {'~>'} 12.0 </p>
            <img src={close} alt='sdf' />
          </div>
          <div className='tag'>
            <p>resk {'~>'} 12.0 </p>
            <img src={close} alt='sdf' />
          </div>
          <div className='tag'>
            <p>resk {'~>'} 12.0 </p>
            <img src={close} alt='sdf' />
          </div>
        </div>
      </div>
      <p>Для повышения качества поиска по репозиториям, советуем подключить аккаунт компании</p>
    </div>
  )
}

export default MainSearch
