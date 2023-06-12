import _ from 'lodash';

export const applyFilter = (
  { greenCount, yellowCount, array, number } : { greenCount : number, yellowCount : number, array : number[][], number : number[] }
) => {
  switch ( true ) {
    case ( greenCount === 0 && yellowCount === 0 ):
      return removeNumber( array, number );
    case ( greenCount === 0 && yellowCount === 1 ) :
      return filterOneWrong( array, number );
    case ( greenCount === 0 && yellowCount === 2 ) :
      return filterTwoWrong( array, number );
    case ( greenCount === 0 && yellowCount === 3 ) :
      return filterThreeWrong( array, number );
    case ( greenCount === 1 && yellowCount === 0 ) :
      return filterOneCorrect( array, number );
    case ( greenCount === 1 && yellowCount === 1 ) :
      return filterOneCorrectOneWrong( array, number );
    case ( greenCount === 1 && yellowCount === 2 ) :
      return filterOneCorrectTwoWrong( array, number );
    case ( greenCount === 2 && yellowCount === 0 ) :
      return filterTwoCorrect( array, number );
    case ( greenCount === 3 && yellowCount === 0 ) :
      return [number];
    default:
      return array;
  }
};

export const filterOneCorrect = ( array: number[][], numArray: number[] ) => {
  return array?.filter( ( el ) =>
    ( el?.[0] === numArray?.[0] && el?.[1] !== numArray?.[1] && el?.[2] !== numArray?.[2] ) ||
    ( el?.[1] === numArray?.[1] && el?.[2] !== numArray?.[2] && el?.[0] !== numArray?.[0] ) ||
    ( el?.[2] === numArray?.[2] && el?.[0] !== numArray?.[0] && el?.[1] !== numArray?.[1] )
  );
};

export const filterTwoCorrect = ( array: number[][], numArray: number[] ) => {
  return array?.filter( ( el ) =>
    ( el?.[0] === numArray?.[0] && el?.[1] === numArray?.[1] && !el?.includes( numArray?.[2] ) ) ||
    ( el?.[1] === numArray?.[1] && el?.[2] === numArray?.[2] && !el?.includes( numArray?.[0] ) ) ||
    ( el?.[2] === numArray?.[2] && el?.[0] === numArray?.[0] && !el?.includes( numArray?.[1] ) )
  );
};

export const filterOneWrong = ( array: number[][], numArray: number[] ) => {
  return array?.filter( ( el ) =>
    ( el?.includes( numArray?.[0] ) && !el?.includes( numArray?.[1] ) && !el?.includes( numArray?.[2] ) && el[0] !== numArray?.[0] ) ||
    ( el?.includes( numArray?.[1] ) && !el?.includes( numArray?.[0] ) && !el?.includes( numArray?.[2] ) && el[1] !== numArray?.[1] ) ||
    ( el?.includes( numArray?.[2] ) && !el?.includes( numArray?.[0] ) && !el?.includes( numArray?.[1] ) && el[2] !== numArray?.[2] )
  );
};

export const filterTwoWrong = ( array: number[][], numArray: number[] ) => {
  return array?.filter( ( el ) =>
    ( el?.includes( numArray?.[0] ) && el?.includes( numArray?.[1] ) && !el?.includes( numArray?.[2] ) && el?.[0] !== numArray?.[0] && el?.[1] !== numArray?.[1] ) ||
    ( el?.includes( numArray?.[0] ) && !el?.includes( numArray?.[1] ) && el?.includes( numArray?.[2] ) && el?.[0] !== numArray?.[0] && el?.[2] !== numArray?.[2] ) ||
    ( !el?.includes( numArray?.[0] ) && el?.includes( numArray?.[1] ) && el?.includes( numArray?.[2] ) && el?.[2] !== numArray?.[2] && el?.[1] !== numArray?.[1] )
  );
};

