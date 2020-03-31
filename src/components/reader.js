import React from 'react';
import {
  PRODUCT_QS_NAME,
  VALID_ATTR_LABELS,
  COLLECTION_QS_NAME,
} from '../helpers/configs';

const isLocal = () => window.location.href.includes('localhost');

const navigateToBuilder = (isEditing) => {
  if (isLocal()) return;
  const { origin, pathname, search } = window.location;
  const splitPath = pathname.split('/');
  const productsIdx = splitPath.findIndex((name) => name === 'products');
  const productName = splitPath[productsIdx + 1];

  const collectionsIdx = splitPath.findIndex((name) => name === 'collections');
  const collectionName = splitPath[collectionsIdx + 1];

  let newSearch = `${PRODUCT_QS_NAME}=${productName}&${COLLECTION_QS_NAME}=${collectionName}`;
  if (isEditing) {
    const urlParams = new URLSearchParams(search);
    urlParams.set(PRODUCT_QS_NAME, productName);
    urlParams.set(COLLECTION_QS_NAME, collectionName);
    newSearch = urlParams.toString();
  }

  window.location.assign(`${origin}/pages/builder?${newSearch}`);
}

const ReaderDisplay = ({ selections }) => (
  <div className='reader-display'>
    {
      selections.map(({ label, value }) => (
        <div key={ label } className='selection-row'>
          <span className='label'>{`${label}: `}</span>
          <span className='value'>{ value }</span>
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
    <div
      className='edit-link'
      onClick={ () => { navigateToBuilder(true); } }
    >
      Change
    </div>
    <button
      type='submit'
      name='add'
      class='btn btn--add-to-cart'>
      <span class="btn__text">
        Add To Cart
      </span>
    </button>
    
  </div>
);


export const Reader = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selections = [];

  if (urlParams.get(PRODUCT_QS_NAME)) {    
    urlParams.forEach((value, label) => {
      console.log(value, label)
      if (VALID_ATTR_LABELS[label.toLowerCase()] && value) {
        selections.push({ label, value });
      }
    });
  }

  if (selections.length !== 0) {
    return (
      <div className='reader-container'>
        <ReaderDisplay selections={ selections } />
      </div>
    )
  }

  return (
    <div className='reader-container'>
      <div
        className='btn btn--add-to-cart'
        onClick={ () => navigateToBuilder() }
      >
        <span className='btn__text'>
          Customize
        </span>
      </div>
    </div>
  )
};