import React, { useState } from 'react';

export default function App() {
  const [num, setNum] = useState(0);

  const timeout = setTimeout(() => setNum(num + 1), 1000);
  
  const pause = () => clearTimeout(timeout);
  const resume = () => {
    setTimeout(() => setNum(num + 1), 1000);
  }

  return (
    <>
        숫자 : {num}
        <br />
        <button onClick={pause}>일시정지</button>
        <br />
        <button onClick={resume}>재개</button>
    </>
  );
}