import React, {useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
    const [start, setStart] = useState(0);
    const list = useRef<HTMLUListElement>(null)
    const length = 100;
      const scrollHandler = () => {
          if (list.current !== null) {
              const newStart = Math.floor(list.current.scrollTop / 60);
              console.log(newStart)
              if (newStart !== start) {
                  setStart(newStart);
              }
              console.log(list.current.scrollTop)
          }
      };

  const data = Array.from({ length: length }, (_, index) => index + 1);
  const displayData = data.slice(start, start + 5);

  return (
      <div>
          <ul ref={list} id="list" onScroll={scrollHandler}>
              <li className="field" style={{ lineHeight: 60 * start + "px"}}></li>
              {displayData.map((x) => (<li key={x}>{x}</li>))}
              <li className="field" style={{ lineHeight: (length - start - 5 ) * 50 + "px"}}></li>
          </ul>
      </div>
  );
}

export default App;
