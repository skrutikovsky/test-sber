import React, {useRef, useState} from 'react';
import './App.css';

type VirtualListProp = {
    length: number,
    cellHeight: number,
    additionalElems: number,
}
// пояснение к пропсам:
// length - количество элементов в списке
// cellHeight - высота одного элемента
// additionalElems - количество элементов которые "пререндерется", то есть рисуются сверху и снизу от видимой части
// что, бы при быстром скролле не было пустых полосок от элементов которые еще рендеретя.
function App({length = 100, cellHeight = 60, additionalElems = 2}: VirtualListProp) {
    const [start, setStart] = useState(0);
    const list = useRef<HTMLDivElement>(null)
        const scrollHandler = () => {
            if (list.current !== null) {
                const newStart = Math.floor(list.current.scrollTop / cellHeight);
                if (newStart !== start) {
                    setStart(newStart);
                }
            }
        };

    const data = Array.from({ length: length }, (_, index) => index + 1);
    const displayData = data.slice(start, start + 4 + additionalElems * 2);

    return (
        <div ref={list} onScroll={scrollHandler} className="list-container">
            <ul style={{ height: cellHeight * (length - additionalElems) + "px", paddingTop: start >= additionalElems
                    ?cellHeight * (start - additionalElems) + "px"
                    :cellHeight * start + "px"}} id="list" >
                {displayData.map((x) => (<li key={x}>{x}</li>))}
            </ul>
        </div>
    );
}
export default App;
