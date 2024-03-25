import React, { useState, useRef, useEffect } from 'react';

let AppCallCount = 0;
let SubCallCount = 0;

function Sub({appNo}) {
  SubCallCount++;
  const [no, setNo] = useState(0);
  const [no2, setNo2] = useState(0);

  useEffect(() => {
    console.log('effect 1 : 한 번만 실행 ');
  }, []);

  useEffect(() => {
    console.log('effect 2 : 부모(App)이 no가 바뀔 때 마다 실행');
  }, [appNo]);

  useEffect(() => {
    console.log('effect 3 : 나(Sub)의 no가 바뀔 때 마다 실행 ');
  }, [no, no2]);

  useEffect(() => {
    console.log('effect 4 : appNo, no가 바뀔 때 마다 실행 ');
  }, [appNo, no, no2]);

  useEffect(() => {
    console.log('effect 5 : 매번 실행');
  });

  return (
    <>
      <div className='p-10 border border-blue-500'>
        AppNo : {appNo}
        <hr />
        <button className='btn' onClick={() => setNo(no + 1)}>sub 증가 : {no}</button>
        <button className='btn' onClick={() => setNo2(no + 1)}>sub2 증가 : {no2}</button>
        
      </div>
    
    </>
  )
}

export default function App() {
  AppCallCount++;
  const [no, setNo] = useState(0);

  return (
    <>
      <div className='p-10 border border-red-500'>
        <button className='btn' onClick={() => setNo(no + 1)}>app 증가 : {no}</button>
        <hr />
        <Sub appNo={no}/>
      </div>
    </>
  );
}