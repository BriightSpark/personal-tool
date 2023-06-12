import React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import CalculatorOptions from './components/CalculatorOption';
import ItemInputList from './components/ItemInputList';
import CalculationResult from './components/CalculationResult';

type FormValues = {
  platform: 'Tiki' | 'Shopee Food' | 'Shopee' | 'Lazada' | 'Grab'
  items: {
    price: number;
    quantity: number;
    isCombo: boolean;
    comboItems: {
      price: number
    }[]
  }[];
};

const DiscountCalculator = () => {
  const { t } = useTranslation();
  const methods = useForm<FormValues>( {
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      platform: 'Tiki',
      items: [ { price: 0, quantity: 1, isCombo: false, comboItems: [] } ]
    }
  } );
  const { control } = methods;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray( {
    name: 'items',
    control
  } );

  return (
    <div className={ 'discount-calculator' }>
      <h1 className='discount-calculator__heading'>{ t( 'discount-calculator' ) }</h1>
      <FormProvider { ...methods }>
        <CalculatorOptions />
        <ItemInputList { ...{ fields, append, prepend, remove, swap, move, insert } } />
        <CalculationResult />
      </FormProvider>
    </div>
  );
};

export default DiscountCalculator;