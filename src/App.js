import React, { useState, useRef } from 'react';
import classnames from 'classnames';

let NotifyOnce_workDone = false;


function NorifyOnce({children}) {
  const [visible, setVisible] = useState(false);
 
  if ( NotifyOnce_workDone == false ) {
    setTimeout(function() {
      setVisible(true);
    }, 1000);

    setTimeout(function() {
      setVisible(false);
    }, 3000);


    NotifyOnce_workDone = true;
  }

  return (
    <div
      className={classnames(
        "fixed transition-all right-[10px]",
        {
          "top-[-60px]" : !visible
        },
        {
          "top-[5px]" : visible
        }
      )}
    >
      {children}
    </div>
  )
}


function Alert({color:color_, children}) {
  const color = color_ ?? "white";
  
  return ( 
    <div role="alert" className="alert alert-info">
      <div className={`text-[${color}]`}>
        <i className="fa-solid fa-face-smile"></i>
        <span>{children}</span>
      </div>
    </div>
  )
}
    
export default function App() {
  return (
    <>
      <NorifyOnce>
        <Alert>안녕</Alert>
      </NorifyOnce>
      
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci corporis ratione voluptates nostrum aliquid quis magnam ab voluptatum rerum autem iste, sequi corrupti, assumenda modi voluptatibus tenetur perferendis ducimus?
      </div>
    </>
  );
}