import React, { useState } from 'react';

export default function App() {
  
  const [no, setNo] = useState(0);

  const [recordedNo, setRecordedNo] = useState([]);

  const saveNo = (e) => {
    // // 기본적으로 이벤트를 막는다
    // e.preventDefault();
    

    if (no == '') {
      alert('숫자를 입력해주세요.');
      return;
    }
    // 기존의 배열 가져온 다음에 no 추가하겠다
    setRecordedNo([...recordedNo, no]);
    setNo('');
  }

  const li = recordedNo.map((el, index) => <li key={index}>{el}</li>);

  return <>
    <form onSubmit={(e) => {
      e.preventDefault();
      saveNo();
    }}>

      <input type="number" className="input input-bordered" value={no} onChange={(e) => setNo(e.target.valueAsNumber)} />
      <button type="submit" className="btn">기록</button>
    </form>

    <hr />

    <div className='text-2xl'>기록된 숫자 : v1</div>
    {recordedNo.join(', ')}

    <div className='text-2xl'>기록된 숫자 : v2</div>
    <ul>{li}</ul>

    <div className='text-2xl'>기록된 숫자 : v2</div>
    <ul>
      {recordedNo.map((el, index) => <li key={index}>{el}</li>)}
    </ul>
  </>
}
