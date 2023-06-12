import React from 'react';
import Container from 'components/shared/container';
import cn from 'classnames';

interface AlertModel {
  preview?: any
  message?: string
}

export default function Alert( { preview = true, message = '' } : AlertModel ) {
  return preview && (
    message.trim() ?
      (
        <div className='w-screen h-screen flex justify-center items-center'>
          <p className='text-3xl'>{ message }</p>
        </div>
      )
      :
      (
        <div
          className={ cn( 'border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview
      } ) }
        >
          <Container>
            <div className='py-2 text-center text-sm'>
              <>
                This is page is a preview.{ ' ' }
                <a
                  href='/api/exit-preview'
                  className='underline hover:text-cyan duration-200 transition-colors'
                >
                  Click here
                </a>{ ' ' }
                to exit preview mode.
              </>
            </div>
          </Container>
        </div>
      ) );
}
