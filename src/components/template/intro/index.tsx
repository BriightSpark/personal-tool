import React from 'react';

export default function Intro() {
  return (
    <section className='flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12'>
      <h1 className='text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8'>
        Posts.
      </h1>
      <h4 className='text-center md:text-left text-lg mt-5 md:pl-8'>
        A place where I want to share things.
      </h4>
    </section>
  );
}
