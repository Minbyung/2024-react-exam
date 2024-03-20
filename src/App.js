import React, { useState, useRef } from 'react';

export default function App() {
  const [no1, setNo1] = useState(0);
  const no2Ref = useRef(0);

  return (
    <>
      <button className='btn btn-primary' onClick={() => setNo1(no1 + 1)}>숫자 1 증가 : {no1}</button>
      <button className='btn btn-primary' onClick={() => no2Ref.current++}>숫자 2 증가 : {no2Ref.current}</button>
    </>
  );
}