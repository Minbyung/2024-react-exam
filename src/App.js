import React, { useState, useCallback } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => setCount(count + 1), [count]);

  return (
    <>
    <div>
      <span>클릭 횟수 : {count}</span>
      <button onClick={handleClick}>클릭</button>
    </div>
    </>
  );
}