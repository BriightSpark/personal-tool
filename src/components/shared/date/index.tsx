import React from 'react';
import { format } from 'date-fns';

interface DateModel {
  dateString: string
}

export default function DateComponent( { dateString } : DateModel ) {
  return (
    <time dateTime={ dateString } className='date'>
      { format( new Date( dateString ), 'LLLL d, yyyy' ) }
    </time>
  );
}
