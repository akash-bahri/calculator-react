import SC from './components/Calculator.js';
import Tictac from './components/TicTacToe.js';
import './App.css';
import { useState } from 'react';

function App() {
  const [Tag, SetTag] = useState(<div><h1 className='head '>SELECT APP TO RUN</h1></div>);
  const [activeButton, setActiveButton] = useState(null);

  function Scal() {
    SetTag(<SC />);
    setActiveButton('CALCULATOR');
  }

  function Ocal() {
    SetTag(<Tictac />);
    setActiveButton('TIC TAC TOE');
  }

  return (
    <div className="App">
      <div>
        <button
          className={`MainButtons ${activeButton === 'CALCULATOR' ? 'active' : ''}`}
          onClick={Scal}
        >
          CALCULATOR
        </button>
        <button
          className={`MainButtons ${activeButton === 'TIC TAC TOE' ? 'active' : ''}`}
          onClick={Ocal}
        >
          TIC TAC TOE
        </button>
      </div>
      <div>{Tag}</div>
    </div>
  );
}


export default App;
