import React, { useState } from 'react';

export default function App() {
  const [name, setName] = useState('lee');
  const [age, setAge] = useState(20);
  const [address, setAddress] = useState('대전 둔산동');
  
  
  return <>
    이름 : <input type="text" placeholder="이름을 입력해주세요" value={name} onChange={(e) => {
      setName(e.target.value);
    }}/>
    <br />
    나이 : <input type="number" placeholder="나이을 입력해주세요" value={age} onChange={(e) => {
      setAge(e.target.valueAsNumber);
    }}/>
    <br />
    주소 : <input type="text" placeholder="주소를 입력해주세요" value={address} onChange={(e) => {
      setAddress(e.target.value);
    }}/>
  </>
}
