import React from 'react';

interface ContainerModel {
  className?: string
  children: any
}

export default function Container( { className = '', children } : ContainerModel ) {
  return <div className={ `container mx-auto px-5 ${ className }` }>{ children }</div>;
}
