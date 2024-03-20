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

  const removeNo5 = (index) => {
    const newRecordedNos = recordedNos.filter((_, _index) => _index != index);
    setRecordedNos(newRecordedNos);
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

      <button className='btn btn-primary' onClick={() => removeNo5(0)}>index 0 삭제</button>
      <button className='btn btn-primary' onClick={() => removeNo5(1)}>index 1 삭제</button>
      <button className='btn btn-primary' onClick={() => removeNo5(2)}>index 2 삭제</button>
      <button className='btn btn-primary' onClick={() => removeNo5(3)}>index 3 삭제</button>
    </>
  );
}