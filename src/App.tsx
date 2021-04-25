import React from 'react';
import './App.css';
import MainSearch from './components/MainSerch3';
// import MainSearch2 from './components/MainSearch2';


// интерфейс для пропсов
interface ModalProps {
  visible: boolean
  onClose: () => void
}

const Modal = ({ visible = false, onClose }: ModalProps) => {

  // создаем обработчик нажатия клавиши Esc
  const onKeydown = ({key}: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose()
        break
    }
  }

  // c помощью useEffect цепляем обработчик к нажатию клавиш
  // https://ru.reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {
      document.addEventListener('keydown', onKeydown)
      return () => document.removeEventListener('keydown', onKeydown)
  })


  // если компонент невидим, то не отображаем его
  if (!visible) return null;

  // или возвращаем верстку модального окна
  return (
    <>
    <div className="shadow" onClick={onClose}>
    </div>
    <div className="selectInput" onClick={e => e.stopPropagation()}>
      <div>
        dsfsdf
      </div>
    </div>
    </>
  )
  }

const App:React.FC = () => {
  const [isModal, setModal] = React.useState(false)
  const onClose = () => setModal(false)
  return (
    <div className="App">
      {/* <MainSearch2 /> */}
      <MainSearch />
      <React.Fragment>
        <button onClick={() => setModal(true)}>Клик-клик-клик</button>
        <Modal
            visible={isModal}
            onClose={onClose}
        />
      </React.Fragment>
    </div>
  );
}

export default App;
