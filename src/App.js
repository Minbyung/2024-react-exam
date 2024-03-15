import React, { useState } from 'react';
import ProductListItem from './ProductListItem';

export default function App() {
  


  return <>
    <div className='flex gap-3'>
      <ProductListItem imgNo={1} name="MAC" price="2,100,000"/>
      <ProductListItem imgNo={1} name="MAC AIR" price="3,100,000"/>
      <ProductListItem imgNo={1} name="MAC PRO" price="4,100,000"/>
    </div>
  </>
}
