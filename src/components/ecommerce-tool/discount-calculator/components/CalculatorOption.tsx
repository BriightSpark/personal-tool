import React from 'react';
import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';
import { Input, Select } from 'components/_core';
import { data } from '../constants/constants';
import { Validation } from '../utils/Validation';

const CalculatorOptions = () => {
  const { t } = useTranslation();
  const formParams = useWatch();
  const platformList = data.map( ( platform ) => ( { value: platform.platform, label: platform.platform } ) );

  return (
    <>
      <Select name={ 'platform' } label={ t( 'platform' ) } options={ platformList } />
      {
        data.map( ( listItem ) => {
          if ( listItem.platform === formParams.platform ) {
            return (
              listItem.inputs.map( ( input ) => {
                return (
                  <Input
                    type='number'
                    key={ input.name }
                    label={ t( input.label ) }
                    name={ input.name }
                    required={ true }
                    validation={ Validation[input.name] }
                  />
                );
              } )
            );
          }
        } )
      }
    </>
  );
};

export default CalculatorOptions;