export const filterThreeWrong = ( array: number[][], numArray: number[] ) => {
  return array?.filter( ( el ) => (
    // eslint-disable-next-line eqeqeq
    el?.includes( numArray?.[0] ) &&
    el?.includes( numArray?.[1] ) &&
    el?.includes( numArray?.[2] ) &&
    !( el?.[0] === numArray?.[0] ) &&
    !( el?.[1] === numArray?.[1] ) &&
    !( el?.[2] === numArray?.[2] )
  ) && !_.isEqual( el, numArray )
  );
};

export const filterOneCorrectOneWrong = ( array : number[][], numArray: number[] ) => {
  return array?.filter( ( el ) =>
    ( el.includes( numArray?.[0] ) && el.includes( numArray?.[1] ) && !el.includes( numArray?.[2] ) && ( el[0] === numArray?.[0] && el[1] !== numArray?.[1] ) || ( el[0] !== numArray?.[0] && el[1] === numArray?.[1] ) ) ||
    ( el.includes( numArray?.[0] ) && !el.includes( numArray?.[1] ) && el.includes( numArray?.[2] ) && ( el[0] === numArray?.[0] && el[2] !== numArray?.[2] ) || ( el[0] !== numArray?.[0] && el[2] === numArray?.[2] ) ) ||
    ( !el.includes( numArray?.[0] ) && el.includes( numArray?.[1] ) && el.includes( numArray?.[2] ) && ( el[2] === numArray?.[2] && el[1] !== numArray?.[1] ) || ( el[2] !== numArray?.[2] && el[1] === numArray?.[1] ) )
  );
};

export const filterOneCorrectTwoWrong = ( array : number[][], numArray: number[] ) => {
  const newArray = getResultsByArray( numArray );
  return array?.filter( ( el ) => searchForArray( newArray, el ) !== -1 )?.filter( ( el ) =>
    ( el[0] === numArray?.[0] && el[1] !== numArray?.[1] && el[2] !== numArray?.[2] ) ||
    ( el[1] === numArray?.[1] && el[2] !== numArray?.[2] && el[0] !== numArray?.[0] ) ||
    ( el[2] === numArray?.[2] && el[0] !== numArray?.[0] && el[1] !== numArray?.[1] )
  );
};

export const removeNumber = ( array: number[][], numArray: number[] ) => {
  const filtedArray1 = filterSingleDigit( array, numArray?.[0] );
  const filtedArray2 = filterSingleDigit( filtedArray1, numArray?.[1] );
  return filterSingleDigit( filtedArray2, numArray?.[2] );
};

export const filterSingleDigit = ( array: number[][], digit: number ) => {
  return array?.filter( ( el ) => !el?.includes( digit ) );
};

export const generateDictionary = () => {
  const a = [];
  for ( let i = 1; i <= 9; i++ ) {
    let child = [];
    for ( let j = 1; j <= 9; j++ ) {
      if ( i === j ) continue;
      for ( let k = 1; k <= 9; k++ ) {
        if ( k === i || k === j ) continue;
        child = [ i, j, k];
        a.push( child );
      }
    }
  }
  return a;
};

function searchForArray( haystack : any, needle : any ){
  var i, j, current;
  for ( i = 0; i < haystack.length; ++i ){
    if ( needle.length === haystack[i].length ){
      current = haystack[i];
      for ( j = 0; j < needle.length && needle[j] === current[j]; ++j );
      if ( j === needle.length ) {
        return i;
      }
    }
  }
  return -1;
}

function getResultsByArray( array :any ) {
  const returnArray = [];
  const length = array.length;
  for ( let i = 0; i < length; i++ ) {
    let child = [];
    for ( let j = 0; j < length; j++ ) {
      if ( i === j ) continue;
      for ( let k = 0; k < length; k++ ) {
        if ( k === i || k === j ) continue;
        child = [ array[i], array[j], array[k]];
        returnArray.push( child );
      }
    }
  }
  return returnArray;
}