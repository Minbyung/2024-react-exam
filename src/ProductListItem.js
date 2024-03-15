import React, { useState } from 'react';

export default function ProductListItem(props) {
  const imgNo = props.imgNo;
  const productName = props.name;
  const productPrice = props.price;

  return <>
    <div className='inline-flex flex-col'>
        <img src={`https://picsum.photos/id/${imgNo}/200/300`} alt="" />
        <div className='text-center font-bold text-red-500'>{productName}</div>
        <div className='text-center'>{productPrice}원</div>
      </div>
  </>
}