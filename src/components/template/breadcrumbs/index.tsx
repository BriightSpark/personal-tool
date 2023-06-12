import React from 'react';
import Breadcrumbs from 'nextjs-breadcrumbs';

export const Breadcrumb = () => {
  return (
    <Breadcrumbs
      useDefaultStyle
      omitRootLabel={ false }
      labelsToUppercase={ true }
      omitIndexList={ [] }
      containerClassName={ 'breadcrumbs-container' }
      inactiveItemClassName={ 'breadcrumbs-item' }
      activeItemClassName={ 'breadcrumbs-active' }
    />
  );
};