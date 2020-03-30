import React from 'react';
import { PRODUCT_QS_NAME, VALID_ATTR_LABELS } from '../helpers/configs';

const ReaderDisplay = ({ selections }) => (
  <div className='reader-display'>
    {
      selections.map(({ label, value }) => (
        <div key={ label } className='selection-row'>
          <h2>{`${label}: ${value}`}</h2>
          <input
              type='radio'
              name={ `properties[${label}]` }
              value={ value }
              onChange={ (e) => {}}
              checked
            />
        </div>
      ))
    }
  </div>
);


export const Reader = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selections = [];

  if (urlParams.get(PRODUCT_QS_NAME)) {
    
    urlParams.forEach((value, label) => {
      console.log(value, label)
      if (VALID_ATTR_LABELS[label]) {
        selections.push({ label, value });
      }
    });

    return (
      <div className='reader-container'>
        <ReaderDisplay selections={ selections } />
      </div>
    )
  }

  return (
    <div className='reader-container'>
      <div className='btn btn--add-to-cart'>
        <span className='btn__text'>
          Customize
        </span>
      </div>
    </div>
  )
};