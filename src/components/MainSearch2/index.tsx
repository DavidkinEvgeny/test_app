import React, { useState } from 'react'
import './index.scss'
// import repository from './../../icons/repository.svg'
import close from './../../icons/close.svg'

interface Options<T> {
  items: T[]
}

const options = [
  { id: '1', label: 'opt1', isActive: true },
  { id: '2', label: 'opt2', isActive: false },
  { id: '3', label: 'opt3', isActive: false },
  { id: '4', label: 'opt4', isActive: false },
  { id: '5', label: 'opt5', isActive: false },
  { id: '6', label: 'opt6', isActive: false },
  { id: '7', label: 'opt7', isActive: false },
  { id: '8', label: 'opt8', isActive: false },
]

const MainSearch:React.FC = () => {
// Первый инпут
  const [repository, setRepository] = useState<string>('')
  const [dependenciesList, setDependenciesList] = useState('selectInput')
  
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setRepository(event.target.value)
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { repository } = event.target as typeof event.target & {
      repository: { value:string }
    }

    console.log(repository.value);
  }

  const changeHandlerDependenciesList = (event: React.FocusEvent<any>) => {
    setDependenciesList('selectInput selectInput-active')
  }
  // Второй инпут
  // const [values, setValues] = useState<string[]>([])
  const [values, setValues] = useState<string[]>([])

  const addValues = (val:string):void => {
    setValues((prev) => [...prev, val] )
  }

  // const addHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    // e.preventDefault()
    // const { values } = event.target as typeof event.target & {
    //   values: { value:string }
    // }
    const value = e.currentTarget.value
    const itemArr = values.indexOf(value)
    // setValues(values[itemArr].isA)
    console.log(itemArr);
    
    let tr = values.find(el => el === value)
    
    if (tr === value ) {
      removeValues(value)
    } else {
      addValues(value)
    }
  }
  console.log(values);

  const removeValues = (val: any) => {
    setValues(values.filter((v) => v!== val))
  }

  const removeHandler = (val: any) => {
    setValues(values.filter((v) => v!== val.currentTarget.innerText))

  }

  return(
    <div className='main-search'>
      <form className='field'  onSubmit={submitHandler}>
        <label htmlFor="repository">Репозиторий<span className='tooltip'>?</span></label>
        <div className="irepository">
          <input 
            id='repository' 
            onChange={changeHandler}
            value={repository}
            placeholder='Flask/Flask-hub' 
          />
        </div>
        <label htmlFor='dependencies'>Зависимости<span className='tooltip'>?</span></label>
        <div className="idependencies" onClick={changeHandlerDependenciesList}>
          {/* <div className='input' /> */}

          {/* <input id='dependencies' placeholder='Выберите пакеты' onClick={changeHandlerDependenciesList} /> */}
          <ul className={dependenciesList}>
            { options.map((i) => {
              return (
                <li key={i.id} className='selectInput-item'>
                  <span>
                    <input
                      type='checkbox'
                      id={i.id}
                      defaultValue={i.label}
                      readOnly
                      // checked={i.isActive}
                      onClick={addHandler}
                    />
                    <p>{ i.label }</p>
                  </span>
                </li>
              )
            }) }
            {/* <li className='selectInput-item'>
            <input
                type='checkbox'
                id='1'
                defaultValue='rake'
                readOnly
                onClick={addHandler}
              />
              <p>rake</p>
              <p><span className='checkbox' />rake<span className='dep'>{'~>'} 12.0</span></p>
            </li> */}
            {/* <li className='selectInput-item selectInput-item-active'><p><span className='checkbox' />postgres<span className='dep'>{'='} 12.0</span></p></li>
            <li className='selectInput-item selectInput-item-active'><p><span className='checkbox' />postgres<span className='dep'>{'='} 12.0</span></p></li>
            <li className='selectInput-item selectInput-item-active'><p><span className='checkbox' />postgres<span className='dep'>{'='} 12.0</span></p></li>
            <li className='selectInput-item'><p><span className='checkbox' />rake<span className='dep'>{'~>'} 12.0</span></p></li>
            <li className='selectInput-item'><p><span className='checkbox' />rake<span className='dep'>{'~>'} 12.0</span></p></li>
            <li className='selectInput-item'><p><span className='checkbox' />rake<span className='dep'>{'~>'} 12.0</span></p></li> */}
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
        { values.map((i) => {
          return (
            <div className="tag" key={i}>
              <p onClick={removeHandler}>{ i }</p>
              <img src={close} alt='sdf' />
            </div>
          )
        }) }
          {/* <div className='tag'>
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
          </div> */}
        </div>
      </div>
      <p>Для повышения качества поиска по репозиториям, советуем подключить аккаунт компании</p>

      {/* <img src={repository} alt='sdf' /> */}
    </div>
  )
}



export default MainSearch

