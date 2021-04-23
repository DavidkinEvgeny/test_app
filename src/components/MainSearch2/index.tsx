import React from 'react'
import './index.scss'
// import repository from './../../icons/repository.svg'
import close from './../../icons/close.svg'


function MainSearch() {
  return(
    <div className='main-search'>
      <form className='field'>
        <label htmlFor="repository">Репозиторий<span className='tooltip'>?</span></label>
        <div className="irepository">
          <input id='repository' placeholder='Flask/Flask-hub' />
        </div>
        <label htmlFor='dependencies'>Зависимости<span className='tooltip'>?</span></label>
        <div className="idependencies">
          <input id='dependencies' placeholder='Выберите пакеты' />
          {/* <ul>
            <li><input type='checkbox' value='rake' name='rake' /></li>
            <li>postgres</li>
            <li>rake</li>
            <li>postgres</li>            
            <li>rake</li>
            <li>postgres</li>            
            <li>rake</li>
            <li>postgres</li>
          </ul> */}
        </div>
        <button className='button'>Найти</button>
        <div className="empty" />
      </form>
      <div className="information">
        <div className='errors'>
          <p>Ошибка при попытке найти  репозиторий</p>
        </div>
        <div className='tags'>
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

      {/* <img src={repository} alt='sdf' /> */}
    </div>
  )
}



export default MainSearch

