import React, { useState, useRef, useEffect } from 'react';


export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];

    if ( isDark ) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <>
    <div className='btn'>
        <button onClick={() => setIsDark(!isDark)}>테마토글</button>
    </div>

    <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium modi molestias harum, consequuntur magni sit illo quisquam atque! Iste corporis vitae dignissimos officiis saepe labore odio molestiae consequatur? Impedit, natus?
    </div>

    <h1 className="color-primary">
        안녕
        반가워
    </h1>
    </>
  );
}