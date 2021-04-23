import React from 'react'
import './index.scss'
// import repository from './../../icons/repository.svg'
import close from './../../icons/close.svg'


function MainSearch() {
  return(
    <div className='main-search'>
      <form>
        <div className='field'>
          <div className='input'>
            <label className='subHead' htmlFor='repository'>Репозиторий</label>
            <input id='repository'
              placeholder='Flask/Flask-hub'
            />
            <div className='errors'>
              <p>Ошибка при попытке найти  репозиторий</p>
            </div>
          </div>
          <div className='input' >
            <label htmlFor='dependencies'>Зависимости</label>
            <input 
              id='dependencies'
              placeholder='Выберите пакеты'
            />
            <div className='tags'>
              <div className='tag'>
                <p>resk {'~>'} 12.0 <img src={close} alt='sdf' /></p>
              </div>
            </div>
          </div>
        </div>
        <button>Найти</button>
      </form>
      <p>Для повышения качества поиска по репозиториям, советуем подключить аккаунт компании</p>

      {/* <img src={repository} alt='sdf' /> */}
    </div>
  )
}



export default MainSearch