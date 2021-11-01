
import './App.css';
import Display from './components/Display';
import Keypad from './components/Keypad';

function App() {
  return (
    <div className="app">
    <h1 className='titulo'>Calculadora con React & Redux</h1>
    <div id="container">
      <Display/>
      <Keypad/>
    </div>
    </div>
  );
}

export default App;
