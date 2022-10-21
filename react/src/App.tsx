import React, {useState} from 'react';
import './App.css';
import Quiz from './Quiz'

function App() {

  // TODO : QuizPrint, Listening - word 
  const [nav, setNav] = useState<string>('QuizSheet')

  return (
    <div className="App">
      <header className="App-header noprint">

        <p>워드마스터 수능 2000</p>
        <p><a
            className="App-link"
            href="https://github.com/hongjonghwa/word-master-2000"
            target="_blank"
            rel="noopener noreferrer"
          >source</a>
        </p>

      </header>
      <div className="App-body">
        {nav === 'QuizSheet' && <Quiz></Quiz>}
        {nav === 'QuizSheet1' || <Quiz></Quiz>}
      </div>
    </div>
  );
}

export default App;
