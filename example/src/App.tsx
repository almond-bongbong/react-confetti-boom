import { useState } from 'react';
import { Confetti } from 'react-confetti-boom';
import './style.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Confetti />
    </div>
  );
}

export default App;
