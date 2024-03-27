import React, { useState } from 'react';

export default function App() {
  const [selectedGender, setSelectedGender] = useState('M');



  return (
    <>
    <label>
      <input type="radio" name='gender' onChange={() => setSelectedGender('W')} checked={selectedGender == "W"}/>
      여성
    </label>
    
    <label>
      <input type="radio" name='gender' onChange={() => setSelectedGender('M')} checked={selectedGender == "M"}/>
      남성
    </label>
    </>
  );
}