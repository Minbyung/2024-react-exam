import React, { useState } from 'react';

export default function App() {
  const border = '10px solid red';
  const [popupVisible, setPopupVisible] = useState(true);


  return <>
    {popupVisible && <button className='btn' onClick={() => setPopupVisible(false)}>팝업닫기</button>}
    {popupVisible || <button className='btn' onClick={() => setPopupVisible(true)}>팝업열기</button>}

    <div className='my-5 border'></div>
    {popupVisible && <div style={{width: 100, height: 100, border}}></div>}
  </>
}
