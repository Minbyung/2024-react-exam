import React, { useState, useMemo, useCallback } from 'react';

function OrderMainFood({setMainFoodCount, mainFoodCount}) {
  return(
    <>
      <h2 className='font-bold'>메인 (수량 : {mainFoodCount})</h2>
      <div>
        <button className='btn btn-info' onClick={() => setMainFoodCount(mainFoodCount + 1)}>증가</button>
        <button className='btn btn-info' onClick={() => setMainFoodCount(mainFoodCount == 1 ? 1 : mainFoodCount - 1)}>감소</button>
      </div>
    </>
  );
}

const MemoizedOrderMainFood = React.memo(OrderMainFood);

function OrderOptions({
  selectedCount,
  options,
  toggleAllChecked,
  btnAllChecked,
  optionCheckeds,
  toggleOptionCheck
}) {
  return (
    <>
      <h2 className='font-bold'>옵션 ({selectedCount} / {options.length})</h2>
      <label className='select-none cursor-pointer'>
        <input className='mr-2' type="checkbox" checked={btnAllChecked} onChange={toggleAllChecked}/>
        전체선택
      </label>
      <ul>
        {options.map((option, index) => (
          <li key={option}>
            <label className='select-none cursor-pointer'>
              <input className='mr-2 ' type="checkbox" checked={optionCheckeds[index]}
              onChange={() => toggleOptionCheck(index)}/>
              {option}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

const MemoizedOrderOptions = React.memo(OrderOptions);


function OderDelivery({deliveryType, setDeliveryType}) {
  return (
    <>
      <h2 className='font-bold'>배달 옵션</h2>
      <label>
        <input type="radio" name="delivery-type" checked={deliveryType == '직접수령'} onChange={() => setDeliveryType('직접수령')}/>직접수령
      </label>

      <label>
        <input type="radio" name="delivery-type" checked={deliveryType == '배달'} onChange={() => setDeliveryType('배달')}/>배달
      </label>
    </>
  );
}

const MemoizedOderDelivery = React.memo(OderDelivery);


function Order() {
  const [mainFoodCount, setMainFoodCount] = useState(1);

  const options = [
    "머스타드",
    "홀스래디쉬",
    "마요네즈",
    "칠리",
    "갈릭",
    "랜치",
    "발사믹"
  ];

  const [optionCheckeds, setOptionCheckeds] = useState(new Array(options.length).fill(false));

  const toggleOptionCheck = (index) => {
    const newOptionCheckeds = optionCheckeds.map((el, _index) => _index == index ? !el : el);
    setOptionCheckeds(newOptionCheckeds);
  }
  
  const btnAllChecked = useMemo(() => optionCheckeds.every((el) => el), [optionCheckeds]);
  const selectedCount = useMemo(() => optionCheckeds.filter(el => el).length, [optionCheckeds]);

  const toggleAllChecked = useCallback(() => {
    if ( btnAllChecked ) {
      // 전부 체크해제
      const newOptionCheckeds = optionCheckeds.map((el) => false);
      setOptionCheckeds(newOptionCheckeds);
    }
    else {
      // 전부 체크
      const newOptionCheckeds = optionCheckeds.map((el) => true);
      setOptionCheckeds(newOptionCheckeds);
    }
  }, [optionCheckeds]);

  const [deliveryType, setDeliveryType] = useState("직접수령");
  
  return (
    <>
      <h1 className='text-xl font-bold'>음식주문</h1>

      <MemoizedOrderMainFood setMainFoodCount={setMainFoodCount} mainFoodCount={mainFoodCount}/>

      <MemoizedOrderOptions
        selectedCount={selectedCount}
        options={options}
        toggleAllChecked={toggleAllChecked}
        btnAllChecked={btnAllChecked}
        optionCheckeds={optionCheckeds}
        toggleOptionCheck={toggleOptionCheck}
      />

      <MemoizedOderDelivery deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
    </>
  );
}

export default function App() {
  return(
    <>
      <Order/>
    </>
  );
}