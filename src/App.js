import React, { useState, useRef } from 'react';

export default function App() {
  const [no, setNo] = useState("");
  const formInputNoRef = useRef(null);

  const notice = () => {
    formInputNoRef.current.focus();
    
    if (!no) {
      alert("숫자를 입력해주세요.");
      return;
    }

    alert(`당신이 입력한 숫자는 ${no}입니다.`);
    setNo('');
  }

  return <>    
    <form onSubmit={(e) => {
      e.preventDefault();
      notice();
    }}>
      <input className='input input-bordered' type="text" placeholder='숫자' ref={formInputNoRef}
      value={no} onChange={(e) => setNo(e.target.value)}/>
      <button className='btn btn-primary'>실행</button>
    </form>
  </>
}
