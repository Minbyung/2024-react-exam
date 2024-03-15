import React, { useState } from 'react';

export default function ProductListItem({imgNo, name, price}) {

  return <>
    <div className='flex flex-col gap-1'>
        <img src={`https://picsum.photos/id/${imgNo}/200/300`} alt="" />
        <div className='text-center font-bold'>{name}</div>
        <div className="text-center after:content-['원']">{price}</div>
    </div>
  </>
} 