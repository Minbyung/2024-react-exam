import React, { useState, useRef } from 'react';

export default function App() {
  const noInputRef = useRef(null);
  const [no, setNo] = useState("");

  const [recordedNos, setRecordedNos] = useState([5, 10, 5, 15, 20, 30, 25, 5, 10, 20, 5, 5]);

  const saveNo = () => {
    if (no === "") {
      alert("숫자를 입력해주세요.");
      return;
    }

    setRecordedNos([...recordedNos, no]);
    setNo("");
    noInputRef.current.focus();
  };

  const removeNo5 = () => {
    const newRecordedNos = recordedNos.filter((el) => el != 5);
    setRecordedNos(newRecordedNos);
  }

  const removeFirst = () => {
    const newRecordedNos = recordedNos.filter((_, index) => index != 0);
    setRecordedNos(newRecordedNos);
  }

  const removeLast = () => {
    setRecordedNos(recordedNos.filter((_, index) => index != recordedNos.length - 1));
  }
  
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveNo();
        }}
      >
        <input
          type="number"
          ref={noInputRef}
          value={no}
          onChange={(e) => setNo(e.target.valueAsNumber)}
        />
        <button type="submit">기록</button>
      </form>

      <hr />

      <h1>기록된 숫자 v1</h1>
      {recordedNos.join(",")}

      <hr />

      <button className='btn btn-primary' onClick={removeNo5}>숫자 5 삭제</button>
      <button className='btn btn-primary' onClick={removeFirst}>첫 숫자 삭제</button>
      <button className='btn btn-primary' onClick={removeLast}>마지막 숫자 삭제</button>
    </>
  );
}